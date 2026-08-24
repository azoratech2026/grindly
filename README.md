# Grindly

Creatine gummies ecommerce site — Next.js (App Router) + TypeScript + Tailwind
CSS + Framer Motion, backed by Neon Postgres for waitlist and demo-order
capture.

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **State**: Zustand (cart)
- **Database**: Neon Postgres (`@neondatabase/serverless`)
- **Hosting**: Vercel, auto-deployed from this repo's production branch

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Requires a `DATABASE_URL` env var (see `.env.local`) pointing at the Neon
project for `/api/order` and `/api/waitlist` to work.

## Database

Two tables live in the `grindly` Neon project's default `neondb` database:

- `waitlist_signups(id, email, created_at)` — footer email capture
- `demo_orders(id, email, flavor, quantity, plan, total_cents, created_at)` —
  demo checkout submissions from the cart drawer

## Deployment

The `grindly` Vercel project is linked to this GitHub repository and
auto-deploys on every push to the production branch. `DATABASE_URL` must be
set in the Vercel project's Environment Variables (Production, Preview, and
Development) for the API routes to work — either via the Neon Vercel
integration (Storage → Connect Database → Neon) or manually.
