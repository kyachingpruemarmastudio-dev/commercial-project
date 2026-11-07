"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  User,
  LogOut,
  LayoutDashboard,
  Package,
  Menu,
  X,
  Search,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { data: session } = useSession();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = totalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white font-bold text-lg">
            E
          </div>
          <span className="hidden font-bold text-xl sm:inline-block">
            EliteStore
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/products" className="text-sm font-medium hover:text-brand-600 transition-colors">
            Products
          </Link>
          <Link href="/categories" className="text-sm font-medium hover:text-brand-600 transition-colors">
            Categories
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-brand-600 transition-colors">
            About
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </motion.span>
              )}
            </Button>
          </Link>

          {/* Auth */}
          {session?.user ? (
            <div className="relative group">
              <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold">
                    {session.user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
              </Button>
              <div className="absolute right-0 top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="rounded-xl border bg-card shadow-lg p-2">
                  <div className="px-3 py-2 border-b mb-1">
                    <p className="text-sm font-medium truncate">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/orders"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent transition-colors"
                  >
                    <Package className="h-4 w-4" />
                    My Orders
                  </Link>
                  {session.user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="brand" size="sm">
                Login
              </Button>
            </Link>
          )}

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-2">
              <Link href="/products" className="px-3 py-2 rounded-lg hover:bg-accent" onClick={() => setMobileOpen(false)}>
                Products
              </Link>
              <Link href="/categories" className="px-3 py-2 rounded-lg hover:bg-accent" onClick={() => setMobileOpen(false)}>
                Categories
              </Link>
              <Link href="/about" className="px-3 py-2 rounded-lg hover:bg-accent" onClick={() => setMobileOpen(false)}>
                About
              </Link>
              {!session && (
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="brand" className="w-full mt-2">Login</Button>
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
