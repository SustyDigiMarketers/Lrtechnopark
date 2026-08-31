import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { OrderProvider } from './context/OrderContext';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';

// Modals
import { OrderTrackerModal } from './components/ui/OrderTrackerModal';
import { AuthModal } from './components/ui/AuthModal';
import { GstInvoiceModal } from './components/ui/GstInvoiceModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BlogsPage } from './pages/BlogsPage';

// Customer Portal Pages
import { CustomerDashboardPage } from './pages/portal/CustomerDashboardPage';
import { OrdersManagementPage } from './pages/portal/OrdersManagementPage';
import { OrderWizardPage } from './pages/portal/OrderWizardPage';
import { SupportDeskPage } from './pages/portal/SupportDeskPage';

import { Product, LicenseType, DeploymentTier, Order } from './types';

// Route Parser Helper
function parsePathToRoute(pathname: string): { view: string; param: string } {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (!clean) return { view: 'home', param: '' };

  const segments = clean.split('/');
  const first = segments[0]?.toLowerCase();
  const second = segments[1] || '';

  if (first === 'products') {
    if (second) return { view: 'product-detail', param: second };
    return { view: 'products', param: '' };
  }
  if (first === 'services') {
    return { view: 'services', param: second || '' };
  }
  if (first === 'about') return { view: 'about', param: '' };
  if (first === 'contact') return { view: 'contact', param: second || '' };
  if (first === 'blogs') return { view: 'blogs', param: '' };

  if (first === 'portal') {
    if (second === 'orders') return { view: 'portal-orders', param: '' };
    if (second === 'order' || second === 'order-new' || second === 'new') return { view: 'portal-order-new', param: '' };
    if (second === 'support') return { view: 'portal-support', param: '' };
    return { view: 'portal-dashboard', param: '' };
  }

  return { view: 'home', param: '' };
}

function routeToPath(view: string, param?: string): string {
  switch (view) {
    case 'home':
      return '/';
    case 'products':
      return '/products';
    case 'product-detail':
      return param ? `/products/${encodeURIComponent(param)}` : '/products';
    case 'services':
      return param ? `/services/${encodeURIComponent(param)}` : '/services';
    case 'about':
      return '/about';
    case 'contact':
      return param ? `/contact?subject=${encodeURIComponent(param)}` : '/contact';
    case 'blogs':
      return '/blogs';
    case 'portal-dashboard':
      return '/portal';
    case 'portal-orders':
      return '/portal/orders';
    case 'portal-order-new':
      return '/portal/order/new';
    case 'portal-support':
      return '/portal/support';
    default:
      return '/';
  }
}

const MainApp: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Navigation State initialized from current browser URL
  const [currentView, setCurrentView] = useState<string>(() => {
    return parsePathToRoute(window.location.pathname).view;
  });
  const [viewParam, setViewParam] = useState<string>(() => {
    return parsePathToRoute(window.location.pathname).param;
  });

  // Modals State
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [trackerOrderId, setTrackerOrderId] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Invoice Modal State
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

  // Pre-filled Order Item from Product page
  const [orderPrefill, setOrderPrefill] = useState<{
    productId: string;
    productName: string;
    productCode: string;
    licenseType: LicenseType;
    deploymentTier: DeploymentTier;
    quantity: number;
    unitPrice: number;
  } | null>(null);

  // Synchronize browser history and deep links
  const handleNavigate = useCallback((view: string, param?: string, replace = false) => {
    setCurrentView(view);
    setViewParam(param || '');
    const targetPath = routeToPath(view, param);

    if (window.location.pathname !== targetPath) {
      if (replace) {
        window.history.replaceState({ view, param }, '', targetPath);
      } else {
        window.history.pushState({ view, param }, '', targetPath);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen for browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parsePathToRoute(window.location.pathname);
      setCurrentView(parsed.view);
      setViewParam(parsed.param);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenTracker = (orderId?: string) => {
    setTrackerOrderId(orderId || '');
    setIsTrackerOpen(true);
  };

  const handleOpenInvoice = (order: Order) => {
    setInvoiceOrder(order);
    setIsInvoiceOpen(true);
  };

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleQuickOrder = (product: Product) => {
    setOrderPrefill({
      productId: product.id,
      productName: product.name,
      productCode: product.code,
      licenseType: 'ANNUAL',
      deploymentTier: 'STANDARD_DELIVERY',
      quantity: 1,
      unitPrice: product.price
    });
    handleNavigate('portal-order-new');
  };

  return (
    <div id="lrtp-app-root" className="min-h-screen bg-[#050607] text-[#f5f6f7] flex flex-col font-sans selection:bg-[#f4b72d] selection:text-slate-950">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenTracker={() => handleOpenTracker()}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content Router */}
      <main id="lrtp-main-viewport" className="flex-1">
        {/* Public Website Views */}
        {currentView === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenTracker={() => handleOpenTracker()}
            onOpenAuth={handleOpenAuth}
            onQuickOrder={handleQuickOrder}
          />
        )}

        {currentView === 'products' && (
          <ProductsPage
            onNavigate={handleNavigate}
            onQuickOrder={handleQuickOrder}
          />
        )}

        {currentView === 'product-detail' && (
          <ProductDetailPage
            slug={viewParam}
            onNavigate={handleNavigate}
            onProceedToOrder={(pref) => {
              setOrderPrefill(pref);
              handleNavigate('portal-order-new');
            }}
          />
        )}

        {currentView === 'services' && (
          <ServicesPage
            initialCategory={viewParam}
            onNavigate={handleNavigate}
            onOpenContact={(srv) => handleNavigate('contact', srv)}
          />
        )}

        {currentView === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentView === 'contact' && (
          <ContactPage initialSubject={viewParam} />
        )}

        {currentView === 'blogs' && (
          <BlogsPage onNavigate={handleNavigate} />
        )}

        {/* Customer Portal Views */}
        {currentView === 'portal-dashboard' && (
          <CustomerDashboardPage
            onNavigate={handleNavigate}
            onOpenTracker={handleOpenTracker}
          />
        )}

        {currentView === 'portal-orders' && (
          <OrdersManagementPage
            onNavigate={handleNavigate}
            onOpenTracker={handleOpenTracker}
            onOpenInvoice={handleOpenInvoice}
          />
        )}

        {currentView === 'portal-order-new' && (
          <OrderWizardPage
            initialPrefill={orderPrefill}
            onNavigate={handleNavigate}
            onOpenTracker={handleOpenTracker}
          />
        )}

        {currentView === 'portal-support' && (
          <SupportDeskPage />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTracker={() => handleOpenTracker()}
      />

      {/* Global Modals */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        initialOrderId={trackerOrderId}
      />

      <GstInvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        order={invoiceOrder}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onSuccess={() => {
          if (currentView === 'home') {
            handleNavigate('portal-dashboard');
          }
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <OrderProvider>
          <MainApp />
        </OrderProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}
