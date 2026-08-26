/**
 * LR TECHNO PARK ENTERPRISE DOMAIN TYPES & SCHEMAS
 * Standardized for Physical IT Products, Enterprise IT & Security Services,
 * Multi-Workflow Google Sheets Data Pipelines, and Server-Side Validation.
 */

export type UserRole =
  | 'customer'
  | 'sales'
  | 'support'
  | 'admin'
  | 'superadmin';

export type OrderStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'REJECTED';

export type ProductCategory =
  | 'Computer Hardware'
  | 'CCTV Cameras'
  | 'Networking Hardware'
  | 'Laptops';

export type LicenseType = 'MONTHLY' | 'ANNUAL' | 'PERPETUAL' | 'ENTERPRISE_CUSTOM';

export type DeploymentTier = 'STANDARD_DELIVERY' | 'EXPRESS_DISPATCH' | 'WHITE_GLOVE_COMMISSIONING' | 'CLOUD_HOSTED' | 'HYBRID_ON_PREM' | 'DEDICATED_PRIVATE_CLOUD' | 'EDGE_APPLIANCE';

export interface ProductFeature {
  title: string;
  description: string;
  iconName?: string;
  metricHighlight?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductPricingTier {
  licenseType: LicenseType;
  name: string;
  pricePerUnit: number;
  billingPeriod: string;
  minimumSeats: number;
  featuresIncluded: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  code: string;
  tagline?: string;
  category: ProductCategory;
  brand: string;
  shortDescription: string;
  description: string;
  badge?: string;
  images?: string[];
  image?: string;
  version?: string;
  rating: number;
  deploymentsCount?: number;
  slaAvailability?: string;
  availability: string;
  price: number;
  discountPrice?: number;
  unit: string;
  orderEnabled: boolean;
  featured: boolean;
  features: ProductFeature[];
  specs: ProductSpec[];
  pricing: ProductPricingTier[];
  howItWorks: {
    step: string;
    title: string;
    description: string;
  }[];
  documentationUrl?: string;
  apiDocsAvailable?: boolean;
  complianceTags: string[];
  warranty?: string;
  hsnCode?: string; // Configurable per-product HSN (e.g. 8471, 8517, 8525)
  gstRate?: number; // Configurable tax rate (e.g. 0.18 for 18%, 0.12 for 12%, 0.28 for 28%)
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  shortDescription: string;
  overview?: string;
  description?: string;
  icon: string;
  sacCode?: string; // Configurable per-service SAC (e.g. 998313, 998713)
  gstRate?: number; // Standard service GST rate (default 0.18)
  capabilities: string[];
  deliverables: string[];
  recommendedUseCases: string[];
  technologies: string[];
  equipment?: string[];
  processSteps: {
    stepNumber: string;
    phase: string;
    action: string;
    outcome: string;
  }[];
  typicalSLA: string;
  targetAudience: string;
  bookingEnabled: boolean;
}

export interface ServiceBooking {
  id: string;
  bookingId: string; // LRTP-SVC-2026-000001
  dateSubmitted: string;
  customerName: string;
  company?: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
  requirements: string;
  bookingStatus: 'PENDING_DISPATCH' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  syncedToGoogleSheets: boolean;
  sheetsSyncTimestamp?: string;
}

export interface CaseStudy {
  id: string;
  clientIndustry: string;
  clientName: string;
  title: string;
  challenge: string;
  solution: string;
  architectureHighlights: string[];
  results: {
    metric: string;
    label: string;
  }[];
  timeline: string;
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  isTemplatePlaceholder?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productCode: string;
  category?: ProductCategory;
  brand?: string;
  licenseType?: LicenseType;
  deploymentTier?: DeploymentTier;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  configurationNotes?: string;
  hsnCode?: string;
  gstRate?: number;
  taxAmount?: number;
  warrantyPeriod?: string;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  note: string;
  actor: string;
}

export interface GstTaxBreakdown {
  sacCode: string; // e.g. "8471" / "8517" / "8525" (HSN for IT Hardware) or "998313"
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
  igstRate: number;
  igstAmount: number;
  isInterState: boolean;
  isB2B?: boolean;
  customerGstin?: string;
  itemizedSummary?: {
    productName: string;
    hsnCode: string;
    taxableAmount: number;
    gstRate: number;
    taxAmount: number;
  }[];
}

export interface Order {
  id: string; // Server-generated e.g. LRTP-2026-000101
  createdAt: string;
  updatedAt: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  companyName: string;
  phone: string;
  gstin?: string;
  billingAddress: string;
  shippingAddress: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  status: OrderStatus;
  timeline: OrderTimelineEvent[];
  notes?: string;
  purchaseOrderNumber?: string;
  syncedToGoogleSheets: boolean;
  sheetsSyncStatus?: 'SYNCED' | 'FAILED' | 'PENDING' | 'RETRYING';
  sheetsSyncError?: string;
  sheetsSyncTimestamp?: string;
  assignedSalesEngineer?: string;
  gstBreakdown?: GstTaxBreakdown;
  licenseToken?: string;
  dispatchTrackingNumber?: string;
  courierPartner?: string;
  warrantyCertificateId?: string;
}

export interface CreateOrderInput {
  customerId?: string;
  customerName: string;
  customerEmail: string;
  companyName: string;
  phone?: string;
  gstin?: string;
  purchaseOrderNumber?: string;
  taxId?: string;
  billingAddress?: string;
  shippingAddress?: string;
  items: OrderItem[];
  notes?: string;
}

export interface UserProfile {
  uid?: string;
  id?: string;
  email: string;
  displayName: string;
  company: string;
  role: UserRole;
  phone?: string;
  gstin?: string;
  billingAddress?: string;
  activeLicensesCount?: number;
  createdDate?: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerId: string;
  customerName?: string;
  customerEmail: string;
  companyName: string;
  subject: string;
  category: 'Technical Support' | 'Billing & Orders' | 'Hardware & Warranty' | 'Deployment & Infrastructure' | 'AMC & Maintenance';
  priority: 'CRITICAL_P1' | 'HIGH_P2' | 'MEDIUM_P3' | 'STANDARD_P4';
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING_ON_CUSTOMER' | 'RESOLVED';
  createdAt: string;
  lastReplyAt?: string;
  assignedTeam: string;
}

export interface ContactSubmission {
  id: string;
  enquiryId?: string; // e.g. LRTP-CON-2026-000001
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject?: string;
  serviceInterest?: string;
  estimatedBudget?: string;
  message: string;
  source?: string;
  status?: string;
  createdAt: string;
  syncedToGoogleSheets?: boolean;
}

export interface LicenseTokenPayload {
  orderId: string;
  customerId: string;
  companyName: string;
  productId: string;
  productCode: string;
  licenseType: LicenseType;
  deploymentTier: DeploymentTier;
  seats: number;
  issuedAt: number;
  expiresAt: number;
  nonce: string;
  signature: string;
}

export interface AppEnvironmentConfig {
  mode: 'development' | 'production';
  isDevelopment: boolean;
  isProduction: boolean;
  apiBaseUrl: string;
  enableDemoAccounts: boolean;
  firebaseConfigured: boolean;
  sheetsConfigured: boolean;
}
