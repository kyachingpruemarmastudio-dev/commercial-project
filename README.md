# EliteStore — Production-Level E-commerce SaaS

A modern full-stack e-commerce platform built with **Next.js 15**, **TypeScript**, **Prisma**, **PostgreSQL (Neon)**, **NextAuth**, **Stripe**, **Firebase**, **Tailwind CSS**, **Framer Motion**, **Recharts**, and more.

## Features

### Roles
- **USER** — Browse products, cart, checkout, personal dashboard, order history
- **ADMIN** — Full admin dashboard with analytics, product/order/user management

### Architecture
- **Main Layout** (`(main)`) — Public storefront (home, products, cart, auth)
- **Dashboard Layout** (`(dashboard)`) — Protected user + admin SaaS dashboards

### Auth
- Credentials (email/password) with Zod validation
- Google OAuth (NextAuth + Firebase-ready)
- JWT sessions via NextAuth
- Navbar dynamically shows Login button or user profile image

### Commerce
- Product catalog with search & sort
- Dynamic cart (Zustand + persist) with live count badge in navbar
- Stripe Checkout + webhook for order creation
- After successful payment → redirect to user dashboard orders

### Dashboard
- User: overview stats, spending chart (Recharts), order list
- Admin: revenue, sales charts, management links
- Beautiful sidebar navigation with role-based links

### UI/UX
- Tailwind + custom brand colors
- Framer Motion animations
- React Hot Toast notifications
- Lucide icons
- Fully responsive

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Framework    | Next.js 15 (App Router)             |
| Language     | TypeScript                          |
| Styling      | Tailwind CSS + tailwindcss-animate  |
| Auth         | NextAuth.js + JWT                   |
| Database     | PostgreSQL (Neon) + Prisma ORM      |
| Payments     | Stripe                              |
| Validation   | Zod + React Hook Form               |
| State        | Zustand (cart)                      |
| Charts       | Recharts                            |
| Animations   | Framer Motion                       |
| Notifications| React Hot Toast                     |
| Icons        | Lucide React                        |

## Getting Started

### 1. Clone & Install

```bash
cd ecommerce-saas
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-long-random-string"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
# Firebase / Google OAuth credentials
```

### 3. Database

```bash
npx prisma db push
npm run db:seed
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Accounts (after seed)

| Role  | Email                  | Password   |
|-------|------------------------|------------|
| Admin | admin@elitestore.com   | Admin123!  |
| User  | user@example.com       | User123!   |

## Project Structure

```
src/
├── app/
│   ├── (main)/          # Public storefront layout
│   │   ├── page.tsx     # Homepage
│   │   ├── products/
│   │   ├── cart/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/     # Protected SaaS layout
│   │   ├── dashboard/   # User dashboard
│   │   └── admin/       # Admin dashboard
│   └── api/             # API routes (auth, checkout, webhooks)
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── products/        # ProductCard
│   ├── dashboard/       # Sidebar, Header
│   └── ui/              # Button, Card, Input, Badge
├── hooks/               # useCart (Zustand)
├── lib/
│   ├── auth/            # NextAuth config + session helpers
│   ├── db/              # Prisma client
│   ├── stripe/
│   ├── firebase/
│   └── validations/     # Zod schemas
└── types/
```

## Production Checklist

- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Configure Neon production database
- [ ] Add real Stripe keys + webhook endpoint
- [ ] Configure Google OAuth credentials
- [ ] Enable HTTPS
- [ ] Set up proper image domains in `next.config.ts`
- [ ] Add rate limiting on auth/checkout routes
- [ ] Monitor Stripe webhooks

## License

MIT
