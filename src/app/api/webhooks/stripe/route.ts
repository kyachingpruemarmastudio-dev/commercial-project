import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const itemsJson = session.metadata?.items;

    if (userId && itemsJson) {
      try {
        const items = JSON.parse(itemsJson) as { productId: string; quantity: number }[];

        // Fetch product details
        const products = await prisma.product.findMany({
          where: { id: { in: items.map((i) => i.productId) } },
        });

        const orderItems = items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return {
            productId: item.productId,
            name: product?.name || "Product",
            price: product?.price || 0,
            quantity: item.quantity,
            image: product?.images[0] || null,
          };
        });

        const subtotal = orderItems.reduce(
          (acc, item) => acc + Number(item.price) * item.quantity,
          0
        );
        const tax = subtotal * 0.08;
        const shipping = subtotal > 50 ? 0 : 9.99;
        const total = subtotal + tax + shipping;

        await prisma.order.create({
          data: {
            userId,
            status: "PROCESSING",
            paymentStatus: "SUCCEEDED",
            subtotal,
            tax,
            shipping,
            total,
            stripeSessionId: session.id,
            stripePaymentId: session.payment_intent as string,
            items: {
              create: orderItems,
            },
          },
        });

        // Update stock
        for (const item of items) {
          await prisma.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      } catch (error) {
        console.error("Order creation error:", error);
      }
    }
  }

  return NextResponse.json({ received: true });
}
