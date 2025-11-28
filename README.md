True Drive Rentals – MERN Monorepo
=================================

Production‑ready car rental platform built with the MERN stack. This repository contains three apps:

- frontend: Customer‑facing site to browse cars, view details, book, and pay
- admin: Admin dashboard to add/manage cars and view bookings
- backend: Express API, authentication, bookings, payments, and file uploads

Tech Stack
----------

- React 19 + Vite 7, Tailwind CSS v4
- Node.js + Express
- MongoDB with Mongoose
- Stripe payments

Local Development
-----------------

Requirements: Node 18+, npm, MongoDB connection string.

1) Backend

```bash
cd backend
npm i
cp .env.example .env   # if present, otherwise create .env
## Required env (example)
# MONGO_URI=mongodb+srv://...
# JWT_SECRET=your_jwt_secret
# STRIPE_SECRET_KEY=sk_test_...
# CLIENT_URL=http://localhost:5175
npm run dev
```

2) Frontend (Customer site)

```bash
cd frontend
npm i
npm run dev
# Local: http://localhost:5175 (port may vary)
```

3) Admin

```bash
cd admin
npm i
npm run dev
# Local: http://localhost:5178 (port may vary)
```

Tailwind CSS v4
---------------

This project uses Tailwind v4 with the Vite plugin. Do not add a legacy postcss tailwind plugin or old `@tailwind base;` directives. The global CSS entry begins with:

```css
@import "tailwindcss";
```

Project Scripts
---------------

Each app exposes the usual Vite scripts:

- npm run dev: Start dev server
- npm run build: Production build
- npm run preview: Preview build

API Overview
------------

Base URL: https://true-drive-rentals-backend.onrender.com(configurable)

- Auth: /api/auth/register, /api/auth/login, /api/auth/me
- Cars: /api/cars (CRUD, image upload)
- Bookings: /api/bookings (create/list user bookings)
- Payments: /api/payments/create-intent, /api/payments/verify

Repository Structure
--------------------

```
backend/     # Express API, routes, controllers, models, uploads
frontend/    # Customer UI (React + Vite)
admin/       # Admin dashboard (React + Vite)
```

Deployment on Render
--------------------

### Backend Environment Variables

In your Render backend service, set these environment variables:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here  # or sk_test_ for testing
CLIENT_URL=https://true-drive-rentals-frontend.onrender.com
PORT=5000
```

**Important for Stripe:**
1. Get your Stripe keys from: https://dashboard.stripe.com/apikeys
2. Use `sk_test_...` for testing, `sk_live_...` for production
3. Make sure `STRIPE_SECRET_KEY` is set, otherwise payments will fail with "Failed to create Stripe session"

### Frontend Deployment

The `frontend/static.json` file is included to handle SPA routing on Render. This ensures routes like `/cars`, `/bookings` work correctly.

**Build Command:** `npm run build`
**Publish Directory:** `dist`

Contributing / Notes
--------------------

- Create feature branches from main.
- Use conventional commit messages when possible.
- Uploads saved in backend/uploads (ignored by git).

License
-------

Copyright © 2025. All rights reserved.


