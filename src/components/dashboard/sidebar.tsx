"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Settings,
  Users,
  BarChart3,
  Home,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { SessionUser } from "@/types";

const userLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/orders", label: "My Orders", icon: Package },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const adminLinks = [
  { href: "/admin", label: "Admin Overview", icon: BarChart3 },
  { href: "/admin/products", label: "Products", icon: ShoppingBag },
  { href: "/admin/orders", label: "All Orders", icon: Package },
  { href: "/admin/users", label: "Users", icon: Users },
];

export function DashboardSidebar({ user }: { user: SessionUser }) {
  const pathname = usePathname();
  const isAdmin = user.role === "ADMIN";

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold text-sm">
          E
        </div>
        <span className="font-bold">EliteStore</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Account
        </p>
        {userLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === link.href
                ? "bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}

        {isAdmin && (
          <>
            <p className="px-3 py-2 mt-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Admin
            </p>
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </>
        )}
      </nav>

      <div className="border-t p-4 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <Home className="h-4 w-4" />
          Back to Store
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
