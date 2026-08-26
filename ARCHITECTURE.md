# LR TECHNO PARK - ENTERPRISE PLATFORM ARCHITECTURE & TECHNICAL SPECIFICATION

## 1. System Architecture Overview

```
+-------------------------------------------------------------------------+
|                              CLIENT LAYER                               |
|   Static Hosting (GitHub Pages / Vercel / Cloud Storage + CDN)          |
|   - React 19 + TypeScript + Vite + Tailwind CSS                         |
|   - Firebase Auth Client SDK (Google SSO + Email/Password)              |
|   - Zero Secret Keys in Client Bundle                                   |
+-------------------------------------------------------------------------+
                                    |
                                    | HTTPS / JSON (Bearer Token Auth)
                                    v
+-------------------------------------------------------------------------+
|                            BACKEND API LAYER                            |
|   Express 4 + Node.js (Google Cloud Run / Railway / VPS)                |
|   - Server-Authoritative Price & Product Validation                     |
|   - 5-Role RBAC Middleware (Customer, Sales, Support, Admin, Superadmin)|
|   - GST / SAC 998313 18% Tax Calculation Engine                         |
|   - Cryptographic License Token Signer (HMAC-SHA256 KMS Key)            |
|   - Asynchronous Webhook Dispatcher to Google Sheets                    |
+-------------------------------------------------------------------------+
                |                                           |
                v                                           v
+-------------------------------+          +------------------------------+
|   FIREBASE AUTH & FIRESTORE   |          |     GOOGLE SHEETS OP HUB     |
|   - JWT Token Issuance        |          |   Google Apps Script Webhook |
|   - Role Custom Claims        |          |   - Real-Time Order Stream   |
|   - Persistent Audit Logs     |          |   - Sales Team Workflow CRM  |
+-------------------------------+          +------------------------------+
```

---

## 2. Folder Structure

```
├── /
│   ├── .env.example                     # Environment variables template
│   ├── metadata.json                    # Platform capabilities metadata
│   ├── package.json                     # Production dependencies & build scripts
│   ├── server.ts                        # Production Express API gateway & endpoints
│   ├── vite.config.ts                   # Vite configuration
│   ├── src/
│   │   ├── App.tsx                      # Root application router & modals
│   │   ├── main.tsx                     # React 19 bootstrap
│   │   ├── index.css                    # Tailwind CSS v4 design system
│   │   ├── types/
│   │   │   └── index.ts                 # Domain models, RBAC roles, Order & GST types
│   │   ├── config/
│   │   │   └── env.ts                   # Environment detector & API URL resolver
│   │   ├── context/
│   │   │   ├── AuthContext.tsx          # Firebase Auth & 5-Role RBAC state manager
│   │   │   ├── OrderContext.tsx         # Secure Order API client & optimistic updates
│   │   │   └── NotificationContext.tsx  # Enterprise Toast notifications
│   │   ├── data/
│   │   │   ├── companyData.ts           # Capability blueprints & brand data
│   │   │   ├── productsData.ts          # Authoritative product catalog & pricing tiers
│   │   │   ├── servicesData.ts          # Professional service blueprints
│   │   │   └── caseStudiesData.ts       # Decoupled case study templates
│   │   ├── components/
│   │   │   ├── home/                    # Public landing page sections
│   │   │   ├── navigation/              # Header, Navbar & Footer
│   │   │   └── ui/                      # Modals (GST Invoice, Order Tracker, Sheets Inspector)
│   │   ├── pages/                       # Public & Customer Portal views
│   │   └── test/                        # Automated security & validation test suite
```

---

## 3. Environment Variables Specification

| Variable Name | Required By | Environment | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | Backend | Server | Bound port (default `3000`) |
| `NODE_ENV` | Backend & Client | Both | `development` or `production` |
| `VITE_API_BASE_URL` | Frontend | Client | Base URL of deployed Express API (e.g. `https://api.lrtechnopark.com`) |
| `LICENSE_SIGNING_SECRET` | Backend | Server | Private cryptographic secret for HMAC-SHA256 license tokens |
| `GOOGLE_APPS_SCRIPT_URL` | Backend | Server | Webhook URL of deployed Google Apps Script |
| `APPS_SCRIPT_SHARED_SECRET` | Backend | Server | Shared authorization bearer secret for Apps Script webhook |
| `FIREBASE_PROJECT_ID` | Both | Server/Client| Firebase project identifier |
| `FIREBASE_API_KEY` | Frontend | Client (Public)| Firebase web client API key |
| `FIREBASE_AUTH_DOMAIN` | Frontend | Client (Public)| Firebase auth domain |

---

## 4. Role-Based Access Control (RBAC) Matrix

The system enforces 5 distinct roles:

| Role | Target Persona | Permissions |
| :--- | :--- | :--- |
| `customer` | Verified Client | View own orders, place new orders, download invoices, submit tickets. |
| `sales` | Account Exec | View all customer orders & quotes, initiate custom orders on behalf of client. |
| `support` | Support Engineer | View orders, lookup license tokens, manage technical support tickets. |
| `admin` | Operations Lead | Update order status, trigger Google Sheets manual re-sync, manage products. |
| `superadmin`| CISO / Director | Full privileges, KMS signing key rotation, audit trail inspection. |

---

## 5. Google Apps Script Webhook Code Template

Deploy this code under **Extensions > Apps Script** in your Google Spreadsheet:

```javascript
const SHARED_SECRET = "LRTP_SECURE_APPS_SCRIPT_SECRET_2026";
const SHEET_NAME = "Orders";

function doPost(e) {
  try {
    const authHeader = e.headers ? (e.headers["authorization"] || e.headers["Authorization"]) : "";
    if (authHeader !== "Bearer " + SHARED_SECRET) {
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const payload = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Timestamp", "Order ID", "Company Name", "Customer Name", "Email",
        "Phone", "GSTIN", "Products", "Subtotal (USD)", "GST Tax (USD)",
        "Total (USD)", "PO Number", "Status", "License Token", "Deployment Tier"
      ]);
    }

    sheet.appendRow([
      new Date().toISOString(),
      payload.id,
      payload.companyName,
      payload.customerName,
      payload.customerEmail,
      payload.phone,
      payload.gstin || "N/A",
      payload.items.map(i => i.productName + " (" + i.quantity + ")").join("; "),
      payload.subtotal,
      payload.tax,
      payload.total,
      payload.purchaseOrderNumber || "STANDARD",
      payload.status,
      payload.licenseToken || "PENDING",
      payload.items[0]?.deploymentTier || "CLOUD_HOSTED"
    ]);

    return ContentService.createTextOutput(JSON.stringify({ success: true, orderId: payload.id }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## 6. Cryptographic License Token Standard

Licenses are signed server-side using HMAC-SHA256. The generated token takes the structure:
`base64Url(LicensePayload) . hmacSha256(base64Url(LicensePayload), LICENSE_SIGNING_SECRET)`

**Payload Schema:**
```json
{
  "orderId": "LRTP-2026-000101",
  "customerId": "cust-enterprise-01",
  "product": "prod-medivault-ehr",
  "tier": "ANNUAL",
  "seats": 25,
  "issuedAt": 1771380000000,
  "expiresAt": 1802916000000,
  "issuer": "LR_TECHNO_PARK_KMS"
}
```

---

## 7. Production Deployment Checklist

- [x] All fabricated customer names, SLAs, and quantitative claims removed or marked as Blueprint Templates.
- [x] Server-side price calculation enforced (client pricing inputs discarded).
- [x] Cryptographic license signing keys confined to server environment variables.
- [x] 5-Role RBAC enforced in API routes and UI views.
- [x] 18% GST (SAC Code 998313) computed with full CGST/SGST/IGST breakdown.
- [x] Print-ready Tax Invoice modal with live cryptographic token verification.
- [x] Google Sheets webhook integration with timeout circuit-breaker.
- [x] Production gating helper (`src/config/env.ts`) to isolate demo test users from production builds.
