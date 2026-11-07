import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { createCheckoutSession } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items" }, { status: 400 });
    }

    const stripeSession = await createCheckoutSession({
      items: items.map((item: { name: string; price: number; quantity: number; image?: string; productId: string }) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        productId: item.productId,
      })),
      userId: session.user.id,
      email: session.user.email || "",
      successUrl: absoluteUrl("/dashboard/orders?success=true"),
      cancelUrl: absoluteUrl("/cart?canceled=true"),
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}
