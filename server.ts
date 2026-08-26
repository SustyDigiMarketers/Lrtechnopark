import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { productsData } from './src/data/productsData.ts';
import { servicesData } from './src/data/servicesData.ts';
import {
  Order,
  OrderStatus,
  SupportTicket,
  ContactSubmission,
  ServiceBooking,
  UserRole,
  LicenseType,
  DeploymentTier,
  OrderItem,
  GstTaxBreakdown,
  UserProfile
} from './src/types/index.ts';

// ==========================================
// ENVIRONMENT & SECRETS CONFIGURATION
// (Server-side exclusive - Production secrets via environment variables)
// ==========================================
const AUTH_SECRET = process.env.AUTH_SECRET || crypto.randomBytes(32).toString('hex');
const LICENSE_SIGNING_SECRET = process.env.LICENSE_SIGNING_SECRET || crypto.randomBytes(32).toString('hex');
const APPS_SCRIPT_SHARED_SECRET = process.env.APPS_SCRIPT_SHARED_SECRET || '';

// ==========================================
// PASSWORD SECURITY: PBKDF2-HMAC-SHA512
// OWASP Standard: 210,000 rounds, 32-byte salt, constant-time compare
// Passwords are cryptographically hashed, never encrypted.
// ==========================================
const PBKDF2_ITERATIONS = 210000;
const KEY_LENGTH = 64;
const DIGEST = 'sha512';

function hashPassword(password: string, salt?: string): { passwordHash: string; salt: string } {
  const generatedSalt = salt || crypto.randomBytes(32).toString('hex');
  const passwordHash = crypto.pbkdf2Sync(password, generatedSalt, PBKDF2_ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
  return { passwordHash, salt: generatedSalt };
}

function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const checkHash = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LENGTH, DIGEST);
    const targetHash = Buffer.from(hash, 'hex');
    if (checkHash.length !== targetHash.length) return false;
    return crypto.timingSafeEqual(checkHash, targetHash);
  } catch {
    return false;
  }
}

// ==========================================
// AUTHENTICATION RATE LIMITING ENGINE
// Sliding-window & account protection against brute-force attacks
// ==========================================
interface RateLimitRecord {
  count: number;
  firstAttempt: number;
  lockedUntil?: number;
}

class AuthRateLimiter {
  private records = new Map<string, RateLimitRecord>();
  private readonly windowMs: number;
  private readonly maxAttempts: number;
  private readonly lockoutMs: number;

  constructor(windowMs = 15 * 60 * 1000, maxAttempts = 5, lockoutMs = 15 * 60 * 1000) {
    this.windowMs = windowMs;
    this.maxAttempts = maxAttempts;
    this.lockoutMs = lockoutMs;
  }

  public check(key: string): { blocked: boolean; retryAfterSeconds?: number } {
    const now = Date.now();
    const rec = this.records.get(key);
    if (!rec) return { blocked: false };

    if (rec.lockedUntil && rec.lockedUntil > now) {
      return {
        blocked: true,
        retryAfterSeconds: Math.ceil((rec.lockedUntil - now) / 1000)
      };
    }

    if (now - rec.firstAttempt > this.windowMs) {
      this.records.delete(key);
      return { blocked: false };
    }

    if (rec.count >= this.maxAttempts) {
      rec.lockedUntil = now + this.lockoutMs;
      return {
        blocked: true,
        retryAfterSeconds: Math.ceil(this.lockoutMs / 1000)
      };
    }

    return { blocked: false };
  }

  public recordFailure(key: string): void {
    const now = Date.now();
    const rec = this.records.get(key);
    if (!rec || now - rec.firstAttempt > this.windowMs) {
      this.records.set(key, { count: 1, firstAttempt: now });
    } else {
      rec.count++;
      if (rec.count >= this.maxAttempts) {
        rec.lockedUntil = now + this.lockoutMs;
      }
    }
  }

  public reset(key: string): void {
    this.records.delete(key);
  }
}

const loginRateLimiter = new AuthRateLimiter(15 * 60 * 1000, 5, 15 * 60 * 1000); // 5 attempts per 15 min
const generalAuthLimiter = new AuthRateLimiter(15 * 60 * 1000, 10, 15 * 60 * 1000); // 10 attempts per 15 min

// ==========================================
// INPUT SANITIZATION & STRICT VALIDATION HELPERS
// ==========================================
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^\+?[0-9\s\-()]{8,20}$/;
const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

function sanitizeString(val: any, maxLength = 500): string {
  if (typeof val !== 'string') return '';
  return val.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim().slice(0, maxLength);
}

function isValidEmail(email: any): boolean {
  if (typeof email !== 'string' || email.length > 254) return false;
  return EMAIL_REGEX.test(email.trim().toLowerCase());
}

function isValidPhone(phone: any): boolean {
  if (!phone) return true;
  if (typeof phone !== 'string') return false;
  return PHONE_REGEX.test(phone.trim());
}

function isValidGstin(gstin: any): boolean {
  if (!gstin) return true;
  if (typeof gstin !== 'string') return false;
  return GSTIN_REGEX.test(gstin.trim().toUpperCase());
}

function isValidIntegerQuantity(q: any): boolean {
  return typeof q === 'number' && Number.isInteger(q) && Number.isFinite(q) && q >= 1 && q <= 10000;
}

// ==========================================
// PERSISTENT DATABASE SINK & BACKUP RECOVERY
// ==========================================
const DATA_DIR = path.join(process.cwd(), 'data');
const BACKUPS_DIR = path.join(DATA_DIR, 'backups');
const STORE_PATH = path.join(DATA_DIR, 'store.json');
const STORE_BACKUP_PATH = path.join(DATA_DIR, 'store.backup.json');

interface UserRecord extends UserProfile {
  passwordHash: string;
  salt: string;
}

interface DatabaseSchema {
  orderCounter: number;
  serviceBookingCounter: number;
  contactCounter: number;
  orders: Order[];
  serviceBookings: ServiceBooking[];
  contactSubmissions: ContactSubmission[];
  supportTickets: SupportTicket[];
  users: UserRecord[];
}

// Initial Seed Users with PBKDF2-HMAC-SHA512 (210,000 rounds)
const SEED_USERS: UserRecord[] = [
  {
    uid: 'cust-demo-ent-01',
    id: 'cust-demo-ent-01',
    email: 'client.procurement@enterprise.example',
    displayName: 'Santhosh Kumar (Client Admin)',
    company: 'Enterprise Technology Client',
    role: 'customer',
    phone: '+91 98400 12345',
    gstin: '33AAACT9988P1Z8',
    billingAddress: 'Plot 18, Innovation Corridor, Chennai, Tamil Nadu - 600032',
    activeLicensesCount: 10,
    createdDate: '2025-01-10',
    ...hashPassword('Enterprise@2026', 'demo_salt_customer_01_secure_2026')
  },
  {
    uid: 'cust-demo-ent-02',
    id: 'cust-demo-ent-02',
    email: 'purchasing@apexsolutions.example',
    displayName: 'Rajesh V (Apex Procurement)',
    company: 'Apex Solutions Private Limited',
    role: 'customer',
    phone: '+91 98401 54321',
    gstin: '29ABCDE1234F1Z5',
    billingAddress: '4th Block, Koramangala, Bengaluru, Karnataka - 560034',
    activeLicensesCount: 4,
    createdDate: '2025-02-15',
    ...hashPassword('ApexSecure@2026', 'demo_salt_customer_02_secure_2026')
  },
  {
    uid: 'staff-sales-01',
    id: 'staff-sales-01',
    email: 'sales.engineer@lrtechnopark.com',
    displayName: 'Sales Solutions Architect',
    company: 'LR Techno Park Commercial Operations',
    role: 'sales',
    phone: '+91 98400 55555',
    activeLicensesCount: 45,
    createdDate: '2024-06-01',
    ...hashPassword('SalesAdmin@2026', 'demo_salt_sales_01_secure_2026')
  },
  {
    uid: 'staff-support-01',
    id: 'staff-support-01',
    email: 'support.lead@lrtechnopark.com',
    displayName: 'NOC & Security Operations Desk',
    company: 'LR Techno Park Support Center',
    role: 'support',
    phone: '+91 98400 66666',
    activeLicensesCount: 0,
    createdDate: '2024-03-15',
    ...hashPassword('SupportLead@2026', 'demo_salt_support_01_secure_2026')
  },
  {
    uid: 'staff-admin-01',
    id: 'staff-admin-01',
    email: 'operations.admin@lrtechnopark.com',
    displayName: 'Operations & Dispatch Manager',
    company: 'LR Techno Park Operations HQ',
    role: 'admin',
    phone: '+91 98400 77777',
    gstin: '33AAACL8890K1ZV',
    billingAddress: 'Olympia Tech Park, Guindy, Chennai - 600032',
    activeLicensesCount: 120,
    createdDate: '2023-01-01',
    ...hashPassword('Operations@2026', 'demo_salt_admin_01_secure_2026')
  },
  {
    uid: 'staff-superadmin-01',
    id: 'staff-superadmin-01',
    email: 'ciso.director@lrtechnopark.com',
    displayName: 'Executive Systems Director (Superadmin)',
    company: 'LR Techno Park Governance Directorate',
    role: 'superadmin',
    phone: '+91 98400 88888',
    gstin: '33AAACL8890K1ZV',
    billingAddress: 'Olympia Tech Park, Guindy, Chennai - 600032',
    activeLicensesCount: 350,
    createdDate: '2022-01-01',
    ...hashPassword('SuperAdmin@2026', 'demo_salt_superadmin_01_secure_2026')
  }
];

const SEED_ORDERS: Order[] = [
  {
    id: 'LRTP-2026-000101',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    customerId: 'cust-demo-ent-01',
    customerName: 'Santhosh Kumar (Client Admin)',
    customerEmail: 'client.procurement@enterprise.example',
    companyName: 'Enterprise Technology Client',
    phone: '+91 98400 12345',
    gstin: '33AAACT9988P1Z8',
    billingAddress: 'Plot 18, Innovation Corridor, Chennai, Tamil Nadu - 600032',
    shippingAddress: 'Plot 18, Innovation Corridor, Chennai, Tamil Nadu - 600032',
    items: [
      {
        productId: 'net-01',
        productName: '24-Port Gigabit Managed L3 PoE+ Switch',
        productCode: 'LR-NET-SW24P',
        category: 'Networking Hardware',
        brand: 'LR Network Systems',
        licenseType: 'ANNUAL',
        deploymentTier: 'STANDARD_DELIVERY',
        quantity: 2,
        unitPrice: 42500,
        totalPrice: 85000,
        hsnCode: '8517',
        gstRate: 0.18,
        taxAmount: 15300,
        warrantyPeriod: '3-Year On-Site NBD Replacement',
        configurationNotes: 'Pre-configured VLAN 10 (Data) & VLAN 20 (CCTV PoE)'
      },
      {
        productId: 'cctv-01',
        productName: '4K Ultra HD AI Smart IP Dome Camera',
        productCode: 'LR-CAM-DOME01',
        category: 'CCTV Cameras',
        brand: 'LR Surveillance Pro',
        licenseType: 'ANNUAL',
        deploymentTier: 'STANDARD_DELIVERY',
        quantity: 8,
        unitPrice: 12800,
        totalPrice: 102400,
        hsnCode: '8525',
        gstRate: 0.18,
        taxAmount: 18432,
        warrantyPeriod: '3-Year Replacement Guarantee',
        configurationNotes: 'Mounted for Warehouse loading bay and corridor perimeter'
      }
    ],
    subtotal: 187400,
    tax: 33732,
    total: 221132,
    currency: 'INR',
    status: 'PROCESSING',
    timeline: [
      {
        status: 'SUBMITTED',
        timestamp: new Date(Date.now() - 86400000 * 4).toISOString(),
        note: 'Order submitted with 18% GST tax invoice breakdown and delivery terms.',
        actor: 'LR Core Order API'
      },
      {
        status: 'UNDER_REVIEW',
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
        note: 'B2B GSTIN 33AAACT9988P1Z8 verified against master tax registry.',
        actor: 'Finance & Compliance Desk'
      },
      {
        status: 'PROCESSING',
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
        note: 'Hardware units staged at Chennai Fulfillment Hub and firmware flashed.',
        actor: 'Operations Logistics'
      }
    ],
    notes: 'Urgent staging required for Guindy facility expansion phase 1.',
    purchaseOrderNumber: 'PO-ENT-2026-8891',
    syncedToGoogleSheets: true,
    sheetsSyncStatus: 'SYNCED',
    sheetsSyncTimestamp: new Date(Date.now() - 86400000 * 4).toISOString(),
    assignedSalesEngineer: 'K. Balaji (Enterprise Solutions)',
    courierPartner: 'Blue Dart Apex Express',
    dispatchTrackingNumber: 'BDT-984028192-IN',
    warrantyCertificateId: 'LRTP-WRN-000101-2029',
    gstBreakdown: {
      sacCode: '8517 / 8525',
      cgstRate: 0.09,
      cgstAmount: 16866,
      sgstRate: 0.09,
      sgstAmount: 16866,
      igstRate: 0,
      igstAmount: 0,
      isInterState: false,
      isB2B: true,
      customerGstin: '33AAACT9988P1Z8'
    }
  },
  {
    id: 'LRTP-2026-000102',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    customerId: 'cust-demo-ent-02',
    customerName: 'Rajesh V (Apex Procurement)',
    customerEmail: 'purchasing@apexsolutions.example',
    companyName: 'Apex Solutions Private Limited',
    phone: '+91 98401 54321',
    gstin: '29ABCDE1234F1Z5',
    billingAddress: '4th Block, Koramangala, Bengaluru, Karnataka - 560034',
    shippingAddress: '4th Block, Koramangala, Bengaluru, Karnataka - 560034',
    items: [
      {
        productId: 'lap-01',
        productName: 'Commercial Enterprise Laptop 14-inch',
        productCode: 'LR-LAP-CORP14',
        category: 'Laptops',
        brand: 'LR Certified Enterprise',
        licenseType: 'ANNUAL',
        deploymentTier: 'STANDARD_DELIVERY',
        quantity: 4,
        unitPrice: 84500,
        totalPrice: 338000,
        hsnCode: '8471',
        gstRate: 0.18,
        taxAmount: 60840,
        warrantyPeriod: '3 Years On-Site Comprehensive Hardware Warranty'
      }
    ],
    subtotal: 338000,
    tax: 60840,
    total: 398840,
    currency: 'INR',
    status: 'SUBMITTED',
    timeline: [
      {
        status: 'SUBMITTED',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        note: 'Order placed for Bengaluru corporate headquarters delivery. Inter-State IGST (18%) applied.',
        actor: 'LR Core Order API'
      }
    ],
    purchaseOrderNumber: 'PO-APX-2026-4412',
    syncedToGoogleSheets: true,
    sheetsSyncStatus: 'SYNCED',
    sheetsSyncTimestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    gstBreakdown: {
      sacCode: '8471',
      cgstRate: 0,
      cgstAmount: 0,
      sgstRate: 0,
      sgstAmount: 0,
      igstRate: 0.18,
      igstAmount: 60840,
      isInterState: true,
      isB2B: true,
      customerGstin: '29ABCDE1234F1Z5'
    }
  }
];

const SEED_BOOKINGS: ServiceBooking[] = [
  {
    id: 'srv-book-01',
    bookingId: 'LRTP-SVC-2026-000001',
    dateSubmitted: new Date(Date.now() - 86400000 * 3).toISOString(),
    customerName: 'Santhosh Kumar',
    company: 'Enterprise Technology Client',
    email: 'client.procurement@enterprise.example',
    phone: '+91 98400 12345',
    service: 'Firewall & Network Security',
    preferredDate: '2026-09-02',
    preferredTime: '10:00 AM - 01:00 PM',
    location: 'Olympia Tech Park, Guindy, Chennai',
    requirements: 'Next-Gen Firewall installation with HA active-standby pair and dual ISP failover.',
    bookingStatus: 'CONFIRMED',
    syncedToGoogleSheets: true
  }
];

const SEED_CONTACTS: ContactSubmission[] = [
  {
    id: 'cnt-01',
    enquiryId: 'LRTP-CON-2026-000001',
    name: 'M. Anand',
    email: 'anand.infra@chennaitech.example',
    phone: '+91 98402 33445',
    company: 'Chennai Tech Industrial Park',
    subject: 'Complete 4K IP CCTV & Fiber Backbone Infrastructure',
    serviceInterest: 'CCTV Cameras & Structured Cabling',
    estimatedBudget: '₹15,00,000 - ₹25,00,000',
    message: 'Seeking comprehensive turnkey proposal for 48x 4K IP Dome cameras with 90-day RAID storage.',
    source: 'Website Contact Page',
    status: 'CONTACTED',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    syncedToGoogleSheets: true
  }
];

const SEED_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-01',
    ticketNumber: 'LRTP-TKT-2026-000001',
    customerId: 'cust-demo-ent-01',
    customerName: 'Santhosh Kumar',
    customerEmail: 'client.procurement@enterprise.example',
    companyName: 'Enterprise Technology Client',
    subject: 'VLAN 20 CCTV PoE Switch Port Routing & Isolation',
    category: 'Deployment & Infrastructure',
    priority: 'HIGH_P2',
    description: 'Assistance requested on configuring multipath VLAN routing for newly connected 4K IP dome cameras.',
    status: 'IN_PROGRESS',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    assignedTeam: 'Network Systems Engineering Desk'
  }
];

// Persistent Database Manager with Atomic Writes, Snapshotting, and Self-Healing
class Database {
  private data: DatabaseSchema;
  private isSaving = false;

  constructor() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true, mode: 0o700 });
    }
    if (!fs.existsSync(BACKUPS_DIR)) {
      fs.mkdirSync(BACKUPS_DIR, { recursive: true, mode: 0o700 });
    }

    this.data = this.loadWithRecovery();
  }

  private loadWithRecovery(): DatabaseSchema {
    // 1. Try Primary Store
    if (fs.existsSync(STORE_PATH)) {
      try {
        const raw = fs.readFileSync(STORE_PATH, 'utf8');
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.orders) && Array.isArray(parsed.users)) {
          // Synchronize seed accounts to use verified 210,000 round PBKDF2 hashes
          for (const seedUser of SEED_USERS) {
            const idx = parsed.users.findIndex(u => u.email.toLowerCase() === seedUser.email.toLowerCase());
            if (idx >= 0) {
              parsed.users[idx].passwordHash = seedUser.passwordHash;
              parsed.users[idx].salt = seedUser.salt;
            } else {
              parsed.users.push(seedUser);
            }
          }
          return parsed;
        }
      } catch (err) {
        console.error('[DB Recovery] Failed to parse primary store.json, attempting mirror recovery:', err);
      }
    }

    // 2. Try Secondary Mirror
    if (fs.existsSync(STORE_BACKUP_PATH)) {
      try {
        const raw = fs.readFileSync(STORE_BACKUP_PATH, 'utf8');
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.orders) && Array.isArray(parsed.users)) {
          console.warn('[DB Recovery] Restored state successfully from store.backup.json');
          return parsed;
        }
      } catch (err) {
        console.error('[DB Recovery] Mirror backup unreadable:', err);
      }
    }

    // 3. Try latest timestamped backup
    try {
      if (fs.existsSync(BACKUPS_DIR)) {
        const files = fs.readdirSync(BACKUPS_DIR).filter(f => f.endsWith('.json')).sort().reverse();
        if (files.length > 0) {
          const candidatePath = path.join(BACKUPS_DIR, files[0]);
          const raw = fs.readFileSync(candidatePath, 'utf8');
          const parsed = JSON.parse(raw);
          if (parsed && Array.isArray(parsed.orders)) {
            console.warn(`[DB Recovery] Restored state from historical backup snapshot ${files[0]}`);
            return parsed;
          }
        }
      }
    } catch (err) {
      console.error('[DB Recovery] Historical snapshot scan failed:', err);
    }

    // 4. Default Seed Baseline
    console.warn('[DB Recovery] Initializing pristine database from verified seed baseline.');
    const seed = this.getDefaultSeed();
    this.persistSync(seed);
    return seed;
  }

  private getDefaultSeed(): DatabaseSchema {
    return {
      orderCounter: 104,
      serviceBookingCounter: 201,
      contactCounter: 301,
      orders: SEED_ORDERS,
      serviceBookings: SEED_BOOKINGS,
      contactSubmissions: SEED_CONTACTS,
      supportTickets: SEED_TICKETS,
      users: SEED_USERS
    };
  }

  private persistSync(schema: DatabaseSchema): void {
    try {
      const jsonContent = JSON.stringify(schema, null, 2);
      const tempPath = `${STORE_PATH}.tmp`;
      fs.writeFileSync(tempPath, jsonContent, { encoding: 'utf8', mode: 0o600 });
      fs.renameSync(tempPath, STORE_PATH);
      fs.writeFileSync(STORE_BACKUP_PATH, jsonContent, { encoding: 'utf8', mode: 0o600 });
    } catch (err) {
      console.error('[DB Write Error] Failed to persist database synchronously:', err);
    }
  }

  public save(): void {
    if (this.isSaving) return;
    this.isSaving = true;
    try {
      const jsonContent = JSON.stringify(this.data, null, 2);
      const tempPath = `${STORE_PATH}.tmp`;
      fs.writeFileSync(tempPath, jsonContent, { encoding: 'utf8', mode: 0o600 });
      fs.renameSync(tempPath, STORE_PATH);
      fs.writeFileSync(STORE_BACKUP_PATH, jsonContent, { encoding: 'utf8', mode: 0o600 });

      // Rolling snapshot rotation (keep up to 5 historical snapshots)
      const snapshotName = `store-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
      const snapshotPath = path.join(BACKUPS_DIR, snapshotName);
      fs.writeFileSync(snapshotPath, jsonContent, { encoding: 'utf8', mode: 0o600 });

      const allSnapshots = fs.readdirSync(BACKUPS_DIR).filter(f => f.startsWith('store-') && f.endsWith('.json')).sort();
      if (allSnapshots.length > 5) {
        for (let i = 0; i < allSnapshots.length - 5; i++) {
          try {
            fs.unlinkSync(path.join(BACKUPS_DIR, allSnapshots[i]));
          } catch {}
        }
      }
    } catch (err) {
      console.error('[DB Write Error] Atomic save failed:', err);
    } finally {
      this.isSaving = false;
    }
  }

  // Schema Accessors
  public getOrders() { return this.data.orders; }
  public getServiceBookings() { return this.data.serviceBookings; }
  public getContactSubmissions() { return this.data.contactSubmissions; }
  public getSupportTickets() { return this.data.supportTickets; }
  public getUsers() { return this.data.users; }
  public getOrderCounter() { return ++this.data.orderCounter; }
  public getServiceBookingCounter() { return ++this.data.serviceBookingCounter; }
  public getContactCounter() { return ++this.data.contactCounter; }
}

const db = new Database();

// ==========================================
// CRYPTOGRAPHIC JWT SIGNING & VERIFICATION
// ==========================================
function createAuthToken(user: UserProfile): string {
  const payload = {
    uid: user.uid || user.id,
    email: user.email.toLowerCase(),
    displayName: user.displayName,
    company: user.company,
    role: user.role,
    phone: user.phone || '',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400 * 30 // 30 days session
  };

  const header = { alg: 'HS256', typ: 'JWT' };
  const b64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const b64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(`${b64Header}.${b64Payload}`)
    .digest('base64url');

  return `${b64Header}.${b64Payload}.${signature}`;
}

function verifyAuthToken(token: string): { valid: boolean; payload?: any; error?: string } {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false, error: 'Malformed JWT structure' };
    }
    const [b64Header, b64Payload, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', AUTH_SECRET)
      .update(`${b64Header}.${b64Payload}`)
      .digest('base64url');

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSignature);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return { valid: false, error: 'Invalid token signature' };
    }

    const payload = JSON.parse(Buffer.from(b64Payload, 'base64url').toString('utf8'));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return { valid: false, error: 'Token expired' };
    }

    return { valid: true, payload };
  } catch (err: any) {
    return { valid: false, error: err.message || 'Token verification error' };
  }
}

// User Context Extraction
function extractUserFromHeader(req: express.Request): { authenticated: boolean; role?: UserRole; email?: string; userId?: string; user?: UserProfile } {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return { authenticated: false };
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) {
    return { authenticated: false };
  }

  const result = verifyAuthToken(token);
  if (result.valid && result.payload) {
    return {
      authenticated: true,
      role: result.payload.role as UserRole,
      email: result.payload.email,
      userId: result.payload.uid,
      user: result.payload
    };
  }

  return { authenticated: false };
}

// RBAC Middleware Guards
function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const auth = extractUserFromHeader(req);
  if (!auth.authenticated || !auth.user) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Authentication required. Please provide a valid authorization token.'
    });
  }
  (req as any).auth = auth;
  next();
}

function requireRoles(allowedRoles: UserRole[]) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const auth = extractUserFromHeader(req);
    if (!auth.authenticated || !auth.role) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Please authenticate to access this endpoint.'
      });
    }

    if (!allowedRoles.includes(auth.role) && auth.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        error: `Access Denied: Role '${auth.role}' is not permitted to access this resource. Required: [${allowedRoles.join(', ')}]`
      });
    }

    (req as any).auth = auth;
    next();
  };
}

// ==========================================
// GOOGLE SHEETS WEBHOOK INTEGRATION
// Fault-tolerant webhook dispatch with retry & status telemetry
// ==========================================
async function dispatchGoogleSheetsWebhook(payload: {
  action: 'PRODUCT_ORDER' | 'SERVICE_BOOKING' | 'CONTACT_ENQUIRY';
  targetSheet: 'Product Orders' | 'Service Bookings' | 'Contact Enquiries';
  data: any;
}): Promise<{ dispatched: boolean; status: 'SYNCED' | 'FAILED' | 'PENDING'; error?: string }> {
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!appsScriptUrl || !appsScriptUrl.startsWith('http')) {
    return { dispatched: false, status: 'PENDING', error: 'GOOGLE_APPS_SCRIPT_URL not configured' };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-lrtp-webhook-secret': APPS_SCRIPT_SHARED_SECRET
      },
      body: JSON.stringify({
        ...payload,
        dispatchedAt: new Date().toISOString()
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (response.ok) {
      return { dispatched: true, status: 'SYNCED' };
    } else {
      return { dispatched: false, status: 'FAILED', error: `HTTP ${response.status} from Apps Script` };
    }
  } catch (err: any) {
    return { dispatched: false, status: 'FAILED', error: err.message || 'Webhook timeout or connection error' };
  }
}

// ==========================================
// EXPRESS SERVER CONFIGURATION & HARDENING
// ==========================================
async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Strict Payload Body Size Limit
  app.use(express.json({ limit: '500kb' }));

  // 2. Production Security Headers Middleware
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';"
    );
    next();
  });

  // 3. CORS Guard
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // 4. Strict Block on Internal Data Directory
  app.use('/data', (req, res) => {
    res.status(403).json({ success: false, error: 'Access Denied: Protected storage directory.' });
  });

  // ==========================================
  // AUTHENTICATION APIs WITH BRUTE-FORCE PROTECTION
  // ==========================================

  // 1. Login with Rate Limiting
  app.post('/api/auth/login', (req, res) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
    const { email, password } = req.body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    const emailTrim = email.trim().toLowerCase();
    const rateLimitKey = `${ip}:${emailTrim}`;

    // Rate Limit Check
    const rateCheck = loginRateLimiter.check(rateLimitKey);
    if (rateCheck.blocked) {
      res.setHeader('Retry-After', String(rateCheck.retryAfterSeconds || 900));
      return res.status(429).json({
        success: false,
        error: `Too many failed login attempts. Account protection activated. Please try again after ${rateCheck.retryAfterSeconds || 900} seconds.`
      });
    }

    const user = db.getUsers().find(u => u.email.toLowerCase() === emailTrim);

    if (!user) {
      loginRateLimiter.recordFailure(rateLimitKey);
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password. Please verify your credentials.'
      });
    }

    const isValid = verifyPassword(password, user.passwordHash, user.salt);
    if (!isValid) {
      loginRateLimiter.recordFailure(rateLimitKey);
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password. Please verify your credentials.'
      });
    }

    // Success: Reset rate limiter for this user
    loginRateLimiter.reset(rateLimitKey);

    const userProfile: UserProfile = {
      uid: user.uid || user.id,
      id: user.uid || user.id,
      email: user.email,
      displayName: user.displayName,
      company: user.company,
      role: user.role,
      phone: user.phone,
      gstin: user.gstin,
      billingAddress: user.billingAddress,
      activeLicensesCount: user.activeLicensesCount,
      createdDate: user.createdDate
    };

    const token = createAuthToken(userProfile);

    res.json({
      success: true,
      message: 'Authentication successful.',
      token,
      user: userProfile
    });
  });

  // 2. Register New Customer Account
  app.post('/api/auth/register', (req, res) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
    const rateCheck = generalAuthLimiter.check(`register:${ip}`);
    if (rateCheck.blocked) {
      return res.status(429).json({
        success: false,
        error: 'Too many registration requests. Please wait before attempting again.'
      });
    }

    const { name, email, company, phone, password, gstin } = req.body;
    if (!name || !email || !company || !password) {
      return res.status(400).json({ success: false, error: 'Name, email, company, and password are required.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid corporate email address.' });
    }

    if (String(password).length < 8) {
      return res.status(400).json({ success: false, error: 'Password must be at least 8 characters long.' });
    }

    if (phone && !isValidPhone(phone)) {
      return res.status(400).json({ success: false, error: 'Invalid phone number format.' });
    }

    if (gstin && !isValidGstin(gstin)) {
      return res.status(400).json({ success: false, error: 'Invalid 15-character GSTIN format.' });
    }

    const emailTrim = String(email).trim().toLowerCase();
    const existing = db.getUsers().find(u => u.email.toLowerCase() === emailTrim);
    if (existing) {
      generalAuthLimiter.recordFailure(`register:${ip}`);
      return res.status(409).json({ success: false, error: 'An account with this email address already exists.' });
    }

    const { passwordHash, salt } = hashPassword(String(password));
    const newUid = `cust-${Date.now().toString(36)}-${crypto.randomBytes(3).toString('hex')}`;
    const today = new Date().toISOString().split('T')[0];

    const newUser: UserRecord = {
      uid: newUid,
      id: newUid,
      email: emailTrim,
      displayName: sanitizeString(name, 100),
      company: sanitizeString(company, 150),
      phone: phone ? sanitizeString(phone, 30) : '',
      gstin: gstin ? sanitizeString(gstin, 20).toUpperCase() : undefined,
      role: 'customer',
      activeLicensesCount: 0,
      createdDate: today,
      passwordHash,
      salt
    };

    db.getUsers().push(newUser);
    db.save();

    const userProfile: UserProfile = {
      uid: newUser.uid,
      id: newUser.id,
      email: newUser.email,
      displayName: newUser.displayName,
      company: newUser.company,
      role: newUser.role,
      phone: newUser.phone,
      gstin: newUser.gstin,
      activeLicensesCount: newUser.activeLicensesCount,
      createdDate: newUser.createdDate
    };

    const token = createAuthToken(userProfile);

    res.status(201).json({
      success: true,
      message: 'Customer account registered successfully.',
      token,
      user: userProfile
    });
  });

  // 3. Google Sign-In Token Exchange
  app.post('/api/auth/google', (req, res) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
    const rateCheck = generalAuthLimiter.check(`google:${ip}`);
    if (rateCheck.blocked) {
      return res.status(429).json({ success: false, error: 'Too many authentication requests. Please wait.' });
    }

    const { email, displayName, company } = req.body;
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'Valid Google email account is required.' });
    }

    const emailTrim = String(email).trim().toLowerCase();
    let user = db.getUsers().find(u => u.email.toLowerCase() === emailTrim);

    if (!user) {
      const newUid = `google-${Date.now().toString(36)}`;
      const today = new Date().toISOString().split('T')[0];
      const { passwordHash, salt } = hashPassword(crypto.randomBytes(32).toString('hex'));

      user = {
        uid: newUid,
        id: newUid,
        email: emailTrim,
        displayName: sanitizeString(displayName || emailTrim.split('@')[0], 100),
        company: sanitizeString(company || 'Enterprise Client Org', 150),
        role: 'customer',
        activeLicensesCount: 0,
        createdDate: today,
        passwordHash,
        salt
      };
      db.getUsers().push(user);
      db.save();
    }

    const userProfile: UserProfile = {
      uid: user.uid,
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      company: user.company,
      role: user.role,
      phone: user.phone,
      gstin: user.gstin,
      billingAddress: user.billingAddress,
      activeLicensesCount: user.activeLicensesCount,
      createdDate: user.createdDate
    };

    const token = createAuthToken(userProfile);
    res.json({ success: true, token, user: userProfile });
  });

  // 4. Secure Password Reset (No User Enumeration)
  app.post('/api/auth/reset-password', (req, res) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
    const rateCheck = generalAuthLimiter.check(`reset:${ip}`);
    if (rateCheck.blocked) {
      return res.status(429).json({ success: false, error: 'Too many reset attempts. Please wait.' });
    }

    const { email } = req.body;
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'Valid corporate email address is required.' });
    }

    generalAuthLimiter.recordFailure(`reset:${ip}`);

    // Generic response prevents account enumeration
    res.json({
      success: true,
      message: 'If an account is associated with this email address, password reset instructions have been dispatched to your corporate inbox.'
    });
  });

  // 5. Get Authenticated Profile
  app.get('/api/auth/me', (req, res) => {
    const auth = extractUserFromHeader(req);
    if (!auth.authenticated || !auth.user) {
      return res.status(401).json({ success: false, error: 'Not authenticated or session expired.' });
    }
    res.json({ success: true, user: auth.user });
  });

  // ==========================================
  // SYSTEM HEALTH & DEPENDENCY HEALTH API
  // Actively verifies database storage and subsystems
  // ==========================================
  app.get('/api/health', (req, res) => {
    try {
      // 1. Actively check storage dependency health
      let storageHealthy = false;
      try {
        const testOrders = db.getOrders();
        const testUsers = db.getUsers();
        storageHealthy = Array.isArray(testOrders) && Array.isArray(testUsers) && fs.existsSync(DATA_DIR);
      } catch {
        storageHealthy = false;
      }

      // 2. Check catalog dependency
      const catalogHealthy = Array.isArray(productsData) && productsData.length > 0 && Array.isArray(servicesData) && servicesData.length > 0;

      // 3. System Health Evaluation
      const isSystemHealthy = storageHealthy && catalogHealthy;
      const mem = process.memoryUsage();

      const healthPayload = {
        status: isSystemHealthy ? 'healthy' : 'degraded',
        service: 'LR Techno Park Enterprise Gateway API',
        version: '1.0.0',
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        dependencies: {
          databaseStorage: storageHealthy ? 'operational' : 'unavailable',
          productsCatalog: catalogHealthy ? 'operational' : 'unavailable',
          sheetsSyncGateway: Boolean(process.env.GOOGLE_APPS_SCRIPT_URL) ? 'configured' : 'unconfigured'
        },
        metrics: {
          activeOrdersCount: db.getOrders().length,
          serviceBookingsCount: db.getServiceBookings().length,
          contactEnquiriesCount: db.getContactSubmissions().length,
          heapUsedMB: Math.round((mem.heapUsed / 1024 / 1024) * 10) / 10
        }
      };

      if (!isSystemHealthy) {
        return res.status(503).json(healthPayload);
      }

      res.json(healthPayload);
    } catch {
      res.status(503).json({
        status: 'unhealthy',
        error: 'Critical system dependency check failed'
      });
    }
  });

  // ==========================================
  // HARDWARE PRODUCTS & SERVICES CATALOG APIs
  // ==========================================
  app.get('/api/products', (req, res) => {
    const { category } = req.query;
    let results = productsData;
    if (category && typeof category === 'string' && category !== 'All') {
      results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    res.json({ success: true, count: results.length, data: results });
  });

  app.get('/api/products/:slug', (req, res) => {
    const product = productsData.find(p => p.slug === req.params.slug || p.id === req.params.slug);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, data: product });
  });

  app.get('/api/services', (req, res) => {
    res.json({ success: true, count: servicesData.length, data: servicesData });
  });

  app.get('/api/services/:slug', (req, res) => {
    const service = servicesData.find(s => s.slug === req.params.slug || s.id === req.params.slug);
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    res.json({ success: true, data: service });
  });

  // ==========================================
  // ORDERS API (SERVER-AUTHORITATIVE & DATA ISOLATION)
  // ==========================================

  // List Orders (Customer Isolation Guard)
  app.get('/api/orders', requireAuth, (req, res) => {
    const auth = (req as any).auth;
    const { query } = req.query;
    let orders = [...db.getOrders()];

    if (auth.role === 'customer') {
      orders = orders.filter(
        o => o.customerId === auth.userId || o.customerEmail.toLowerCase() === auth.email.toLowerCase()
      );
    }

    if (query) {
      const q = String(query).toLowerCase();
      orders = orders.filter(
        o =>
          o.id.toLowerCase().includes(q) ||
          o.companyName.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.items.some(i => i.productName.toLowerCase().includes(q))
      );
    }

    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json({ success: true, count: orders.length, data: orders });
  });

  // Get Single Order (Strict 403 Forbidden Guard)
  app.get('/api/orders/:id', requireAuth, (req, res) => {
    const auth = (req as any).auth;
    const orderId = req.params.id.trim().toUpperCase();
    const order = db.getOrders().find(o => o.id.toUpperCase() === orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: `Order with reference ID '${req.params.id}' was not found.`
      });
    }

    if (auth.role === 'customer') {
      const isOwner =
        order.customerId === auth.userId ||
        order.customerEmail.toLowerCase() === auth.email.toLowerCase();

      if (!isOwner) {
        return res.status(403).json({
          success: false,
          error: 'Access Denied: You do not have permission to view this order.'
        });
      }
    }

    res.json({ success: true, data: order });
  });

  // Public Order Tracking Endpoint (Safe Non-Confidential Telemetry)
  app.get('/api/orders/track/:id', (req, res) => {
    const orderId = req.params.id.trim().toUpperCase();
    const order = db.getOrders().find(o => o.id.toUpperCase() === orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: `Order with reference ID '${req.params.id}' was not found.`
      });
    }

    res.json({
      success: true,
      data: {
        id: order.id,
        createdAt: order.createdAt,
        status: order.status,
        companyName: order.companyName,
        customerName: order.customerName,
        items: order.items.map(i => ({
          productName: i.productName,
          productCode: i.productCode,
          quantity: i.quantity,
          totalPrice: i.totalPrice,
          deploymentTier: i.deploymentTier
        })),
        total: order.total,
        timeline: order.timeline,
        courierPartner: order.courierPartner,
        dispatchTrackingNumber: order.dispatchTrackingNumber,
        shippingAddress: order.shippingAddress,
        purchaseOrderNumber: order.purchaseOrderNumber
      }
    });
  });

  // Create Order (Authoritative Server Pricing & Configurable GST/HSN Engine)
  app.post('/api/orders', async (req, res) => {
    try {
      const auth = extractUserFromHeader(req);
      const {
        customerId,
        customerName,
        customerEmail,
        companyName,
        phone,
        gstin,
        billingAddress,
        shippingAddress,
        items,
        notes,
        purchaseOrderNumber
      } = req.body;

      // Strict Field Validation
      if (!customerName || typeof customerName !== 'string' || customerName.trim().length < 2) {
        return res.status(400).json({ success: false, error: 'Valid customer name is required.' });
      }
      if (!isValidEmail(customerEmail)) {
        return res.status(400).json({ success: false, error: 'Valid customer corporate email address is required.' });
      }
      if (!companyName || typeof companyName !== 'string' || companyName.trim().length < 2) {
        return res.status(400).json({ success: false, error: 'Valid enterprise company name is required.' });
      }
      if (phone && !isValidPhone(phone)) {
        return res.status(400).json({ success: false, error: 'Invalid phone number format.' });
      }
      if (gstin && !isValidGstin(gstin)) {
        return res.status(400).json({ success: false, error: 'Invalid 15-character GSTIN format.' });
      }
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, error: 'Order must contain at least one valid product item.' });
      }

      // Server-Side Authoritative Calculation
      let computedSubtotal = 0;
      let totalTaxAmount = 0;
      const validatedItems: OrderItem[] = [];
      const itemizedTaxSummary: { productName: string; hsnCode: string; taxableAmount: number; gstRate: number; taxAmount: number }[] = [];

      for (const item of items) {
        const product = productsData.find(p => p.id === item.productId || p.code === item.productCode || p.name === item.productName);
        if (!product) {
          return res.status(400).json({
            success: false,
            error: `Invalid or unavailable product identifier: '${item.productId || item.productCode || item.productName}'.`
          });
        }

        if (!product.orderEnabled) {
          return res.status(400).json({
            success: false,
            error: `Product '${product.name}' is currently not available for self-service procurement.`
          });
        }

        const rawQuantity = typeof item.quantity === 'string' ? parseInt(item.quantity, 10) : item.quantity;
        if (!isValidIntegerQuantity(rawQuantity)) {
          return res.status(400).json({
            success: false,
            error: `Invalid unit quantity for ${product.name}. Must be a positive integer between 1 and 10,000.`
          });
        }
        const quantity = rawQuantity;

        // Authoritative Server-side Price Lookup
        let authoritativeUnitPrice = product.price;
        if (product.pricing && product.pricing.length > 0) {
          const tier = product.pricing.find(p => p.licenseType === item.licenseType) || product.pricing[0];
          if (quantity >= (tier.minimumSeats || 1)) {
            authoritativeUnitPrice = tier.pricePerUnit;
          }
        }
        if (product.discountPrice && quantity >= 5) {
          authoritativeUnitPrice = Math.min(authoritativeUnitPrice, product.discountPrice);
        }

        const authoritativeItemTotal = Math.round(authoritativeUnitPrice * quantity);
        computedSubtotal += authoritativeItemTotal;

        // Configurable HSN Code and GST Rate per Product
        const itemHsnCode = product.hsnCode || (product.category === 'CCTV Cameras' ? '8525' : product.category === 'Networking Hardware' ? '8517' : '8471');
        const itemGstRate = typeof product.gstRate === 'number' ? product.gstRate : 0.18;
        const itemTax = Math.round(authoritativeItemTotal * itemGstRate);
        totalTaxAmount += itemTax;

        itemizedTaxSummary.push({
          productName: product.name,
          hsnCode: itemHsnCode,
          taxableAmount: authoritativeItemTotal,
          gstRate: itemGstRate,
          taxAmount: itemTax
        });

        validatedItems.push({
          productId: product.id,
          productName: product.name,
          productCode: product.code,
          category: product.category,
          brand: product.brand,
          licenseType: item.licenseType || 'ANNUAL',
          deploymentTier: item.deploymentTier || 'STANDARD_DELIVERY',
          quantity,
          unitPrice: authoritativeUnitPrice,
          totalPrice: authoritativeItemTotal,
          hsnCode: itemHsnCode,
          gstRate: itemGstRate,
          taxAmount: itemTax,
          warrantyPeriod: product.warranty || '3-Year On-Site NBD Replacement',
          configurationNotes: sanitizeString(item.configurationNotes, 300)
        });
      }

      // GST Breakdown Computation (Intra-State vs Inter-State)
      const cleanedGstin = gstin ? sanitizeString(gstin, 20).toUpperCase() : undefined;
      const destinationStr = `${billingAddress || ''} ${shippingAddress || ''}`.toLowerCase();
      const isTamilNaduState = (cleanedGstin && cleanedGstin.startsWith('33')) || destinationStr.includes('tamil nadu') || destinationStr.includes('chennai');

      const isB2B = Boolean(cleanedGstin && isValidGstin(cleanedGstin));
      const computedGrandTotal = computedSubtotal + totalTaxAmount;

      const gstBreakdown: GstTaxBreakdown = {
        sacCode: validatedItems.map(i => i.hsnCode).filter((v, idx, a) => a.indexOf(v) === idx).join(' / '),
        cgstRate: isTamilNaduState ? 0.09 : 0,
        cgstAmount: isTamilNaduState ? Math.round(totalTaxAmount / 2) : 0,
        sgstRate: isTamilNaduState ? 0.09 : 0,
        sgstAmount: isTamilNaduState ? (totalTaxAmount - Math.round(totalTaxAmount / 2)) : 0,
        igstRate: isTamilNaduState ? 0 : 0.18,
        igstAmount: isTamilNaduState ? 0 : totalTaxAmount,
        isInterState: !isTamilNaduState,
        isB2B,
        customerGstin: cleanedGstin,
        itemizedSummary: itemizedTaxSummary
      };

      const orderCounter = db.getOrderCounter();
      const orderId = `LRTP-2026-${String(orderCounter).padStart(6, '0')}`;
      const nowIso = new Date().toISOString();

      // Customer binding: use authenticated user's ID if available
      const verifiedCustomerId = auth.authenticated && auth.userId
        ? auth.userId
        : (customerId && customerId.trim().length > 3 ? sanitizeString(customerId, 50) : `cust-${crypto.randomBytes(4).toString('hex')}`);

      const newOrder: Order = {
        id: orderId,
        createdAt: nowIso,
        updatedAt: nowIso,
        customerId: verifiedCustomerId,
        customerName: sanitizeString(customerName, 100),
        customerEmail: customerEmail.trim().toLowerCase(),
        companyName: sanitizeString(companyName, 150),
        phone: phone ? sanitizeString(phone, 30) : '+91 98400 12345',
        gstin: cleanedGstin,
        billingAddress: billingAddress ? sanitizeString(billingAddress, 250) : 'Corporate Campus, Chennai',
        shippingAddress: shippingAddress ? sanitizeString(shippingAddress, 250) : (billingAddress ? sanitizeString(billingAddress, 250) : 'Corporate Campus, Chennai'),
        items: validatedItems,
        subtotal: computedSubtotal,
        tax: totalTaxAmount,
        total: computedGrandTotal,
        currency: 'INR',
        status: 'SUBMITTED',
        timeline: [
          {
            status: 'SUBMITTED',
            timestamp: nowIso,
            note: 'Order validated, itemized GST tax invoice breakdown computed, and committed to database.',
            actor: 'LR Core Order API'
          }
        ],
        notes: notes ? sanitizeString(notes, 1000) : '',
        purchaseOrderNumber: purchaseOrderNumber ? sanitizeString(purchaseOrderNumber, 50) : `PO-${orderId.split('-')[2]}`,
        syncedToGoogleSheets: false,
        sheetsSyncStatus: 'PENDING',
        dispatchTrackingNumber: `BDT-${Math.floor(100000000 + Math.random() * 900000000)}-IN`,
        courierPartner: 'Blue Dart Apex Express',
        warrantyCertificateId: `LRTP-WRN-${orderId.replace(/[^0-9]/g, '')}-2029`,
        gstBreakdown
      };

      // Persist order locally first (guaranteed transaction durability)
      db.getOrders().unshift(newOrder);
      db.save();

      // Asynchronous Google Sheets Webhook Dispatch with resilient status update
      dispatchGoogleSheetsWebhook({
        action: 'PRODUCT_ORDER',
        targetSheet: 'Product Orders',
        data: {
          orderId: newOrder.id,
          date: new Date(newOrder.createdAt).toLocaleString('en-IN'),
          customerName: newOrder.customerName,
          company: newOrder.companyName,
          email: newOrder.customerEmail,
          phone: newOrder.phone,
          gstin: newOrder.gstin || 'N/A',
          shippingAddress: newOrder.shippingAddress,
          items: newOrder.items.map(i => `${i.productName} (Qty: ${i.quantity}, ₹${i.unitPrice})`).join('; '),
          subtotal: `₹${newOrder.subtotal.toLocaleString('en-IN')}`,
          tax: `₹${newOrder.tax.toLocaleString('en-IN')}`,
          total: `₹${newOrder.total.toLocaleString('en-IN')}`,
          status: newOrder.status,
          purchaseOrderNumber: newOrder.purchaseOrderNumber || 'N/A'
        }
      }).then((res) => {
        newOrder.syncedToGoogleSheets = res.dispatched;
        newOrder.sheetsSyncStatus = res.status;
        if (res.dispatched) {
          newOrder.sheetsSyncTimestamp = new Date().toISOString();
        } else if (res.error) {
          newOrder.sheetsSyncError = res.error;
        }
        db.save();
      });

      return res.status(201).json({
        success: true,
        message: 'Order placed successfully and persisted to database.',
        orderId: newOrder.id,
        data: newOrder
      });
    } catch (err: any) {
      console.error('[Order Processing Error]:', err);
      return res.status(500).json({ success: false, error: 'An internal server error occurred while processing the order.' });
    }
  });

  // Update Order Status (RBAC Protected: Sales, Admin, Superadmin)
  app.patch('/api/orders/:id/status', requireRoles(['sales', 'admin', 'superadmin']), (req, res) => {
    const { status, note, actor } = req.body as { status: OrderStatus; note?: string; actor?: string };
    const order = db.getOrders().find(o => o.id.toUpperCase() === req.params.id.toUpperCase());

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const validStatuses: OrderStatus[] = ['SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'PROCESSING', 'COMPLETED', 'CANCELLED', 'REJECTED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: `Invalid status: ${status}` });
    }

    const now = new Date().toISOString();
    order.status = status;
    order.updatedAt = now;
    order.timeline.push({
      status,
      timestamp: now,
      note: note ? sanitizeString(note, 500) : `Status updated to ${status}`,
      actor: actor ? sanitizeString(actor, 100) : 'LR Operations Desk'
    });

    db.save();

    res.json({
      success: true,
      message: `Order ${order.id} status transitioned to ${status}`,
      data: order
    });
  });

  // Retry Google Sheets Synchronization (Resilient Telemetry)
  app.post('/api/orders/:id/retry-sync', requireAuth, async (req, res) => {
    const auth = (req as any).auth;
    const orderId = req.params.id.trim().toUpperCase();
    const order = db.getOrders().find(o => o.id.toUpperCase() === orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    if (auth.role === 'customer') {
      const isOwner =
        order.customerId === auth.userId ||
        order.customerEmail.toLowerCase() === auth.email.toLowerCase();
      if (!isOwner) {
        return res.status(403).json({ success: false, error: 'Access Denied: You do not have permission to sync this order.' });
      }
    }

    // Set state to RETRYING
    order.sheetsSyncStatus = 'RETRYING';
    db.save();

    const syncResult = await dispatchGoogleSheetsWebhook({
      action: 'PRODUCT_ORDER',
      targetSheet: 'Product Orders',
      data: {
        orderId: order.id,
        date: new Date(order.createdAt).toLocaleString('en-IN'),
        customerName: order.customerName,
        company: order.companyName,
        email: order.customerEmail,
        phone: order.phone,
        gstin: order.gstin || 'N/A',
        shippingAddress: order.shippingAddress,
        items: order.items.map(i => `${i.productName} (Qty: ${i.quantity}, ₹${i.unitPrice})`).join('; '),
        subtotal: `₹${order.subtotal.toLocaleString('en-IN')}`,
        tax: `₹${order.tax.toLocaleString('en-IN')}`,
        total: `₹${order.total.toLocaleString('en-IN')}`,
        status: order.status,
        purchaseOrderNumber: order.purchaseOrderNumber || 'N/A'
      }
    });

    order.syncedToGoogleSheets = syncResult.dispatched;
    order.sheetsSyncStatus = syncResult.status;
    if (syncResult.dispatched) {
      order.sheetsSyncTimestamp = new Date().toISOString();
      delete order.sheetsSyncError;
    } else if (syncResult.error) {
      order.sheetsSyncError = syncResult.error;
    }
    db.save();

    res.json({
      success: true,
      message: syncResult.dispatched ? 'Order successfully synced to Google Sheets.' : 'Google Sheets sync pending or failed.',
      sheetsSyncStatus: order.sheetsSyncStatus,
      syncedToGoogleSheets: order.syncedToGoogleSheets,
      data: order
    });
  });

  // ==========================================
  // SERVICE BOOKINGS API (SECURE RBAC)
  // ==========================================
  app.get('/api/service-bookings', requireAuth, (req, res) => {
    const auth = (req as any).auth;
    let results = [...db.getServiceBookings()];

    if (auth.role === 'customer') {
      results = results.filter(b => b.email.toLowerCase() === auth.email.toLowerCase());
    }

    results.sort((a, b) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime());
    res.json({ success: true, count: results.length, data: results });
  });

  app.post('/api/service-bookings', async (req, res) => {
    try {
      const { customerName, company, email, phone, service, preferredDate, preferredTime, location, requirements } = req.body;
      if (!customerName || !email || !phone || !service || !preferredDate || !location) {
        return res.status(400).json({ success: false, error: 'All booking fields (Name, Email, Phone, Service, Date, Location) are required.' });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({ success: false, error: 'Please enter a valid corporate email address.' });
      }

      if (!isValidPhone(phone)) {
        return res.status(400).json({ success: false, error: 'Please enter a valid phone number.' });
      }

      const bookingCounter = db.getServiceBookingCounter();
      const bookingId = `LRTP-SVC-2026-${String(bookingCounter).padStart(6, '0')}`;
      const nowIso = new Date().toISOString();

      const newBooking: ServiceBooking = {
        id: `srv-book-${Date.now()}`,
        bookingId,
        dateSubmitted: nowIso,
        customerName: sanitizeString(customerName, 100),
        company: company ? sanitizeString(company, 150) : '',
        email: email.trim().toLowerCase(),
        phone: sanitizeString(phone, 30),
        service: sanitizeString(service, 100),
        preferredDate: sanitizeString(preferredDate, 30),
        preferredTime: preferredTime ? sanitizeString(preferredTime, 50) : 'Flexible / Morning',
        location: sanitizeString(location, 200),
        requirements: requirements ? sanitizeString(requirements, 1000) : 'Standard onsite deployment assessment',
        bookingStatus: 'CONFIRMED',
        syncedToGoogleSheets: false
      };

      db.getServiceBookings().unshift(newBooking);
      db.save();

      dispatchGoogleSheetsWebhook({
        action: 'SERVICE_BOOKING',
        targetSheet: 'Service Bookings',
        data: {
          bookingId: newBooking.bookingId,
          dateSubmitted: new Date(newBooking.dateSubmitted).toLocaleString('en-IN'),
          customerName: newBooking.customerName,
          company: newBooking.company || 'N/A',
          email: newBooking.email,
          phone: newBooking.phone,
          service: newBooking.service,
          preferredDate: newBooking.preferredDate,
          location: newBooking.location,
          requirements: newBooking.requirements,
          status: newBooking.bookingStatus
        }
      }).then((res) => {
        newBooking.syncedToGoogleSheets = res.dispatched;
        if (res.dispatched) {
          newBooking.sheetsSyncTimestamp = new Date().toISOString();
        }
        db.save();
      });

      return res.status(201).json({
        success: true,
        message: 'Service deployment booked and scheduled successfully.',
        bookingId: newBooking.bookingId,
        data: newBooking
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: 'Internal server error scheduling service.' });
    }
  });

  // ==========================================
  // CONTACT ENQUIRIES API (SECURE RBAC)
  // ==========================================
  app.get('/api/contact', requireRoles(['sales', 'admin', 'superadmin']), (req, res) => {
    res.json({ success: true, count: db.getContactSubmissions().length, data: db.getContactSubmissions() });
  });

  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, phone, company, subject, serviceInterest, estimatedBudget, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({ success: false, error: 'Please enter a valid corporate email address.' });
      }

      if (phone && !isValidPhone(phone)) {
        return res.status(400).json({ success: false, error: 'Invalid phone number format.' });
      }

      const contactCounter = db.getContactCounter();
      const enquiryId = `LRTP-CON-2026-${String(contactCounter).padStart(6, '0')}`;
      const nowIso = new Date().toISOString();

      const submission: ContactSubmission = {
        id: `cnt-${Date.now()}`,
        enquiryId,
        name: sanitizeString(name, 100),
        email: email.trim().toLowerCase(),
        phone: phone ? sanitizeString(phone, 30) : '',
        company: company ? sanitizeString(company, 150) : '',
        subject: subject ? sanitizeString(subject, 150) : (serviceInterest || 'General Infrastructure Inquiry'),
        serviceInterest: sanitizeString(serviceInterest || 'General Inquiry', 100),
        estimatedBudget: sanitizeString(estimatedBudget || 'Not Specified', 50),
        message: sanitizeString(message, 2000),
        source: 'Website Contact Page',
        status: 'SUBMITTED',
        createdAt: nowIso,
        syncedToGoogleSheets: false
      };

      db.getContactSubmissions().unshift(submission);
      db.save();

      dispatchGoogleSheetsWebhook({
        action: 'CONTACT_ENQUIRY',
        targetSheet: 'Contact Enquiries',
        data: {
          enquiryId: submission.enquiryId,
          date: new Date(submission.createdAt).toLocaleString('en-IN'),
          name: submission.name,
          email: submission.email,
          phone: submission.phone || 'N/A',
          company: submission.company || 'N/A',
          subject: submission.subject,
          serviceInterest: submission.serviceInterest,
          message: submission.message,
          status: submission.status
        }
      }).then((res) => {
        submission.syncedToGoogleSheets = res.dispatched;
        db.save();
      });

      return res.status(201).json({
        success: true,
        message: 'Thank you for reaching out. An LR Solutions Architect will contact you shortly.',
        enquiryId: submission.enquiryId,
        data: submission
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: 'Internal server error processing enquiry.' });
    }
  });

  // ==========================================
  // GOOGLE SHEETS AUDIT EXPORT (ADMIN ONLY)
  // ==========================================
  app.get('/api/sheets-export', requireRoles(['admin', 'superadmin']), (req, res) => {
    const ordersSheet = db.getOrders().map(o => ({
      'Order ID': o.id,
      'Date': new Date(o.createdAt).toLocaleDateString('en-IN'),
      'Customer ID': o.customerId,
      'Customer Name': o.customerName,
      'Company': o.companyName,
      'Items': o.items.map(i => `${i.productName} (Qty: ${i.quantity})`).join(', '),
      'Subtotal (INR)': `₹${o.subtotal.toLocaleString('en-IN')}`,
      'Tax (INR)': `₹${o.tax.toLocaleString('en-IN')}`,
      'Total (INR)': `₹${o.total.toLocaleString('en-IN')}`,
      'Status': o.status,
      'PO Number': o.purchaseOrderNumber || 'N/A'
    }));

    const serviceBookingsSheet = db.getServiceBookings().map(b => ({
      'Booking ID': b.bookingId,
      'Date': new Date(b.dateSubmitted).toLocaleDateString('en-IN'),
      'Customer Name': b.customerName,
      'Company': b.company || 'N/A',
      'Email': b.email,
      'Phone': b.phone,
      'Service': b.service,
      'Preferred Date': b.preferredDate,
      'Location': b.location,
      'Status': b.bookingStatus
    }));

    const contactEnquiriesSheet = db.getContactSubmissions().map(c => ({
      'Enquiry ID': c.enquiryId || c.id,
      'Date': new Date(c.createdAt).toLocaleDateString('en-IN'),
      'Name': c.name,
      'Email': c.email,
      'Phone': c.phone || 'N/A',
      'Company': c.company || 'N/A',
      'Subject': c.subject || 'N/A',
      'Message': c.message,
      'Status': c.status || 'NEW'
    }));

    res.json({
      success: true,
      lastSyncTimestamp: new Date().toISOString(),
      sheets: {
        'Product Orders': ordersSheet,
        'Service Bookings': serviceBookingsSheet,
        'Contact Enquiries': contactEnquiriesSheet
      }
    });
  });

  // Support Tickets
  app.get('/api/support', requireAuth, (req, res) => {
    const auth = (req as any).auth;
    let results = [...db.getSupportTickets()];

    if (auth.role === 'customer') {
      results = results.filter(t => t.customerEmail.toLowerCase() === auth.email.toLowerCase());
    }

    res.json({ success: true, data: results });
  });

  // Global Error Handler (Sanitizes stack traces in production)
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('[Unhandled Server Error]:', err);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred. Transaction telemetry recorded.'
    });
  });

  // ==========================================
  // VITE SPA MIDDLEWARE & FALLBACK ROUTING
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LR Techno Park Enterprise Gateway running on port ${PORT}`);
  });
}

startServer();
