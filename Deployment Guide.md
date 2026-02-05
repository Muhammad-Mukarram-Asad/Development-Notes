# 🚀 Complete Deployment Guide
## Railway Database + Vercel Hosting for Next.js MySQL Project

---

## 📋 Table of Contents
1. [Railway Pricing & Duration](#railway-pricing--duration)
2. [Prerequisites](#prerequisites)
3. [Part 1: Setting Up Railway MySQL Database](#part-1-setting-up-railway-mysql-database)
4. [Part 2: Connecting MySQL Workbench to Railway](#part-2-connecting-mysql-workbench-to-railway)
5. [Part 3: Deploying Next.js to Vercel](#part-3-deploying-nextjs-to-vercel)
6. [Part 4: Connecting Everything Together](#part-4-connecting-everything-together)
7. [Troubleshooting](#troubleshooting)

---

## 💰 Railway Pricing & Duration

### How Long Will Your Database Stay Hosted?

**Railway Free Tier Details:**
- **$5 in FREE credits per month** (resets monthly)
- Your current usage: **$4.99/month**
- **Database will stay online as long as you stay within the $5/month limit**

### Cost Breakdown:
- Small MySQL database (like yours): **~$3-5/month**
- If you exceed $5/month, Railway will charge your credit card
- **No time limit** - it stays hosted indefinitely as long as credits cover it

### What Happens Each Month:
```
Month 1: $5 free credits → Use $4.99 → $0.01 remaining ✅
Month 2: $5 free credits (NEW) → Use $4.99 → $0.01 remaining ✅
Month 3: $5 free credits (NEW) → Use $4.99 → $0.01 remaining ✅
```

**Important Notes:**
- Credits reset on the 1st of each month
- Your database stays online 24/7
- No data loss between months
- If you go over $5 in a month, you'll be charged the excess

### To Monitor Your Usage:
1. Log into Railway
2. Go to your project
3. Click "Usage" tab
4. Check "Current Month Usage"

---

## 📝 Prerequisites

Before starting, make sure you have:

- ✅ GitHub account
- ✅ MySQL Workbench installed
- ✅ Next.js project with MySQL connection code
- ✅ Database schema exported as `.sql` file
- ✅ Internet connection

---

## Part 1: Setting Up Railway MySQL Database

### Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Click **"Login"** or **"Start a New Project"**
3. Sign up using GitHub (recommended for easy integration)
4. Verify your email if prompted

### Step 2: Create New Project

1. After logging in, click **"New Project"**
2. Select **"Provision MySQL"** from the options
3. Railway will start creating your MySQL database
4. Wait 1-2 minutes for creation to complete

### Step 3: Access Database Details

Once created, you'll see:
- Project name (e.g., "production")
- MySQL service (with a dolphin icon 🐬)

Click on the **MySQL service** to view details.

### Step 4: Get Connection Credentials

1. Click on the **"Variables"** tab
2. You'll see environment variables. Click the **eye icon (👁️)** to reveal values
3. **Copy and save these values** (you'll need them multiple times):

| Variable Name | Example Value | Purpose |
|--------------|---------------|---------|
| `MYSQLHOST` | `crossover.proxy.rlwy.net` | Database host address |
| `MYSQLPORT` | `15253` | Database port (NOT 3306!) |
| `MYSQLUSER` | `root` | Database username |
| `MYSQLPASSWORD` | `Xk9mP2nQ7rT8...` | Database password |
| `MYSQLDATABASE` | `railway` | Default database name |

**💡 Pro Tip:** Copy these to a text file for easy reference!

### Step 5: Understand Public vs Private Network

Railway provides two connection options:

**Private Network:**
- Only accessible from other Railway services
- Free egress
- Use for Railway-to-Railway connections

**Public Network:**
- Accessible from anywhere (your computer, Vercel, etc.)
- Uses the values from Variables tab
- This is what you'll use

---

## Part 2: Connecting MySQL Workbench to Railway

### Step 1: Export Your Local Database Schema

Before connecting to Railway, export your local database:

1. Open **MySQL Workbench**
2. Connect to your **local MySQL** (localhost:3306)
3. Go to **Server** → **Data Export**
4. Select your database: `social_media_analytics`
5. Choose **"Export to Self-Contained File"**
6. Check ✅ **"Include Create Schema"**
7. Set export path: e.g., `C:\Users\YourName\Documents\schema.sql`
8. Click **"Start Export"**

### Step 2: Create New Connection in MySQL Workbench

1. In MySQL Workbench, click **"+"** next to "MySQL Connections"
2. Fill in the connection details:

```
Connection Name: Railway Production DB
Connection Method: Standard (TCP/IP)
Hostname: [Copy from MYSQLHOST]
Port: [Copy from MYSQLPORT] ← NOT 3306!
Username: [Copy from MYSQLUSER]
Password: Click "Store in Vault..." → [Paste MYSQLPASSWORD]
Default Schema: railway (or leave blank)
```

**Example:**
```
Connection Name: Railway Production DB
Hostname: crossover.proxy.rlwy.net
Port: 15253
Username: root
Password: ••••••••••
```

3. Click **"Test Connection"**
4. You may see a warning about MySQL version compatibility - **this is normal, click OK**
5. If successful, click **"OK"** to save the connection

### Step 3: Import Your Schema to Railway

1. **Double-click** the new Railway connection to open it
2. In Railway database, go to **Server** → **Data Import**
3. Select **"Import from Self-Contained File"**
4. Browse to your exported `.sql` file
5. Under "Default Target Schema":
   - If your SQL file has `CREATE DATABASE`, select **"railway"**
   - Otherwise, create new schema first
6. Click **"Start Import"**
7. Wait for import to complete

### Step 4: Verify Import

1. In the left sidebar, click **🔄 Refresh**
2. Expand **Schemas**
3. You should see `social_media_analytics` database
4. Expand it to see your tables:
   - `users`
   - `posts`
   - `engagement`
   - etc.

✅ **Your database is now hosted on Railway!**

---

## Part 3: Deploying Next.js to Vercel

### Step 1: Prepare Your Code

Before deploying, ensure your database connection uses environment variables.

**Check your database connection file** (usually `src/lib/db.js`):

```javascript
import mysql from 'mysql2/promise';

export async function query(sql, params) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,      // ✅ Must use process.env
    port: process.env.DB_PORT,      // ✅ Must use process.env
    user: process.env.DB_USER,      // ✅ Must use process.env
    password: process.env.DB_PASSWORD, // ✅ Must use process.env
    database: process.env.DB_NAME   // ✅ Must use process.env
  });

  const [results] = await connection.execute(sql, params);
  await connection.end();
  return results;
}
```

**❌ WRONG - Never hardcode credentials:**
```javascript
host: 'crossover.proxy.rlwy.net',  // ❌ Don't do this!
password: 'mypassword123',          // ❌ Security risk!
```

### Step 2: Push Code to GitHub

1. Make sure all changes are committed:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. Verify your code is on GitHub:
   - Go to your repository
   - Check that all files are present

### Step 3: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (easiest option)
4. Authorize Vercel to access your repositories

### Step 4: Import Your Project

1. On Vercel dashboard, click **"Add New..."** → **"Project"**
2. You'll see your GitHub repositories
3. Find your project: `social_media_analytics_dashboard`
4. Click **"Import"**

### Step 5: Configure Environment Variables

**CRITICAL STEP:** Before deploying, add your Railway credentials.

In the "Configure Project" screen:

1. Scroll down to **"Environment Variables"**
2. Add each variable (click "Add" after each one):

| Key | Value | Where to Get It |
|-----|-------|-----------------|
| `DB_HOST` | `crossover.proxy.rlwy.net` | Railway Variables: MYSQLHOST |
| `DB_PORT` | `15253` | Railway Variables: MYSQLPORT |
| `DB_USER` | `root` | Railway Variables: MYSQLUSER |
| `DB_PASSWORD` | `Xk9mP2nQ7rT8...` | Railway Variables: MYSQLPASSWORD (click eye) |
| `DB_NAME` | `social_media_analytics` | Your schema name |

**Screenshot of how it looks:**
```
┌─────────────────────────────────────────┐
│ Environment Variables                    │
├─────────────┬───────────────────────────┤
│ DB_HOST     │ crossover.proxy.rlwy.net │
├─────────────┼───────────────────────────┤
│ DB_PORT     │ 15253                     │
├─────────────┼───────────────────────────┤
│ DB_USER     │ root                      │
├─────────────┼───────────────────────────┤
│ DB_PASSWORD │ •••••••••••••             │
├─────────────┼───────────────────────────┤
│ DB_NAME     │ social_media_analytics    │
└─────────────┴───────────────────────────┘
```

3. Keep other settings as default
4. Click **"Deploy"**

### Step 6: Wait for Deployment

Vercel will:
1. Clone your repository
2. Install dependencies (`npm install`)
3. Build your project (`npm run build`)
4. Deploy to their servers

This takes 2-5 minutes. You'll see:
```
Building... ⚙️
Deploying... 🚀
Success! ✅
```

### Step 7: Access Your Live Site

Once deployed, Vercel gives you a URL:
```
https://your-project-name.vercel.app
```

Click it to see your live dashboard! 🎉

---

## Part 4: Connecting Everything Together

### The Complete Flow

Here's how everything connects:

```
┌─────────────────────┐
│   USER'S BROWSER    │
│  (Anywhere in the   │
│      world)         │
└──────────┬──────────┘
           │ HTTPS Request
           ↓
┌─────────────────────┐
│       VERCEL        │
│  ┌───────────────┐  │
│  │  Next.js App  │  │
│  │  + API Routes │  │
│  └───────┬───────┘  │
│          │          │
│    Environment      │
│    Variables:       │
│    • DB_HOST        │
│    • DB_PORT        │
│    • DB_USER        │
│    • DB_PASSWORD    │
│    • DB_NAME        │
└──────────┬──────────┘
           │ MySQL Connection
           │ (Over Internet)
           ↓
┌─────────────────────┐
│      RAILWAY        │
│  ┌───────────────┐  │
│  │ MySQL Server  │  │
│  │               │  │
│  │ social_media_ │  │
│  │   analytics   │  │
│  │               │  │
│  │  • users      │  │
│  │  • posts      │  │
│  │  • engagement │  │
│  └───────────────┘  │
└─────────────────────┘

┌─────────────────────┐
│  MySQL Workbench    │
│  (Your Computer)    │
│                     │
│  Used for:          │
│  • Viewing data     │
│  • Running queries  │
│  • Managing schema  │
└─────────────────────┘
```

### How a Request Works

When a user visits your dashboard:

1. **User opens** `https://your-app.vercel.app`
2. **Vercel serves** the HTML/CSS/JavaScript
3. **Browser loads** the dashboard page
4. **React component** calls API: `fetch('/api/stats')`
5. **Vercel API route** runs on server:
   ```javascript
   // This code runs on Vercel's server, NOT in browser
   const connection = await mysql.createConnection({
     host: process.env.DB_HOST,  // Railway's host
     // ... other env vars
   });
   const [results] = await connection.execute('SELECT * FROM users');
   ```
6. **Vercel connects to Railway** using environment variables
7. **Railway MySQL** executes the query
8. **Data flows back**: Railway → Vercel → User's Browser
9. **React displays** the data in charts and tables

### Security Notes

- ✅ Database password is never exposed to users
- ✅ API routes run on server, not in browser
- ✅ Direct database access is prevented
- ✅ All communication is encrypted (HTTPS)

---

## 🔧 Troubleshooting

### Issue 1: "Cannot connect to database" on Vercel

**Symptoms:**
- Site loads but shows "Loading..." forever
- API routes return 500 errors
- Vercel logs show connection errors

**Solutions:**

1. **Check Environment Variables:**
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Verify all 5 variables are present
   - Check for typos in variable names
   - Click "Redeploy" after fixing

2. **Verify Railway Database:**
   - Log into Railway
   - Check that MySQL service is running (green status)
   - Verify connection works in MySQL Workbench

3. **Check Port Number:**
   - Railway port is usually **15253**, NOT 3306
   - Verify in Railway Variables tab

### Issue 2: MySQL Workbench Connection Refused

**Symptoms:**
- "Cannot connect to database server"
- "Connection refused"
- Timeout errors

**Solutions:**

1. **Use Public Network Credentials:**
   - In Railway, click "Connect" button
   - Switch to "Public Network" tab
   - Use those values, not Private Network

2. **Check Port:**
   - Railway uses custom port (e.g., 15253)
   - Your local MySQL uses 3306
   - Make sure you're using Railway's port

3. **Stop Local MySQL (if needed):**
   ```bash
   # Windows
   services.msc → Find MySQL80 → Stop

   # Mac
   brew services stop mysql
   ```

### Issue 3: Build Fails on Vercel

**Symptoms:**
- Vercel shows "Build Failed"
- TypeScript errors
- ESLint errors

**Solutions:**

1. **Fix TypeScript Errors:**
   ```typescript
   // Add type definitions
   const [data, setData] = useState<any[]>([]);
   ```

2. **Test Build Locally:**
   ```bash
   npm run build
   ```
   Fix any errors shown

3. **Check Node Version:**
   - Vercel uses Node.js 18+
   - Ensure package.json compatible

### Issue 4: Railway Charges More Than Expected

**Symptoms:**
- Monthly bill > $5
- Credits running out

**Solutions:**

1. **Check Usage:**
   - Railway → Project → Usage tab
   - Look for unexpected spikes

2. **Optimize Queries:**
   - Add database indexes
   - Reduce query frequency
   - Cache results when possible

3. **Consider Alternatives:**
   - **Aiven:** Free 1GB MySQL forever
   - **PlanetScale:** Free 5GB (but no foreign keys)
   - **Supabase:** Free PostgreSQL (if you can switch from MySQL)

---

## 📊 Monitoring Your Deployment

### Check Vercel Deployment Status

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. View:
   - **Deployments:** History of all deploys
   - **Analytics:** Page views, performance
   - **Logs:** Error messages and debugging info

### Check Railway Database Health

1. Go to [railway.app](https://railway.app)
2. Click your project
3. View:
   - **Metrics:** CPU, Memory, Network usage
   - **Usage:** Monthly cost and credits
   - **Logs:** Database connection logs

### Monitor Live Site

Tools to monitor your live dashboard:
- **Vercel Analytics:** Built-in (free tier)
- **Google Analytics:** Add tracking code
- **UptimeRobot:** Free uptime monitoring
- **Sentry:** Error tracking (free tier)

---

## 🎓 Next Steps

### Optimize Your Application

1. **Add Caching:**
   ```javascript
   // Cache API responses
   export const revalidate = 60; // Revalidate every 60 seconds
   ```

2. **Add Loading States:**
   - Better UX during data fetching
   - Skeleton screens

3. **Error Handling:**
   ```javascript
   try {
     const data = await fetch('/api/stats');
   } catch (error) {
     console.error('Failed to fetch:', error);
     // Show user-friendly error message
   }
   ```

### Secure Your Application

1. **Add Authentication:**
   - NextAuth.js
   - Clerk
   - Auth0

2. **Rate Limiting:**
   - Prevent API abuse
   - Protect database

3. **Environment Security:**
   - Never commit `.env` files
   - Rotate passwords regularly

### Scale Your Application

1. **Database Indexing:**
   ```sql
   CREATE INDEX idx_user_id ON posts(user_id);
   CREATE INDEX idx_created_at ON engagement(created_at);
   ```

2. **Connection Pooling:**
   ```javascript
   const pool = mysql.createPool({
     connectionLimit: 10,
     // ... other config
   });
   ```

3. **CDN for Static Assets:**
   - Vercel handles this automatically
   - Images optimized by Next.js

---

## 📚 Additional Resources

### Documentation Links

- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Railway Docs:** [docs.railway.app](https://docs.railway.app)
- **MySQL Docs:** [dev.mysql.com/doc](https://dev.mysql.com/doc/)

### Video Tutorials

- Next.js Deployment: Search "Next.js Vercel deployment"
- Railway MySQL Setup: Search "Railway MySQL tutorial"
- MySQL Workbench: Official MySQL YouTube channel

### Community Support

- **Vercel Discord:** [vercel.com/discord](https://vercel.com/discord)
- **Railway Discord:** [discord.gg/railway](https://discord.gg/railway)
- **Stack Overflow:** Tag questions with `nextjs`, `vercel`, `railway`

---

## ✅ Quick Reference Checklist

### Initial Setup
- [ ] Export local database schema
- [ ] Create Railway account
- [ ] Provision MySQL database
- [ ] Save connection credentials
- [ ] Connect MySQL Workbench to Railway
- [ ] Import schema to Railway
- [ ] Verify tables created

### Vercel Deployment
- [ ] Push code to GitHub
- [ ] Create Vercel account
- [ ] Import project
- [ ] Add environment variables (all 5)
- [ ] Deploy
- [ ] Test live site

### Post-Deployment
- [ ] Test all API endpoints
- [ ] Verify data displays correctly
- [ ] Check Railway usage
- [ ] Set up monitoring
- [ ] Document your deployment

---

## 🎉 Congratulations!

You've successfully deployed a full-stack Next.js application with:
- ✅ Live database on Railway
- ✅ Frontend and API on Vercel
- ✅ Professional deployment setup
- ✅ Scalable architecture

Your dashboard is now accessible worldwide! 🌍

---

**Created with ❤️ for Next.js + MySQL developers**

*Last Updated: February 2026*
