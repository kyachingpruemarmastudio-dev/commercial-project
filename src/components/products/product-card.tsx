"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAt?: number | null;
    images: string[];
    stock: number;
    featured?: boolean;
  };
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "",
    });
    toast.success(`${product.name} added to cart!`);
  };

  const discount =
    product.compareAt && product.compareAt > product.price
      ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
      : null;

  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-lg"
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.images[0] || "/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {discount && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white border-0">
              -{discount}%
            </Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-3 right-3 bg-brand-600 text-white border-0">
              Featured
            </Badge>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full shadow-md"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full shadow-md"
              onClick={(e) => {
                e.preventDefault();
                toast.success("Added to wishlist!");
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-brand-600 transition-colors">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-bold text-lg">{formatPrice(product.price)}</span>
            {product.compareAt && product.compareAt > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>
          {product.stock <= 5 && product.stock > 0 && (
            <p className="mt-1 text-xs text-orange-600">Only {product.stock} left</p>
          )}
          {product.stock === 0 && (
            <p className="mt-1 text-xs text-red-600">Out of stock</p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
