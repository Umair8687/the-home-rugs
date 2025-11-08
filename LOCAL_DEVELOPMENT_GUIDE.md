# Local Development Guide - The Home Rugs

How to run your website on your local computer for testing.

---

## Quick Start (Easiest Method)

Your website currently uses **EmailJS** for the contact form, which works directly from the browser. You can simply open the HTML files:

### Option 1: Open HTML Files Directly

1. Navigate to the `Website` folder
2. Double-click `index.html`
3. Your website will open in your default browser

**Navigation**:
- Home: `index.html`
- About: `about.html`
- Products: `products.html`
- Contact: `contact.html`

**Note**: The contact form will work because EmailJS runs in the browser!

---

## Recommended Method (Using a Local Server)

For better testing (proper paths, no CORS issues), use a local web server:

### Method 1: Using Python (Built-in)

**If you have Python installed:**

```bash
# Open Command Prompt (cmd)
cd "D:\The-Home-Rugs\Website"

# For Python 3:
python -m http.server 8000

# For Python 2:
python -m SimpleHTTPServer 8000
```

**Access your website**:
- Open browser and go to: `http://localhost:8000`

**To stop the server**: Press `Ctrl + C` in the command prompt

---

### Method 2: Using Node.js http-server

**If you have Node.js installed:**

```bash
# Install http-server globally (one-time)
npm install -g http-server

# Navigate to Website folder
cd "D:\The-Home-Rugs\Website"

# Start server
http-server -p 8000
```

**Access your website**:
- Open browser and go to: `http://localhost:8000`

---

### Method 3: Using VS Code Live Server

**If you use Visual Studio Code:**

1. Install "Live Server" extension
2. Right-click on `index.html`
3. Click "Open with Live Server"
4. Website opens automatically in browser

**Bonus**: Auto-refreshes when you make changes!

---

## Running the Backend API (Optional)

If you want to test the Express server or Vercel API locally:

### Option 1: Test Express Server (Original)

```bash
# Open Command Prompt
cd "D:\The-Home-Rugs\contact form"

# Create .env file
copy .env.example .env

# Edit .env file and add your credentials:
# EMAIL_USER=thehomerugs1@gmail.com
# EMAIL_PASSWORD=your-app-password-here
# EMAIL_RECIPIENT=jameemaqavi@gmail.com

# Install dependencies
npm install

# Start server
npm start
```

**Server runs at**: `http://localhost:3000`

**Test the API**:
```bash
curl -X POST http://localhost:3000/send ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test\",\"email\":\"test@test.com\",\"message\":\"Hello\"}"
```

---

### Option 2: Test Vercel Serverless Function Locally

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project root
cd "D:\The-Home-Rugs"

# Create .env file in root
copy .env.example .env

# Edit .env and add credentials

# Run Vercel development server
vercel dev
```

**Access**:
- Website: `http://localhost:3000`
- API: `http://localhost:3000/api/send`

---

## Environment Variables Setup

Before running the backend, you need to set up your Gmail credentials:

### Step 1: Create .env File

In the project root (`D:\The-Home-Rugs`), create a file named `.env`:

```env
EMAIL_USER=thehomerugs1@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
EMAIL_RECIPIENT=jameemaqavi@gmail.com
PORT=3000
```

### Step 2: Generate Gmail App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select app: **Mail**
3. Select device: **Other** → Type "Local Development"
4. Click **Generate**
5. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)
6. Paste it as `EMAIL_PASSWORD` in your `.env` file
7. **Remove the spaces**: `abcdefghijklmnop`

---

## Full Development Workflow

### Scenario 1: Just Testing the Website (No Backend)

```bash
# Open Command Prompt
cd "D:\The-Home-Rugs\Website"
python -m http.server 8000

# Open browser: http://localhost:8000
# Contact form works via EmailJS (no backend needed)
```

**Use this if**: You just want to see the website and test the contact form.

---

### Scenario 2: Testing with Express Backend

```bash
# Terminal 1 - Start Backend
cd "D:\The-Home-Rugs\contact form"
npm install
npm start
# Runs on http://localhost:3000

# Terminal 2 - Start Frontend
cd "D:\The-Home-Rugs\Website"
python -m http.server 8001
# Runs on http://localhost:8001

# Update contact.html to use http://localhost:3000/send
```

**Use this if**: You want to test the Node.js Express server.

---

### Scenario 3: Testing with Vercel Dev (Simulates Production)

```bash
# Single Terminal
cd "D:\The-Home-Rugs"
vercel dev

# Everything runs on http://localhost:3000
# - Website at /
# - API at /api/send
```

**Use this if**: You want to test exactly how it will work on Vercel.

---

## Quick Reference Commands

### Check if Python is Installed
```bash
python --version
```

### Check if Node.js is Installed
```bash
node --version
npm --version
```

### Install Node.js
If you don't have Node.js, download from: https://nodejs.org

### Stop Running Servers
- Press `Ctrl + C` in the Command Prompt

### Check What's Running on a Port
```bash
# Windows
netstat -ano | findstr :8000

# Kill a process
taskkill /PID <process_id> /F
```

---

## Troubleshooting

### Issue: "python is not recognized"

**Solution**: Install Python or use full path:
```bash
C:\Python39\python.exe -m http.server 8000
```

Or install Python from: https://www.python.org/downloads/

---

### Issue: "npm is not recognized"

**Solution**: Install Node.js from: https://nodejs.org/en/download/

---

### Issue: Port Already in Use

**Solution**: Use a different port:
```bash
python -m http.server 8001  # Changed from 8000 to 8001
```

Or kill the process using the port:
```bash
netstat -ano | findstr :8000
taskkill /PID <process_id> /F
```

---

### Issue: Contact Form Not Working Locally

**Current Setup (EmailJS)**:
- Should work immediately when opening HTML files
- Requires internet connection
- No backend setup needed

**If Testing Backend API**:
- Ensure `.env` file exists with correct credentials
- Check server is running on correct port
- Update contact form to point to `http://localhost:3000/send`

---

### Issue: Images Not Loading

**Solution**:
- Use a local server (Python, http-server, or Live Server)
- Don't open HTML files directly from file explorer
- Check image paths are relative: `images/logo.jpg` (not absolute paths)

---

## Recommended Workflow

### For Quick Testing
```bash
cd "D:\The-Home-Rugs\Website"
python -m http.server 8000
# Open http://localhost:8000
```

### For Development with Auto-Reload
1. Install VS Code
2. Install "Live Server" extension
3. Right-click `index.html` → Open with Live Server

### Before Deploying to Vercel
```bash
cd "D:\The-Home-Rugs"
vercel dev
# Test everything at http://localhost:3000
```

---

## Summary

**Easiest Way** (No setup required):
- Double-click `Website/index.html`
- Contact form works via EmailJS

**Best Way** (Proper testing):
```bash
cd "D:\The-Home-Rugs\Website"
python -m http.server 8000
```
- Open `http://localhost:8000`

**Production-Like Testing**:
```bash
cd "D:\The-Home-Rugs"
vercel dev
```
- Open `http://localhost:3000`

---

**The contact form already works with EmailJS, so you don't need to run any backend server unless you want to test the Vercel API!**

---

*Happy Coding! 🚀*
