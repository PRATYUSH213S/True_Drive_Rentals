# Deployment Checklist & Troubleshooting Guide

## 🔍 How to Check Backend Configuration

### Method 1: Use the Health Endpoint (Recommended)

After deploying, visit this URL in your browser or use curl:

```
https://true-drive-rentals-backend.onrender.com/api/health
```

This will show you:
- ✅ Which environment variables are set
- ⚠️ Warnings about missing or invalid configuration
- ❌ Errors that will cause failures

**Example Response:**
```json
{
  "status": "ok",
  "services": {
    "stripe": {
      "configured": true,
      "keyPrefix": "sk_test..."
    },
    "jwt": {
      "configured": true,
      "usingDefault": false
    }
  },
  "warnings": [],
  "errors": []
}
```

### Method 2: Check Render Dashboard Logs

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your backend service (`true-drive-rentals-backend`)
3. Click on **"Logs"** tab
4. Look for:
   - `"DB connected"` - Database is working
   - `"Server running on port 5000"` - Server started
   - Any error messages about missing environment variables

### Method 3: Check Environment Variables in Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your backend service
3. Click on **"Environment"** tab
4. Verify these variables are set:

**Required Variables:**
- ✅ `STRIPE_SECRET_KEY` - Your Stripe secret key (starts with `sk_test_` or `sk_live_`)
- ✅ `CLIENT_URL` - `https://true-drive-rentals-frontend.onrender.com`
- ✅ `JWT_SECRET` - A random secret string for JWT tokens
- ✅ `MONGO_URI` - MongoDB connection string (if not hardcoded)

## 🚨 Common Issues & Fixes

### Issue: "Failed to create Stripe session"

**Cause:** `STRIPE_SECRET_KEY` is missing or invalid

**Fix:**
1. Get your Stripe key from https://dashboard.stripe.com/apikeys
2. In Render → Backend → Environment, add:
   ```
   STRIPE_SECRET_KEY=sk_test_your_actual_key_here
   ```
3. Redeploy the backend service

### Issue: "404 Not Found" on frontend routes

**Cause:** Missing `static.json` for SPA routing

**Fix:**
- The `frontend/static.json` file should be in your repo
- Make sure it's included in the build
- Redeploy frontend

### Issue: CORS errors

**Cause:** Frontend URL not in CORS allowed origins

**Fix:**
- Check `backend/server.js` - CORS origins should include your frontend URL
- Already configured for:
  - `https://true-drive-rentals-frontend.onrender.com`
  - `https://true-drive-rentals-admin.onrender.com`

## 📋 Required Environment Variables Summary

### Backend Service on Render:

```env
# Stripe Payment (REQUIRED for bookings)
STRIPE_SECRET_KEY=sk_test_...  # or sk_live_... for production

# Frontend URL (for redirects)
CLIENT_URL=https://true-drive-rentals-frontend.onrender.com

# JWT Authentication (REQUIRED)
JWT_SECRET=your_random_secret_string_here

# Server Port (optional, defaults to 5000)
PORT=5000

# MongoDB (currently hardcoded, but should be env var)
MONGO_URI=mongodb+srv://...
```

## ✅ Quick Test Commands

Test if backend is running:
```bash
curl https://true-drive-rentals-backend.onrender.com/api/ping
# Should return: {"ok":true,"time":...}
```

Test configuration:
```bash
curl https://true-drive-rentals-backend.onrender.com/api/health
# Shows all configuration status
```

## 🔄 After Making Changes

1. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add health endpoint and fix configuration"
   git push
   ```

2. **Redeploy on Render:**
   - Backend: Go to service → Manual Deploy → Deploy latest commit
   - Frontend: Auto-deploys if enabled, or manually deploy

3. **Wait for deployment** (usually 2-5 minutes)

4. **Test the health endpoint** to verify configuration

