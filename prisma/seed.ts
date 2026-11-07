import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("Admin123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@elitestore.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@elitestore.com",
      password: adminPassword,
      role: "ADMIN",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    },
  });

  // Create demo user
  const userPassword = await bcrypt.hash("User123!", 12);
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "user@example.com",
      password: userPassword,
      role: "USER",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
  });

  // Categories
  const electronics = await prisma.category.upsert({
    where: { slug: "electronics" },
    update: {},
    create: {
      name: "Electronics",
      slug: "electronics",
      description: "Gadgets and devices",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
    },
  });

  const fashion = await prisma.category.upsert({
    where: { slug: "fashion" },
    update: {},
    create: {
      name: "Fashion",
      slug: "fashion",
      description: "Clothing and accessories",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
    },
  });

  const home = await prisma.category.upsert({
    where: { slug: "home" },
    update: {},
    create: {
      name: "Home & Living",
      slug: "home",
      description: "Home essentials",
      image: "https://images.unsplash.com/photo-1484101403637-046d3c4c0e6d?w=400",
    },
  });

  // Products
  const products = [
    {
      name: "Premium Wireless Headphones",
      slug: "premium-wireless-headphones",
      description: "High-fidelity wireless headphones with active noise cancellation, 30-hour battery life, and premium comfort.",
      price: 299.99,
      compareAt: 399.99,
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"],
      stock: 50,
      featured: true,
      categoryId: electronics.id,
    },
    {
      name: "Smart Watch Pro",
      slug: "smart-watch-pro",
      description: "Advanced smartwatch with health monitoring, GPS, and always-on display.",
      price: 449.99,
      compareAt: 549.99,
      images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"],
      stock: 30,
      featured: true,
      categoryId: electronics.id,
    },
    {
      name: "Minimalist Backpack",
      slug: "minimalist-backpack",
      description: "Sleek, water-resistant backpack with laptop compartment and thoughtful organization.",
      price: 89.99,
      images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"],
      stock: 100,
      featured: false,
      categoryId: fashion.id,
    },
    {
      name: "Mechanical Keyboard",
      slug: "mechanical-keyboard",
      description: "RGB mechanical keyboard with hot-swappable switches and premium keycaps.",
      price: 159.99,
      compareAt: 199.99,
      images: ["https://images.unsplash.com/photo-1511467687858-23d96c302422?w=800"],
      stock: 45,
      featured: true,
      categoryId: electronics.id,
    },
    {
      name: "Noise Cancelling Earbuds",
      slug: "noise-cancelling-earbuds",
      description: "Compact true wireless earbuds with excellent ANC and crystal clear calls.",
      price: 179.99,
      compareAt: 229.99,
      images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800"],
      stock: 80,
      featured: false,
      categoryId: electronics.id,
    },
    {
      name: "Leather Wallet",
      slug: "leather-wallet",
      description: "Handcrafted genuine leather wallet with RFID protection.",
      price: 59.99,
      images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=800"],
      stock: 120,
      featured: false,
      categoryId: fashion.id,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  console.log("✅ Seed completed!");
  console.log(`Admin: admin@elitestore.com / Admin123!`);
  console.log(`User:  user@example.com / User123!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
