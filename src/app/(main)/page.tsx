"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Shield, Truck, Zap } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";

// Demo products for homepage (in production these come from DB)
const featuredProducts = [
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
    featured: true,
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
];

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "Stripe encrypted checkout",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "2-3 business days",
  },
  {
    icon: ShoppingBag,
    title: "Easy Returns",
    description: "30-day money back",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-100 dark:from-brand-950 dark:via-background dark:to-brand-900">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Discover Premium
                <span className="text-brand-600"> Products</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Modern e-commerce experience with seamless payments, personalized dashboards, and lightning-fast delivery.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button variant="brand" size="lg" className="gap-2">
                    Shop Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                  alt="Shopping"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-muted-foreground mt-1">Hand-picked for you</p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to start shopping?
          </h2>
          <p className="text-brand-100 mb-8 max-w-xl mx-auto">
            Join thousands of happy customers. Create an account and unlock exclusive deals.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
