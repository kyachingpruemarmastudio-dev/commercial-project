"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/products/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

const allProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    slug: "premium-wireless-headphones",
    price: 299.99,
    compareAt: 399.99,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"],
    stock: 50,
    featured: true,
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    slug: "smart-watch-pro",
    price: 449.99,
    compareAt: 549.99,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"],
    stock: 30,
    featured: true,
  },
  {
    id: "3",
    name: "Minimalist Backpack",
    slug: "minimalist-backpack",
    price: 89.99,
    compareAt: null,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"],
    stock: 100,
    featured: false,
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    slug: "mechanical-keyboard",
    price: 159.99,
    compareAt: 199.99,
    images: ["https://images.unsplash.com/photo-1511467687858-23d96c302422?w=500"],
    stock: 45,
    featured: true,
  },
  {
    id: "5",
    name: "Noise Cancelling Earbuds",
    slug: "noise-cancelling-earbuds",
    price: 179.99,
    compareAt: 229.99,
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500"],
    stock: 80,
    featured: false,
  },
  {
    id: "6",
    name: "Leather Wallet",
    slug: "leather-wallet",
    price: 59.99,
    compareAt: null,
    images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=500"],
    stock: 120,
    featured: false,
  },
  {
    id: "7",
    name: "Portable Charger 20000mAh",
    slug: "portable-charger",
    price: 49.99,
    compareAt: 69.99,
    images: ["https://images.unsplash.com/photo-1609091839311-b5b6e6fe56b5?w=500"],
    stock: 200,
    featured: false,
  },
  {
    id: "8",
    name: "UV Sunglasses",
    slug: "uv-sunglasses",
    price: 129.99,
    compareAt: 159.99,
    images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500"],
    stock: 60,
    featured: true,
  },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");

  const filtered = allProducts
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground">Browse our complete collection</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      )}
    </div>
  );
}
