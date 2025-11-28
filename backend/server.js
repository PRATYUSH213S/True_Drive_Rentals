import express from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import carRouter from "./routes/carRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

import paymentRouter from "./routes/paymentRoutes.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

// middlewares

app.use(cors({
  origin: [
    'https://true-drive-rentals-frontend.onrender.com',
    'https://true-drive-rentals-admin.onrender.com'
  ],
  credentials: true
})); // allow CORS for API calls
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, // <-- important
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve uploaded images with permissive CORS header
app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  },
  express.static(path.join(process.cwd(), "uploads"))
);

// routes
app.use("/api/cars", carRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/auth", authRouter);
app.use("/api/payments", paymentRouter);

app.get("/api/ping", (req, res) => res.json({ ok: true, time: Date.now() }));

// Diagnostic endpoint to check environment configuration (safe - doesn't expose secrets)
app.get("/api/health", (req, res) => {
  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV || "not set",
      port: process.env.PORT || 5000,
    },
    services: {
      database: "connected", // Assuming DB connection is checked elsewhere
      stripe: {
        configured: !!process.env.STRIPE_SECRET_KEY,
        keyLength: process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.length : 0,
        keyPrefix: process.env.STRIPE_SECRET_KEY 
          ? process.env.STRIPE_SECRET_KEY.substring(0, 7) + "..." 
          : "not set",
      },
      jwt: {
        configured: !!process.env.JWT_SECRET,
        usingDefault: !process.env.JWT_SECRET || process.env.JWT_SECRET === 'your_jwt_secret_here',
      },
      clientUrl: process.env.CLIENT_URL || "not set (using default)",
      cors: {
        allowedOrigins: [
          'https://true-drive-rentals-frontend.onrender.com',
          'https://true-drive-rentals-admin.onrender.com'
        ],
      },
    },
    warnings: [],
    errors: [],
  };

  // Add warnings for missing critical config
  if (!process.env.STRIPE_SECRET_KEY) {
    health.errors.push("STRIPE_SECRET_KEY is not set - payments will fail");
    health.status = "degraded";
  } else if (!process.env.STRIPE_SECRET_KEY.startsWith("sk_")) {
    health.warnings.push("STRIPE_SECRET_KEY format may be invalid (should start with 'sk_')");
  }

  if (!process.env.CLIENT_URL) {
    health.warnings.push("CLIENT_URL is not set - using default");
  }

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your_jwt_secret_here') {
    health.warnings.push("JWT_SECRET is using default value - should be changed for production");
  }

  res.json(health);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
