import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

export async function createCheckoutSession({
  items,
  userId,
  email,
  successUrl,
  cancelUrl,
}: {
  items: { name: string; price: number; quantity: number; image?: string; productId: string }[];
  userId: string;
  email: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: email,
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    metadata: {
      userId,
      items: JSON.stringify(
        items.map((i) => ({ productId: i.productId, quantity: i.quantity }))
      ),
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session;
}
