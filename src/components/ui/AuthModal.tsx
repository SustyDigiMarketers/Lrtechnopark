import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User, Building, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { UserRole } from '../../types';
import { TechBadge } from './TechBadge';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onSuccess
}) => {
  const {
    loginWithEmail,
    loginWithGoogle,
    loginAsDemoRole,
    register,
    resetPassword,
    isLoading,
    isDemoModeActive,
    demoProfiles
  } = useAuth();
  const { showToast } = useNotification();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      if (!email.trim() || !password.trim()) {
        showToast('Required Fields', 'Please enter your corporate email and password.', 'warning');
        return;
      }
      const res = await loginWithEmail(email, password);
      if (res.success) {
        showToast('Authenticated', 'Welcome to Customer & Operations Portal.', 'success');
        onClose();
        if (onSuccess) onSuccess();
      }
    } else if (mode === 'register') {
      if (!name.trim() || !email.trim() || !company.trim() || !password.trim()) {
        showToast('Required Fields', 'Please fill in all mandatory registration fields.', 'warning');
        return;
      }
      const res = await register({ name, email, company, phone, password });
      if (res.success) {
        showToast('Account Initialized', 'Enterprise account initialized successfully.', 'success');
        onClose();
        if (onSuccess) onSuccess();
      }
    } else if (mode === 'forgot') {
      if (!email.trim()) {
        showToast('Email Required', 'Please provide your registered corporate email.', 'warning');
        return;
      }
      const res = await resetPassword(email);
      showToast('Dispatch Confirmed', res.message || 'Check your corporate inbox.', 'info');
      setMode('login');
    }
  };

  const handleGoogleLogin = async () => {
    const res = await loginWithGoogle();
    if (res.success) {
      showToast('Google Sign-In', 'Authenticated via Enterprise Google Identity.', 'success');
      onClose();
      if (onSuccess) onSuccess();
    }
  };

  const handleRoleLogin = (role: UserRole) => {
    loginAsDemoRole(role);
    showToast('Role Switched', `Active session configured as '${role.toUpperCase()}' profile.`, 'success');
    onClose();
    if (onSuccess) onSuccess();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            className="relative w-full max-w-md rounded-3xl bg-[#0d1322] border border-slate-800 shadow-2xl overflow-hidden z-10 my-8 text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-slate-800 bg-slate-900/90">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {mode === 'login' && 'Enterprise Portal Login'}
                    {mode === 'register' && 'Create Organization Account'}
                    {mode === 'forgot' && 'Reset Access Credentials'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Identity & License Management</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-7 space-y-5">
              {/* Development-Only Role Switcher */}
              {isDemoModeActive && demoProfiles && mode === 'login' && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-300 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Role Quick Switcher</span>
                    </span>
                    <TechBadge variant="amber" size="sm">
                      5 Roles
                    </TechBadge>
                  </div>
                  <p className="text-[11px] text-amber-200/80">
                    Select a profile to experience role-based controls.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
                    {(['customer', 'sales', 'support', 'admin', 'superadmin'] as UserRole[]).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handleRoleLogin(role)}
                        className="py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left transition-colors cursor-pointer group shadow-2xs"
                      >
                        <div className="text-xs font-bold text-white capitalize group-hover:text-amber-400">
                          {role}
                        </div>
                        <div className="text-[10px] text-slate-400 font-normal truncate">
                          {role === 'superadmin' ? 'CISO Director' : role === 'admin' ? 'Operations' : role}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Google Sign-In */}
              {mode !== 'forgot' && (
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full py-3 px-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold border border-slate-700 flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-2xs hover:border-slate-600 active:scale-98"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Continue with SSO (Google)</span>
                </button>
              )}

              {mode !== 'forgot' && (
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-slate-800 w-full" />
                  <span className="bg-[#0d1322] px-3 text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                    or with email
                  </span>
                  <div className="border-t border-slate-800 w-full" />
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Contact Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Rachel Jenkins"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Company / Organization *</label>
                      <div className="relative">
                        <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. Enterprise Global Corp"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Corporate Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-normal"
                    />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-300">Password *</label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => setMode('forgot')}
                          className="text-[11px] text-amber-400 hover:underline cursor-pointer font-bold"
                        >
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-amber-500/20 mt-2 active:scale-98"
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>
                        {mode === 'login' && 'Sign In to Portal'}
                        {mode === 'register' && 'Register Organization Account'}
                        {mode === 'forgot' && 'Send Password Reset Email'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Mode Toggle Footer */}
              <div className="pt-2 text-center text-xs text-slate-400 font-normal">
                {mode === 'login' && (
                  <p>
                    Don’t have an account yet?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="text-amber-400 font-bold hover:underline cursor-pointer"
                    >
                      Register here
                    </button>
                  </p>
                )}
                {mode === 'register' && (
                  <p>
                    Already have enterprise credentials?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-amber-400 font-bold hover:underline cursor-pointer"
                    >
                      Sign in
                    </button>
                  </p>
                )}
                {mode === 'forgot' && (
                  <p>
                    Remember your credentials?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-amber-400 font-bold hover:underline cursor-pointer"
                    >
                      Back to Sign In
                    </button>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
