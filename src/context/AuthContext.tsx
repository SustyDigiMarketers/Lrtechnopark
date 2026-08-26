import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, UserRole } from '../types';
import { config, getApiUrl } from '../config/env';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoModeActive: boolean;
  loginWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  loginAsDemoRole: (role: UserRole) => Promise<void>;
  register: (data: { name: string; email: string; company: string; phone?: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  hasPermission: (allowedRoles: UserRole[]) => boolean;
  demoProfiles: Record<UserRole, UserProfile> | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Verified pre-seeded demo accounts (for quick testing in dev environments)
export const DEV_ROLE_PRESETS: Record<UserRole, { email: string; pass: string; profile: UserProfile }> = {
  customer: {
    email: 'client.procurement@enterprise.example',
    pass: 'Enterprise@2026',
    profile: {
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
      createdDate: '2025-01-10'
    }
  },
  sales: {
    email: 'sales.engineer@lrtechnopark.com',
    pass: 'SalesAdmin@2026',
    profile: {
      uid: 'staff-sales-01',
      id: 'staff-sales-01',
      email: 'sales.engineer@lrtechnopark.com',
      displayName: 'Sales Solutions Architect',
      company: 'LR Techno Park Commercial Operations',
      role: 'sales',
      phone: '+91 98400 55555',
      activeLicensesCount: 45,
      createdDate: '2024-06-01'
    }
  },
  support: {
    email: 'support.lead@lrtechnopark.com',
    pass: 'SupportLead@2026',
    profile: {
      uid: 'staff-support-01',
      id: 'staff-support-01',
      email: 'support.lead@lrtechnopark.com',
      displayName: 'NOC & Security Operations Desk',
      company: 'LR Techno Park Support Center',
      role: 'support',
      phone: '+91 98400 66666',
      activeLicensesCount: 0,
      createdDate: '2024-03-15'
    }
  },
  admin: {
    email: 'operations.admin@lrtechnopark.com',
    pass: 'Operations@2026',
    profile: {
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
      createdDate: '2023-01-01'
    }
  },
  superadmin: {
    email: 'ciso.director@lrtechnopark.com',
    pass: 'SuperAdmin@2026',
    profile: {
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
      createdDate: '2022-01-01'
    }
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('lrtp_auth_token');
  });
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and verify session token from server
  const verifySession = useCallback(async () => {
    const savedToken = localStorage.getItem('lrtp_auth_token');
    if (!savedToken) {
      // If dev mode with demo accounts enabled, default to customer preset for interactive experience
      if (config.enableDemoAccounts) {
        try {
          const res = await fetch(getApiUrl('/auth/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: DEV_ROLE_PRESETS.customer.email,
              password: DEV_ROLE_PRESETS.customer.pass
            })
          });
          const data = await res.json();
          if (data.success && data.token) {
            localStorage.setItem('lrtp_auth_token', data.token);
            setToken(data.token);
            setUser(data.user);
          }
        } catch {
          // Ignore
        }
      }
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(getApiUrl('/auth/me'), {
        headers: {
          'Authorization': `Bearer ${savedToken}`
        }
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        setToken(savedToken);
      } else {
        // Expired or invalid session
        localStorage.removeItem('lrtp_auth_token');
        setToken(null);
        setUser(null);
      }
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  const hasPermission = (allowedRoles: UserRole[]): boolean => {
    if (!user) return false;
    if (user.role === 'superadmin') return true;
    return allowedRoles.includes(user.role);
  };

  const loginWithEmail = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const res = await fetch(getApiUrl('/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: pass })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('lrtp_auth_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Authentication failed' };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error connecting to auth server' };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const res = await fetch(getApiUrl('/auth/google'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'santhosh.enterprise@gmail.com',
          displayName: 'Santhosh Kumar (Google Auth)',
          company: 'Enterprise Tech Partner'
        })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('lrtp_auth_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: 'Google sign-in failed' };
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemoRole = async (role: UserRole) => {
    const preset = DEV_ROLE_PRESETS[role];
    if (preset) {
      await loginWithEmail(preset.email, preset.pass);
    }
  };

  const register = async (data: { name: string; email: string; company: string; phone?: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = await fetch(getApiUrl('/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        localStorage.setItem('lrtp_auth_token', resData.token);
        setToken(resData.token);
        setUser(resData.user);
        return { success: true };
      } else {
        return { success: false, error: resData.error || 'Registration failed' };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return false;
    setUser({ ...user, ...data });
    return true;
  };

  const logout = () => {
    localStorage.removeItem('lrtp_auth_token');
    setToken(null);
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    try {
      const res = await fetch(getApiUrl('/auth/reset-password'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      return { success: true, message: data.message };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const demoProfiles = config.enableDemoAccounts
    ? (Object.fromEntries(Object.entries(DEV_ROLE_PRESETS).map(([k, v]) => [k, v.profile])) as Record<UserRole, UserProfile>)
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        isLoading,
        isDemoModeActive: config.enableDemoAccounts,
        loginWithEmail,
        loginWithGoogle,
        loginAsDemoRole,
        register,
        updateProfile,
        logout,
        resetPassword,
        hasPermission,
        demoProfiles
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
