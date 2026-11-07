"use client";

import { SessionUser } from "@/types";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function DashboardHeader({ user }: { user: SessionUser }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-card px-6">
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex-1" />

      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
      </Button>

      <div className="flex items-center gap-3">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "User"}
            width={36}
            height={36}
            className="rounded-full"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold text-sm">
            {user.name?.[0]?.toUpperCase() || "U"}
          </div>
        )}
        <div className="hidden sm:block">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground capitalize">{user.role.toLowerCase()}</p>
        </div>
      </div>
    </header>
  );
}
