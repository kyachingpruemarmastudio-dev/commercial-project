"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!session) {
      toast.error("Please login to checkout");
      router.push("/login?callbackUrl=/cart");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Checkout failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/products">
          <Button variant="brand">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const subtotal = totalPrice();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-4 rounded-xl border p-4 bg-card"
              >
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{formatPrice(item.price)} each</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => {
                        removeItem(item.productId);
                        toast.success("Removed from cart");
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Button
              variant="brand"
              className="w-full mt-6 gap-2"
              size="lg"
              onClick={handleCheckout}
            >
              Checkout <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className="w-full mt-2 text-muted-foreground"
              onClick={() => {
                clearCart();
                toast.success("Cart cleared");
              }}
            >
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
