/// <reference types="vite/client" />

/**
 * LR TECHNO PARK RUNTIME ENVIRONMENT & SECURITY CONFIGURATION
 * Handles development vs. production gating, API base URL resolution,
 * and demo account visibility controls.
 */

const env = (import.meta as any).env || {};
const mode = env.MODE || 'development';
const isProd = mode === 'production';
const isDev = !isProd;

// In production, demo accounts are STRICTLY disabled by default
const enableDemoAccounts = isDev && (env.VITE_ENABLE_DEMO_ACCOUNTS !== 'false');

// Configurable API base URL: defaults to local '/api' for integrated Express server
// or an external production backend URL (e.g., Cloud Run, Render) when hosted on GitHub Pages.
const apiBaseUrl = (env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

export const config = {
  mode,
  isProduction: isProd,
  isDevelopment: isDev,
  apiBaseUrl,
  enableDemoAccounts,
  firebase: {
    apiKey: env.VITE_FIREBASE_API_KEY || '',
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: env.VITE_FIREBASE_APP_ID || '',
    isConfigured: Boolean(env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_PROJECT_ID)
  },
  sheets: {
    appsScriptUrl: env.VITE_GOOGLE_APPS_SCRIPT_URL || '',
    isConfigured: Boolean(env.VITE_GOOGLE_APPS_SCRIPT_URL)
  },
  company: {
    name: 'LR Techno Park',
    legalName: 'LR Techno Park Private Limited',
    gstin: '33AAACL8890K1ZV',
    sacCode: '998313', // IT Design and Development Services / Software Licensing
    supportEmail: 'support@lrtechnopark.com',
    salesEmail: 'licensing@lrtechnopark.com',
    hotline: '+1 (800) 578-3246'
  }
};

/**
 * Returns the fully qualified API URL for a given endpoint.
 */
export function getApiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (config.apiBaseUrl.startsWith('http')) {
    return `${config.apiBaseUrl}${cleanEndpoint}`;
  }
  return cleanEndpoint;
}
