"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";
import { Package } from "lucide-react";
import { motion } from "framer-motion";

const orders = [
  {
    id: "ORD-001",
    date: "2026-11-01",
    total: 299.99,
    status: "DELIVERED",
    paymentStatus: "SUCCEEDED",
    items: [{ name: "Premium Wireless Headphones", quantity: 1, price: 299.99 }],
  },
  {
    id: "ORD-002",
    date: "2026-10-28",
    total: 449.99,
    status: "SHIPPED",
    paymentStatus: "SUCCEEDED",
    items: [{ name: "Smart Watch Pro", quantity: 1, price: 449.99 }],
  },
  {
    id: "ORD-003",
    date: "2026-10-15",
    total: 249.97,
    status: "DELIVERED",
    paymentStatus: "SUCCEEDED",
    items: [
      { name: "Minimalist Backpack", quantity: 1, price: 89.99 },
      { name: "Mechanical Keyboard", quantity: 1, price: 159.99 },
    ],
  },
];

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-indigo-100 text-indigo-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No orders yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div>
                    <CardTitle className="text-base">{order.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColors[order.status] || ""}>
                      {order.status}
                    </Badge>
                    <span className="font-bold">{formatPrice(order.total)}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span className="text-muted-foreground">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
