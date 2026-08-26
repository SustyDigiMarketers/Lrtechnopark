# LR Techno Park Enterprise Portal

> **Enterprise IT Hardware, Networking Solutions, Next-Gen Firewalls, CCTV Surveillance, and Multi-Tier Enterprise Ordering Platform**

🌐 **Production Domain:** [https://lrtechnopark.com](https://lrtechnopark.com)  
🏢 **Organization:** Susty Digi Marketers / LR Techno Park  

---

## 🚀 Quick Deployment Guide

To deploy this repository to GitHub Pages with your custom domain (`lrtechnopark.com`):

### 1. Initialize & Push to GitHub
```bash
git init
git add .
git commit -m "feat: initial production-ready release for lrtechnopark.com"
git branch -M main
git remote add origin https://github.com/SustyDigiMarketers/Lrtechnopark.git
git push -u origin main --force
```

---

## ⚙️ GitHub Pages Configuration

### Option A: GitHub Actions (Recommended - Automated)
1. Go to your repository **Settings** $\rightarrow$ **Pages** (`https://github.com/SustyDigiMarketers/Lrtechnopark/settings/pages`).
2. Under **Build and deployment**, set **Source** to **`GitHub Actions`**.
3. Every push to `main` or `master` will automatically compile and deploy your production build with zero manual work.

### Option B: Deploy from `/docs` folder
1. Go to your repository **Settings** $\rightarrow$ **Pages**.
2. Under **Build and deployment**, set **Source** to **`Deploy from a branch`**.
3. Choose Branch: **`main`** (or `master`) and Folder: **`/docs`**.
4. Click **Save**.

---

## 🌐 Custom Domain & DNS Setup (`lrtechnopark.com`)

In **Cloudflare DNS** (or your domain registrar), ensure these records exist:

| Type | Name | Content / Target | Proxy Status |
| :--- | :--- | :--- | :--- |
| **A** | `@` (or `lrtechnopark.com`) | `185.199.108.153` | DNS Only (or Proxied) |
| **A** | `@` (or `lrtechnopark.com`) | `185.199.109.153` | DNS Only (or Proxied) |
| **A** | `@` (or `lrtechnopark.com`) | `185.199.110.153` | DNS Only (or Proxied) |
| **A** | `@` (or `lrtechnopark.com`) | `185.199.111.153` | DNS Only (or Proxied) |
| **CNAME** | `www` | `sustydigimarketers.github.io` | DNS Only (or Proxied) |

*Note: In Cloudflare SSL/TLS settings, set Encryption Mode to **Full (strict)**.*

---

## 💻 Local Development & Build Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript check
npm run lint

# Build production bundle (generates dist/ and docs/ with CNAME, 404, and .nojekyll)
npm run build
```

---

## 📦 Key Platform Features
- **Product Catalog:** High-density enterprise hardware, firewalls, switches, servers, CCTV, and WiFi systems.
- **Enterprise Ordering Wizard:** Multi-step procurement, license selection, deployment tier configuration, and GST invoice generation.
- **Customer Portal:** Order tracking, warranty verification, SLA support tickets, and direct quotation requests.
- **SPA Routing & Fallback:** Instant seamless routing with custom 404 handler and clean URLs.
