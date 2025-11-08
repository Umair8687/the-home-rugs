# The Home Rugs - Vercel Deployment Guide

Complete guide to deploy your website to Vercel and connect your GoDaddy domain.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Overview](#project-overview)
3. [Pre-Deployment Setup](#pre-deployment-setup)
4. [Deploy to Vercel](#deploy-to-vercel)
5. [Configure Environment Variables](#configure-environment-variables)
6. [Connect GoDaddy Domain](#connect-godaddy-domain)
7. [Testing Your Deployment](#testing-your-deployment)
8. [Troubleshooting](#troubleshooting)
9. [Optional: Using Vercel API Instead of EmailJS](#optional-using-vercel-api-instead-of-emailjs)

---

## Prerequisites

Before you begin, ensure you have:

- [x] GitHub account (free)
- [x] Vercel account (free) - Sign up at https://vercel.com
- [x] GoDaddy domain purchased
- [x] Gmail account with App Password generated
- [x] Your code pushed to GitHub repository

---

## Project Overview

### Current Structure
```
The-Home-Rugs/
├── Website/              # Static frontend (HTML, CSS, images)
├── api/                  # Vercel serverless functions (NEW)
├── contact form/         # Local development server (not deployed)
├── vercel.json          # Vercel configuration (NEW)
├── .env.example         # Environment variables template (NEW)
└── .gitignore           # Git ignore file (NEW)
```

### Technology Stack
- **Frontend**: Static HTML5, CSS3, Vanilla JavaScript
- **Email Service**: EmailJS (client-side, currently active)
- **API**: Vercel Serverless Functions with Nodemailer (optional backend)
- **Hosting**: Vercel (free tier)
- **Domain**: GoDaddy (your custom domain)

---

## Pre-Deployment Setup

### Step 1: Generate Gmail App Password

Your contact form needs a Gmail App Password to send emails securely.

1. Go to your Google Account: https://myaccount.google.com
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Scroll down to **App passwords**
4. Click **App passwords**
5. Select app: **Mail**
6. Select device: **Other (Custom name)** → Type: "The Home Rugs Website"
7. Click **Generate**
8. **COPY THE 16-CHARACTER PASSWORD** (you'll need this later)
9. Click **Done**

**Important**: This is NOT your regular Gmail password. It's a special password just for this website.

### Step 2: Push Code to GitHub

If you haven't already pushed your code to GitHub:

```bash
# Navigate to your project folder
cd "D:\The-Home-Rugs"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Prepare for Vercel deployment"

# Create a new repository on GitHub (via web interface)
# Then link and push:
git remote add origin https://github.com/YOUR_USERNAME/the-home-rugs.git
git branch -M main
git push -u origin main
```

**Security Check**:
- The `.gitignore` file will prevent sensitive files (`.env`, `node_modules`) from being uploaded
- Your email credentials will NOT be in the repository

---

## Deploy to Vercel

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click **Sign Up**
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Repository

1. From Vercel Dashboard, click **Add New** → **Project**
2. Find and select your `the-home-rugs` repository
3. Click **Import**

### Step 3: Configure Project Settings

On the project configuration page:

**Framework Preset**: `Other` (leave as default)

**Root Directory**: `./` (leave blank or use root)

**Build & Output Settings**:
- Build Command: Leave empty (static site + serverless functions)
- Output Directory: `Website`
- Install Command: `npm install` (leave as default)

Click **Deploy** (but wait! We need to add environment variables first)

### Step 4: Cancel and Add Environment Variables First

1. Click the project name (top left) to go back
2. Go to **Settings** → **Environment Variables**
3. Add the following variables:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `EMAIL_USER` | Your Gmail address | `thehomerugs1@gmail.com` |
| `EMAIL_PASSWORD` | Gmail App Password (16 chars) | `abcd efgh ijkl mnop` |
| `EMAIL_RECIPIENT` | Email to receive messages | `jameemaqavi@gmail.com` |

**For each variable**:
- Click **Add**
- Enter **Name**
- Enter **Value**
- Select **Production**, **Preview**, and **Development**
- Click **Save**

### Step 5: Deploy

1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Check **Use existing Build Cache**
4. Click **Redeploy**

**Wait 1-2 minutes** for deployment to complete.

### Step 6: Verify Deployment

Once deployed, you'll see:
- ✅ Deployment Status: **Ready**
- Visit your site at: `https://your-project-name.vercel.app`

Click **Visit** to open your website.

---

## Configure Environment Variables

Already done in Step 4 above! But here's what each variable does:

- **EMAIL_USER**: The Gmail account that will send emails from your contact form
- **EMAIL_PASSWORD**: The 16-character App Password (NOT your regular password)
- **EMAIL_RECIPIENT**: Where contact form messages will be sent to

**To update variables later**:
1. Go to project **Settings** → **Environment Variables**
2. Click the **⋮** menu next to the variable
3. Edit and save
4. Redeploy from the **Deployments** tab

---

## Connect GoDaddy Domain

### Step 1: Add Domain in Vercel

1. In your Vercel project, go to **Settings** → **Domains**
2. Enter your domain (e.g., `thehomerugs.com`)
3. Click **Add**

Vercel will show you the DNS records you need to add.

### Step 2: Configure DNS in GoDaddy

#### Option A: Using Nameservers (Recommended - Easier)

1. Log in to GoDaddy: https://dcc.godaddy.com
2. Go to **My Products** → **Domains** → Click your domain
3. Scroll to **Additional Settings** → Click **Manage DNS**
4. Scroll to **Nameservers** → Click **Change**
5. Select **Enter my own nameservers (advanced)**
6. Add Vercel nameservers:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
7. Click **Save**

**Note**: DNS changes take 24-48 hours to propagate fully.

#### Option B: Using DNS Records (Alternative)

If you prefer to keep GoDaddy nameservers:

1. Go to **Manage DNS** in GoDaddy
2. Add these DNS records:

**For root domain (thehomerugs.com)**:
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`
- TTL: `600` seconds

**For www subdomain (www.thehomerugs.com)**:
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: `600` seconds

3. Click **Save**

### Step 3: Verify Domain

1. Return to Vercel **Domains** tab
2. Wait 5-10 minutes
3. Your domain status should change to **Valid**
4. Visit your domain: `https://thehomerugs.com`

**Troubleshooting**: If domain doesn't work after 24 hours, check:
- DNS records are correctly entered
- No conflicting records in GoDaddy
- SSL certificate is issued (Vercel does this automatically)

---

## Testing Your Deployment

### Test 1: Website Loading
- [x] Visit `https://your-domain.com`
- [x] Check all pages: Home, About, Products, Contact
- [x] Verify images load correctly
- [x] Test responsive design (mobile view)
- [x] Check hamburger menu works

### Test 2: Contact Form (EmailJS - Current)
1. Go to Contact page
2. Fill out the form:
   - Name: Test User
   - Email: test@example.com
   - Message: This is a test message
3. Click **Send**
4. You should see: "Message sent successfully!"
5. Check your email (jameemaqavi@gmail.com) for the message

**Why it works**: Your contact form currently uses EmailJS, which is a client-side email service that doesn't require backend configuration. It will continue to work without any changes.

### Test 3: Vercel API Endpoint (Optional)
If you want to test the Vercel serverless API:

Use this curl command (replace with your domain):
```bash
curl -X POST https://your-domain.com/api/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing Vercel API"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

### Test 4: Verify Environment Variables
1. Go to Vercel Dashboard → Your Project
2. **Settings** → **Environment Variables**
3. Verify all 3 variables are set and showing masked values

---

## Troubleshooting

### Issue: Domain Not Working After 24 Hours

**Solution**:
1. Check DNS propagation: https://dnschecker.org
2. Verify DNS records in GoDaddy match Vercel requirements
3. Try clearing browser cache (Ctrl+Shift+Delete)
4. Try accessing from incognito mode

### Issue: Contact Form Not Sending Emails

**Current Form (EmailJS)**:
- Verify EmailJS credentials in `Website/contact.html:51`
- Check EmailJS dashboard for quota limits
- Ensure EmailJS account is active

**If Using Vercel API**:
- Check environment variables are set correctly
- Verify Gmail App Password is valid (16 characters, no spaces)
- Check Vercel Function logs: Dashboard → Project → Logs
- Ensure 2-Step Verification is enabled on Gmail

### Issue: Images Not Loading

**Solution**:
1. Check file paths in HTML (should be relative: `images/logo.jpg`)
2. Verify images are in `Website/images/` folder
3. Check browser console for 404 errors
4. Ensure images were pushed to GitHub repository

### Issue: "Too Many Requests" Error

**Solution**:
- Vercel free tier limits: 100GB bandwidth/month, 100 serverless function executions/day
- EmailJS free tier: 200 emails/month
- Upgrade plan if you exceed limits

### Issue: Deployment Failed

**Solution**:
1. Check Vercel build logs for errors
2. Verify `vercel.json` is in root directory
3. Ensure `package.json` exists in `api/` folder
4. Check for syntax errors in serverless function code
5. Try redeploying: Deployments → ⋮ → Redeploy

### Issue: API Endpoint Returns 500 Error

**Solution**:
1. Check environment variables are set
2. View Function logs: Vercel Dashboard → Project → Functions → Click function → Logs
3. Common issues:
   - Missing EMAIL_USER, EMAIL_PASSWORD, or EMAIL_RECIPIENT
   - Invalid Gmail App Password
   - Gmail blocking sign-in (check Gmail security alerts)

---

## Optional: Using Vercel API Instead of EmailJS

Your website currently uses **EmailJS** for the contact form, which works perfectly and requires no backend setup. However, if you want to switch to the **Vercel API** endpoint for more control:

### Step 1: Update Contact Form

Edit `Website/contact.html` and replace the EmailJS script section (lines 46-64) with:

```html
<script>
  document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
    };

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert("Message sent successfully!");
        document.getElementById("contact-form").reset();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message. Please try again.");
    }
  });
</script>
```

### Step 2: Remove EmailJS Library

Remove this line (line 46-48):
```html
<script type="text/javascript"
    src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js">
</script>
```

And remove the EmailJS initialization (lines 50-52):
```html
<script>
  (function(){
   emailjs.init("f8ZHyk-7gK8s2rUHp");
  })();
</script>
```

### Step 3: Test the New API

1. Commit and push changes to GitHub
2. Vercel will auto-deploy
3. Test the contact form on your live site
4. Check recipient email for messages

**Benefits of using Vercel API**:
- More control over email formatting
- No third-party dependencies
- Custom validation and error handling
- Better integration with your backend logic

**Benefits of keeping EmailJS** (current):
- Simpler setup (no backend config needed)
- No API rate limits to manage
- Works even if Vercel functions have issues
- Already configured and working

**Recommendation**: Keep EmailJS unless you need advanced email features.

---

## Production Checklist

Before going live with your custom domain:

- [ ] All environment variables configured in Vercel
- [ ] Gmail App Password generated and working
- [ ] Domain connected and SSL certificate active (green padlock)
- [ ] Contact form tested and receiving emails
- [ ] All images loading correctly
- [ ] Mobile responsive design verified
- [ ] All navigation links working
- [ ] Browser tested: Chrome, Firefox, Safari, Edge
- [ ] Social media links working (Facebook, Instagram)
- [ ] Footer information is correct
- [ ] About page information is accurate
- [ ] Products page displays all items
- [ ] Privacy policy added (optional but recommended)
- [ ] Google Analytics added (optional)

---

## Maintenance & Updates

### How to Update Your Website

**Method 1: GitHub + Auto-Deploy (Recommended)**
1. Make changes to your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update product images"
   git push
   ```
3. Vercel automatically deploys in 1-2 minutes
4. Visit your site to see changes

**Method 2: Vercel CLI**
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Deploy from terminal:
   ```bash
   vercel
   ```

### How to Add New Products

1. Add product images to `Website/images/` folder
2. Edit `Website/products.html`
3. Copy an existing product `<div class="product">` block
4. Update image path, title, and description
5. Commit and push to GitHub

### How to Update Contact Information

1. Edit `Website/contact.html` (lines 67-68)
2. Edit `Website/index.html`, `about.html`, `products.html` footers
3. Update email and phone numbers
4. Commit and push

### How to Monitor Email Delivery

**For EmailJS**:
- Dashboard: https://dashboard.emailjs.com
- View sent emails, delivery status, quota usage

**For Vercel API**:
- Vercel Dashboard → Functions → Logs
- Check for errors or successful sends
- Monitor Gmail sent folder

---

## Cost Breakdown

| Service | Free Tier | Paid (if needed) |
|---------|-----------|------------------|
| Vercel Hosting | 100GB bandwidth/month | $20/month (Pro) |
| Vercel Functions | 100GB-hours/month | Included in Pro |
| GoDaddy Domain | $0 (already purchased) | $10-20/year renewal |
| EmailJS | 200 emails/month | $7/month (500 emails) |
| Gmail | Free | Free |

**Total Monthly Cost**: **$0** (on free tiers)

**Note**: Vercel free tier is very generous and should handle small-to-medium business websites easily.

---

## Advanced Tips

### Enable HTTPS (Automatic)
Vercel automatically provisions SSL certificates for all domains. Just ensure:
- Domain is properly connected
- DNS records are correct
- Wait 5-10 minutes for certificate issuance

### Add Custom 404 Page
Create `Website/404.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found - The Home Rugs</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <section class="hero">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <a href="index.html" style="color:#a67c52;">Go back to home</a>
    </section>
</body>
</html>
```

### Add Analytics (Optional)

**Google Analytics**:
1. Create account: https://analytics.google.com
2. Get tracking code
3. Add to all HTML files in `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**Vercel Analytics** (Simpler):
1. Go to Vercel Dashboard → Project → Analytics
2. Click **Enable Analytics**
3. View visitor stats, page views, performance metrics

### Speed Optimization

Your site is already fast (static HTML), but you can:
1. Compress images: Use https://tinypng.com
2. Enable caching: Already done via Vercel
3. Minify CSS: Use https://cssminifier.com (optional)
4. Lazy load images: Add `loading="lazy"` to `<img>` tags

---

## Security Best Practices

1. **Never commit `.env` files** - Already prevented by `.gitignore`
2. **Use environment variables** - Already implemented for API
3. **Keep dependencies updated** - Run `npm update` regularly
4. **Monitor for vulnerabilities** - GitHub Dependabot will alert you
5. **Use HTTPS only** - Vercel enforces this automatically
6. **Validate form inputs** - Current form has basic validation
7. **Rate limit API calls** - Consider adding if spam becomes an issue

---

## Support & Resources

### Vercel Documentation
- Deployment: https://vercel.com/docs/deployments/overview
- Custom Domains: https://vercel.com/docs/projects/domains
- Serverless Functions: https://vercel.com/docs/functions

### GoDaddy Support
- Domain Management: https://www.godaddy.com/help/manage-dns-680
- Nameserver Changes: https://www.godaddy.com/help/change-nameservers-664

### EmailJS Documentation
- Setup Guide: https://www.emailjs.com/docs/
- Dashboard: https://dashboard.emailjs.com

### Gmail App Passwords
- Generate: https://myaccount.google.com/apppasswords
- Troubleshooting: https://support.google.com/accounts/answer/185833

---

## Conclusion

Your website is now deployed to Vercel with:
- ✅ Static website hosting (free, fast, global CDN)
- ✅ Custom domain from GoDaddy
- ✅ SSL certificate (HTTPS)
- ✅ Contact form with email integration
- ✅ Automatic deployments from GitHub
- ✅ Serverless API ready (optional use)

**Next Steps**:
1. Test all functionality on your live domain
2. Share your website with customers
3. Monitor email submissions
4. Add more products as needed
5. Consider adding Google Analytics

**Need Help?**
- Vercel Support: https://vercel.com/support
- GitHub Issues: Create issue in your repo
- GoDaddy Support: 24/7 phone support

---

**Congratulations! Your website is live! 🎉**

Visit your site at: `https://your-domain.com`

---

*Last Updated: January 2025*
*Version: 1.0*
