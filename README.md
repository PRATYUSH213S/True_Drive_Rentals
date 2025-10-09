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

Base URL: http://localhost:5000 (configurable)

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

Contributing / Notes
--------------------

- Create feature branches from main.
- Use conventional commit messages when possible.
- Uploads saved in backend/uploads (ignored by git).

License
-------

Copyright © 2025. All rights reserved.


