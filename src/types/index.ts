import { User, Product, Order, Category, CartItem, Role, OrderStatus, PaymentStatus } from "@prisma/client";

export type { User, Product, Order, Category, CartItem, Role, OrderStatus, PaymentStatus };

export type SafeUser = Omit<User, "password">;

export type ProductWithCategory = Product & {
  category: Category;
};

export type CartItemWithProduct = CartItem & {
  product: Product;
};

export type OrderWithItems = Order & {
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string | null;
    productId: string;
  }[];
  user?: SafeUser;
};

export type DashboardStats = {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  recentOrders: OrderWithItems[];
  salesData: { name: string; total: number }[];
};

export type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: Role;
};
