"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, ArrowLeft, Star } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const products: Record<string, any> = {
  "premium-wireless-headphones": {
    id: "1",
    name: "Premium Wireless Headphones",
    slug: "premium-wireless-headphones",
    description:
      "Experience pure audio bliss with our flagship wireless headphones. Featuring industry-leading active noise cancellation, 30-hour battery life, ultra-soft memory foam ear cushions, and multipoint Bluetooth connectivity. Perfect for travel, work, or pure listening pleasure.",
    price: 299.99,
    compareAt: 399.99,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"],
    stock: 50,
    featured: true,
  },
  "smart-watch-pro": {
    id: "2",
    name: "Smart Watch Pro",
    slug: "smart-watch-pro",
    description:
      "Stay connected and healthy with the Smart Watch Pro. Advanced health sensors, built-in GPS, always-on Retina display, and up to 18 hours of battery life. Water resistant to 50 meters.",
    price: 449.99,
    compareAt: 549.99,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"],
    stock: 30,
    featured: true,
  },
  "minimalist-backpack": {
    id: "3",
    name: "Minimalist Backpack",
    slug: "minimalist-backpack",
    description:
      "Clean design meets maximum functionality. Water-resistant exterior, padded laptop sleeve (up to 16\"), multiple organized pockets, and comfortable shoulder straps.",
    price: 89.99,
    compareAt: null,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"],
    stock: 100,
    featured: false,
  },
  "mechanical-keyboard": {
    id: "4",
    name: "Mechanical Keyboard",
    slug: "mechanical-keyboard",
    description:
      "Premium RGB mechanical keyboard with hot-swappable switches, PBT keycaps, aluminum frame, and full n-key rollover. Customize every key to your liking.",
    price: 159.99,
    compareAt: 199.99,
    images: ["https://images.unsplash.com/photo-1511467687858-23d96c302422?w=800"],
    stock: 45,
    featured: true,
  },
};

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = products[slug];
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/products">
          <Button variant="brand">Back to Products</Button>
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    toast.success("Added to cart!");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> Back to products
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-square rounded-2xl overflow-hidden bg-muted"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          {product.featured && (
            <Badge className="w-fit mb-3 bg-brand-600 text-white">Featured</Badge>
          )}
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-muted-foreground ml-2">(128 reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="flex gap-4 mt-auto">
            <Button
              variant="brand"
              size="lg"
              className="flex-1 gap-2"
              onClick={handleAdd}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5" />
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>

          {product.stock > 0 && product.stock <= 10 && (
            <p className="text-sm text-orange-600 mt-3">
              Only {product.stock} left in stock
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
