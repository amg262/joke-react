# Vercel Environment Variables Setup

## Quick Setup (No GitHub Secrets Needed!)

Since you're using Vercel with GitHub integration, you just need to set environment variables in your Vercel dashboard.

### 1. Go to your Vercel Dashboard
- Visit [vercel.com](https://vercel.com)
- Navigate to your project

### 2. Add Environment Variables
- Click on your project
- Go to **Settings** tab
- Click **Environment Variables** in the sidebar

### 3. Add the Production API URL
Add this environment variable:
- **Name**: `VITE_API_BASE_URL`
- **Value**: `https://whateverbruh.azurewebsites.net/api/v1`
- **Environment**: Select **Production** (and Preview if you want)

### 4. Deploy
- Just push to your main branch
- Vercel will automatically use the environment variable

## How It Works

### Local Development:
```bash
npm run dev
# Uses: https://localhost:8081 (from .env.development)
```

### Vercel Production:
```bash
# When Vercel builds your app, it uses:
# https://whateverbruh.azurewebsites.net/api/v1
# (from Vercel environment variable)
```

## That's It!
No GitHub Actions, no secrets, no complex pipelines needed. Vercel handles everything automatically when you push to GitHub.

## Testing
1. **Local**: Your app should connect to `https://localhost:8081`
2. **Production**: Your deployed app should connect to `https://whateverbruh.azurewebsites.net/api/v1`

## Troubleshooting
- If environment variable isn't working, redeploy your app after setting it
- Check Vercel's build logs if there are issues
- Make sure the variable name is exactly `VITE_API_BASE_URL` 