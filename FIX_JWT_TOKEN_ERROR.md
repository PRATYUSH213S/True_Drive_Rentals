# 🔐 Fix "Token invalid or expired" Error

## The Problem
You're seeing "Token invalid or expired" on the My Bookings page because:
1. The JWT secret used to create your token doesn't match the secret used to verify it
2. Your token might have been created with a hardcoded secret, but the backend is using a different secret from environment variables

## ✅ Solution Steps

### Step 1: Set JWT_SECRET in Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your **backend service** (`true_drive_Rentals_backend`)
3. Click **"Environment"** tab
4. **Add or update this variable:**
   ```
   KEY: JWT_SECRET
   VALUE: your_random_secret_string_here_12345
   ```
   **Important:** Use a long, random string. For example:
   - `my_super_secret_jwt_key_2025_xyz123_abc456`
   - Or generate one: https://randomkeygen.com/

### Step 2: Redeploy Backend

**CRITICAL:** After setting environment variables, you MUST redeploy:

1. In Render, click **"Save Changes"** (if you just added JWT_SECRET)
2. Then click **"Manual Deploy"** → **"Deploy latest commit"**
3. Wait for deployment to complete (2-5 minutes)

### Step 3: Clear Your Old Token and Log In Again

Since your current token was created with the old secret, you need a new one:

1. **On your frontend website:**
   - Click **"Logout"** button (top right)
   - This clears the old token from localStorage

2. **Log in again:**
   - Go to `/login`
   - Enter your email and password
   - This creates a new token with the correct JWT_SECRET

3. **Test My Bookings:**
   - Go to `/bookings`
   - The error should be gone!

## 🔍 Verify It's Working

After redeploying, check the backend logs in Render:

1. Go to backend service → **"Logs"** tab
2. Look for: `"Server running on port 5000"`
3. Try accessing My Bookings
4. Check logs for any JWT errors

You can also test the health endpoint:
```
https://true-drive-rentals-backend.onrender.com/api/health
```

Look for:
```json
{
  "services": {
    "jwt": {
      "configured": true,
      "usingDefault": false
    }
  }
}
```

## ⚠️ Important Notes

1. **Always redeploy after changing environment variables** - Render doesn't automatically restart
2. **Use the same JWT_SECRET** - If you change it, all existing tokens become invalid
3. **Keep JWT_SECRET secret** - Never commit it to GitHub
4. **Log out and log back in** - After changing JWT_SECRET, users need new tokens

## 🚨 If Still Not Working

1. **Check Render Logs:**
   - Look for "JWT verification failed" errors
   - Check what JWT_SECRET is being used

2. **Verify Environment Variable:**
   - In Render → Environment tab
   - Make sure JWT_SECRET is set (not empty)
   - Make sure there are no extra spaces

3. **Clear Browser Storage:**
   - Open browser DevTools (F12)
   - Go to Application/Storage tab
   - Clear localStorage
   - Log in again

4. **Check Backend Code:**
   - Make sure `authController.js` uses `process.env.JWT_SECRET`
   - Make sure `auth.js` middleware uses `process.env.JWT_SECRET`
   - Both should use the same secret!

## 📝 Summary

The fix requires:
1. ✅ Set `JWT_SECRET` in Render environment variables
2. ✅ Redeploy backend service
3. ✅ Log out and log back in to get a new token

After these steps, the "Token invalid or expired" error should be resolved!

