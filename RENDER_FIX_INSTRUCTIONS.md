# 🔧 Fix Stripe Payment Error on Render

## Current Issue
"Failed to create Stripe session" error when trying to book a car.

## ✅ What's Already Set (Good!)
- `STRIPE_SECRET_KEY` is configured in Render ✅
- Stripe key format looks correct (`sk_test_...`) ✅

## ❌ What Needs to Be Fixed

### Issue 1: Wrong Environment Variable Name
Your Render dashboard shows:
- ❌ `FRONTEND_URL=http://localhost:5173` (wrong name and wrong value)

The code expects:
- ✅ `CLIENT_URL=https://true-drive-rentals-frontend.onrender.com`

### Issue 2: Backend Needs Redeploy
After setting environment variables, you MUST redeploy the backend service.

## 🚀 Step-by-Step Fix

### Step 1: Update Environment Variables in Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on **`true_drive_Rentals_backend`** service
3. Click **"Environment"** tab
4. **Add or Update these variables:**

   **Add this NEW variable:**
   ```
   KEY: CLIENT_URL
   VALUE: https://true-drive-rentals-frontend.onrender.com
   ```

   **Update existing variable:**
   - Change `FRONTEND_URL` from `http://localhost:5173` to:
   ```
   KEY: FRONTEND_URL  (or you can delete this and use CLIENT_URL)
   VALUE: https://true-drive-rentals-frontend.onrender.com
   ```

   **Verify STRIPE_SECRET_KEY:**
   - Make sure it's still set and starts with `sk_test_` or `sk_live_`

### Step 2: Save and Redeploy

1. Click **"Save Changes"** button at the bottom
2. **IMPORTANT:** Click **"Save, rebuild, and deploy"** dropdown
3. Select **"Save, rebuild, and deploy"** (NOT just "Save")
4. Wait for deployment to complete (2-5 minutes)

### Step 3: Verify the Fix

After deployment completes:

1. **Test the health endpoint:**
   ```
   https://true-drive-rentals-backend.onrender.com/api/health
   ```
   
   Should show:
   ```json
   {
     "services": {
       "stripe": {
         "configured": true,
         "keyPrefix": "sk_test..."
       },
       "clientUrl": "https://true-drive-rentals-frontend.onrender.com"
     },
     "errors": []
   }
   ```

2. **Check Render Logs:**
   - Go to your backend service → "Logs" tab
   - Look for: `"Stripe initialized successfully"` (no errors)
   - If you see errors, they'll show what's wrong

3. **Test a booking:**
   - Go to your frontend
   - Try to book a car
   - Should redirect to Stripe checkout (not show error)

## 🔍 If Still Not Working

### Check Render Logs for Errors:

1. Go to backend service → **"Logs"** tab
2. Look for error messages when you try to book
3. Common errors:

   **"Missing STRIPE_SECRET_KEY"**
   - The environment variable isn't being read
   - Solution: Make sure you clicked "Save, rebuild, and deploy" after setting it

   **"Invalid API Key"**
   - The Stripe key is wrong or expired
   - Solution: Get a new key from https://dashboard.stripe.com/apikeys

   **"No such customer" or other Stripe API errors**
   - The key might be for a different Stripe account
   - Solution: Verify you're using the correct Stripe account

### Verify Stripe Key is Valid:

1. Go to https://dashboard.stripe.com/test/apikeys
2. Make sure you're in **Test mode** (toggle in top right)
3. Copy the **Secret key** (starts with `sk_test_`)
4. Make sure it matches what's in Render

## 📝 Summary of Required Environment Variables

```env
# Required for payments
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# Required for redirects after payment
CLIENT_URL=https://true-drive-rentals-frontend.onrender.com

# Optional but recommended
JWT_SECRET=your_random_secret_here
NODE_ENV=production
```

## ⚠️ Important Notes

1. **Always redeploy after changing environment variables** - Render doesn't automatically restart with new env vars
2. **Use the deployed frontend URL** - Not `localhost` for production
3. **Test keys vs Live keys** - Use `sk_test_` for testing, `sk_live_` for production
4. **Check logs** - They'll tell you exactly what's wrong

