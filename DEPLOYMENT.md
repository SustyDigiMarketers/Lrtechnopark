# LR Techno Park — Enterprise Production Deployment & Custom Domain Guide

This document outlines the step-by-step production architecture and deployment procedures for **LR Techno Park** under the custom domain **`lrtechnopark.com`** and **`www.lrtechnopark.com`**.

---

## 1. System Architecture Overview

* **Frontend**: React 19 SPA with Tailwind CSS v4, Manrope & JetBrains Mono typography, Framer Motion transitions.
* **Backend API**: Node.js Express server (`server.ts` compiled via esbuild to `dist/server.cjs`).
* **Data Integration**: Live two-way synchronization with Google Sheets Apps Script webhooks for orders, contact inquiries, and service bookings.
* **Authentication & Licensing**: Cryptographic token generation via HMAC-SHA256 KMS signing with FIPS-compliant verification.

---

## 2. Production Environment Configuration

Create a `.env` file on your production host or configure the corresponding secrets in your hosting dashboard:

```env
# Server & Runtime
NODE_ENV=production
PORT=3000

# Client Configuration
# When frontend & backend are served together from the same origin, leave empty ("").
# When frontend is on separate static hosting (e.g. GitHub Pages/Vercel), set to your API domain:
VITE_API_BASE_URL=https://api.lrtechnopark.com

# Backend Cryptographic Signing & Authentication Secrets
LICENSE_SIGNING_SECRET=your_secure_random_kms_key_here
AUTH_SECRET=your_secure_random_auth_secret_here

# Google Sheets Webhook Integration
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxYOUR_DEPLOYMENT_ID/exec
APPS_SCRIPT_SHARED_SECRET=your_apps_script_shared_secret_here

# Gemini AI Engine (Optional)
GEMINI_API_KEY=your_production_gemini_api_key
```

---

## 3. Custom Domain & DNS Setup (`lrtechnopark.com`)

To bind your custom domain to the production host, configure the following DNS records at your domain registrar (e.g., Cloudflare, Namecheap, GoDaddy):

### Apex Domain (`lrtechnopark.com`)
| Type | Host / Name | Target / Value | Proxy Status | TTL |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `199.36.158.100` (Direct Hosting Ingress) | Proxied (Cloudflare Orange Cloud) | Auto |
| **CNAME** | `www` | `lrtechnopark.com` | Proxied (Cloudflare Orange Cloud) | Auto |

### Cloudflare Page Rules / URL Redirects (Canonical Host)
* **Rule**: `http://*lrtechnopark.com/*` → Always Use HTTPS
* **Rule**: `https://www.lrtechnopark.com/*` → 301 Permanent Redirect to `https://lrtechnopark.com/$1`

### SSL / HTTPS Configuration
1. Enable automatic SSL renewal via Let's Encrypt / Cloudflare Universal SSL.
2. Enforce **Always Use HTTPS** and **HSTS (HTTP Strict Transport Security)** with a minimum 1-year max-age.
3. Ensure no mixed-content HTTP calls exist (all API calls use relative paths or `https://`).

---

## 4. Deployment Methods

### Option A: Unified Full-Stack (Cloud Run / VPS / Docker / Render) — Recommended

Build both the client SPA and bundled CommonJS server into a single production container:

```bash
# 1. Install dependencies
npm ci

# 2. Compile client SPA & backend bundle
npm run build

# 3. Start production server
npm start
```

#### Production Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.cjs"]
```

---

### Option B: Separated Frontend (GitHub Pages / Vercel) + Backend (Cloud Run / VPS)

1. **Backend Server**:
   * Deploy the Express server to `https://api.lrtechnopark.com`.
   * Configure CORS on the backend to allow requests from `https://lrtechnopark.com` and `https://www.lrtechnopark.com`.

2. **Frontend SPA**:
   * Set `VITE_API_BASE_URL=https://api.lrtechnopark.com` at build time.
   * Run `npm run build` to generate `dist/`.
   * Configure SPA 404 rewrite (`dist/index.html` fallback) for client-side routing.

---

## 5. Google Sheets Webhook Integration

The backend is pre-configured to dispatch records to Google Sheets Apps Script webhooks:

1. Open your Google Spreadsheet and navigate to **Extensions > Apps Script**.
2. Paste the provided sync handler code.
3. Click **Deploy > New deployment**, select **Web app**, set access to **Anyone**.
4. Copy the deployment URL and set it as `GOOGLE_APPS_SCRIPT_URL` in your environment.

---

## 6. Verification Checklist

- [x] Responsive layout verified across all viewport widths (320px to 2560px+).
- [x] Zero hardcoded `localhost` references in client source tree.
- [x] TypeScript validation and linting pass (`npm run lint`).
- [x] Production build passes cleanly (`npm run build`).
- [x] Server-side health check available at `/api/health`.
- [x] Cryptographic license signing verified via `/api/licenses/verify`.
- [x] CI/CD pipeline configured at `.github/workflows/ci-cd.yml`.
