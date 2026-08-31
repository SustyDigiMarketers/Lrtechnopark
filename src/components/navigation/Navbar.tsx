import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import {
  ChevronDown,
  Menu,
  X,
  Search,
  LogIn,
  Package,
  ArrowRight,
  LogOut,
  Sliders,
  Layers,
  Shield,
  Activity,
  Terminal,
  Server,
  Headphones,
  Compass
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { productsData } from '../../data/productsData';
import { servicesData } from '../../data/servicesData';
import { industrySectors } from '../../data/companyData';
import { drawerVariants, modalBackdropVariants } from '../../animations';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenTracker: () => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenTracker,
  onOpenAuth
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [industriesDropdownOpen, setIndustriesDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 24);
    });
  }, [scrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090e]/95 backdrop-blur-md border-b border-slate-800/90 shadow-xl shadow-black/40 py-3'
          : 'bg-[#07090e]/80 backdrop-blur-md border-b border-slate-800/50 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - LR Techno Park */}
        <div
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Engineering Monogram */}
          <div className="relative w-10 h-10 rounded-2xl bg-[#0d1322] border border-amber-500/30 flex items-center justify-center text-white shadow-md shadow-black/50 group-hover:border-amber-400 transition-colors">
            <div className="text-xs font-black tracking-tighter text-amber-400 font-mono">
              LR
            </div>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-tight text-white leading-none">
              LR TECHNO PARK
            </span>
            <span className="text-[10px] font-mono tracking-widest text-amber-400/80 uppercase leading-tight mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              ENTERPRISE PLATFORMS
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-sm font-medium text-slate-300">
          {/* Products Mega Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsDropdownOpen(true)}
            onMouseLeave={() => setProductsDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => onNavigate('products')}
              className={`transition-colors flex items-center gap-1.5 cursor-pointer py-1 hover:text-amber-400 ${
                currentView.startsWith('product') ? 'text-amber-400 font-bold' : ''
              }`}
            >
              <span>Products</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  productsDropdownOpen ? 'rotate-180 text-amber-400' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {productsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full -left-20 w-[540px] p-4 bg-[#0d1322] border border-slate-800 rounded-3xl shadow-2xl z-50 mt-2 grid grid-cols-2 gap-2.5 backdrop-blur-xl"
                >
                  <div className="col-span-2 px-2 pt-1 pb-2 border-b border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      ENGINEERING PRODUCT PLATFORMS
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">
                      SLA BACKED
                    </span>
                  </div>

                  {productsData.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onNavigate('product-detail', product.slug);
                        setProductsDropdownOpen(false);
                      }}
                      className="p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-amber-500/40 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-white text-xs group-hover:text-amber-400 transition-colors line-clamp-1">
                          {product.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                        {product.shortDescription}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span>{product.code}</span>
                        <span className="text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          View Specs <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="col-span-2 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">
                      Ready for automated cloud & edge deployment
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('products');
                        setProductsDropdownOpen(false);
                      }}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className={`transition-colors flex items-center gap-1.5 cursor-pointer py-1 hover:text-amber-400 ${
                currentView === 'services' ? 'text-amber-400 font-bold' : ''
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  servicesDropdownOpen ? 'rotate-180 text-amber-400' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {servicesDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full -left-12 w-[440px] p-3 bg-[#0d1322] border border-slate-800 rounded-3xl shadow-2xl z-50 space-y-1 mt-2 backdrop-blur-xl"
                >
                  <div className="px-3 py-1.5 border-b border-slate-800 text-xs flex justify-between items-center">
                    <span className="font-mono text-[10px] uppercase text-slate-400 font-bold">
                      DELIVERY & INFRASTRUCTURE PRACTICES
                    </span>
                  </div>
                  {servicesData.map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => {
                        onNavigate('services', srv.slug);
                        setServicesDropdownOpen(false);
                      }}
                      className="p-2.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-amber-500/40 transition-colors cursor-pointer group"
                    >
                      <div className="font-bold text-white text-xs group-hover:text-amber-400 transition-colors">
                        {srv.name}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-1">
                        {srv.tagline}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Industries Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIndustriesDropdownOpen(true)}
            onMouseLeave={() => setIndustriesDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                const el = document.getElementById('industries-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="transition-colors flex items-center gap-1.5 cursor-pointer py-1 hover:text-amber-400"
            >
              <span>Industries</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  industriesDropdownOpen ? 'rotate-180 text-amber-400' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {industriesDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 w-72 p-3 bg-[#0d1322] border border-slate-800 rounded-3xl shadow-xl z-50 space-y-1 mt-2 text-xs backdrop-blur-xl"
                >
                  {industrySectors.map((ind) => (
                    <div
                      key={ind.id}
                      onClick={() => {
                        onNavigate('home');
                        setIndustriesDropdownOpen(false);
                        const el = document.getElementById('industries-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-transparent hover:border-amber-500/30 cursor-pointer flex items-center justify-between group"
                    >
                      <span className="font-semibold text-slate-200 group-hover:text-amber-400">
                        {ind.name}
                      </span>
                      <span className="font-mono text-[9px] text-slate-500">{ind.code}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Blogs */}
          <button
            type="button"
            onClick={() => onNavigate('blogs')}
            className={`transition-colors cursor-pointer py-1 hover:text-amber-400 ${
              currentView === 'blogs' ? 'text-amber-400 font-bold' : ''
            }`}
          >
            Blogs
          </button>

          {/* About / Company */}
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className={`transition-colors cursor-pointer py-1 hover:text-amber-400 ${
              currentView === 'about' ? 'text-amber-400 font-bold' : ''
            }`}
          >
            Company
          </button>
        </nav>

        {/* Right Actions: Track Order + Contact + Customer Portal */}
        <div className="flex items-center gap-3">
          {/* Quick Track Order */}
          <button
            type="button"
            onClick={onOpenTracker}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700/80 transition-colors cursor-pointer"
            title="Track Order Status"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span>Track Order</span>
          </button>

          {/* Contact Pill */}
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-amber-500/20 active:scale-98"
          >
            <Headphones className="w-3.5 h-3.5 text-slate-950" />
            <span>Contact</span>
          </button>

          {/* Customer Portal / Auth Session */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs font-bold font-mono">
                  {user.displayName.substring(0, 2).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-slate-200 hidden sm:inline">
                  Portal
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-60 p-2.5 rounded-3xl bg-[#0d1322] border border-slate-800 shadow-2xl z-50 text-xs space-y-1 text-slate-300 backdrop-blur-xl"
                  >
                    <div className="p-2.5 border-b border-slate-800 pb-2 mb-1">
                      <div className="font-bold text-white truncate">{user.displayName}</div>
                      <div className="text-[11px] text-slate-400 truncate">{user.company}</div>
                      <div className="text-[10px] font-mono text-amber-400 mt-1">{user.email}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('portal-dashboard');
                        setUserMenuOpen(false);
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-slate-800 text-left flex items-center gap-2 cursor-pointer font-medium text-slate-200"
                    >
                      <Layers className="w-4 h-4 text-amber-400" />
                      <span>Customer Dashboard</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('portal-orders');
                        setUserMenuOpen(false);
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-slate-800 text-left flex items-center gap-2 cursor-pointer font-medium text-slate-200"
                    >
                      <Package className="w-4 h-4 text-amber-400" />
                      <span>Orders & Licenses</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('portal-order-new');
                        setUserMenuOpen(false);
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-amber-400/10 text-left flex items-center gap-2 cursor-pointer font-bold text-amber-400"
                    >
                      <Sliders className="w-4 h-4 text-amber-400" />
                      <span>Provision New Order</span>
                    </button>

                    <div className="border-t border-slate-800 pt-1 mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full p-2 rounded-xl hover:bg-rose-500/10 text-rose-400 text-left flex items-center gap-2 cursor-pointer font-semibold"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onOpenAuth('login')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white font-semibold text-xs transition-colors cursor-pointer bg-slate-900/50"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-400" />
              <span>Customer Portal</span>
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden fixed inset-x-0 top-full bg-[#07090e] border-b border-slate-800 px-6 py-6 space-y-4 shadow-2xl backdrop-blur-2xl"
          >
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-left text-white font-bold hover:border-amber-500/40"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('products');
                  setMobileMenuOpen(false);
                }}
                className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-left text-white font-bold hover:border-amber-500/40"
              >
                Products
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('services');
                  setMobileMenuOpen(false);
                }}
                className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-left text-white font-bold hover:border-amber-500/40"
              >
                Services
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('about');
                  setMobileMenuOpen(false);
                }}
                className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-left text-white font-bold hover:border-amber-500/40"
              >
                Company
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('blogs');
                  setMobileMenuOpen(false);
                }}
                className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-left text-white font-bold hover:border-amber-500/40"
              >
                Blogs
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('contact');
                  setMobileMenuOpen(false);
                }}
                className="col-span-2 p-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-left text-slate-950 font-bold"
              >
                Contact Solutions Team
              </button>
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  onOpenTracker();
                  setMobileMenuOpen(false);
                }}
                className="p-3 rounded-2xl bg-slate-900 text-slate-300 text-xs font-semibold flex items-center justify-between border border-slate-800"
              >
                <span>Track Order by Reference ID</span>
                <Search className="w-4 h-4 text-amber-400" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (isAuthenticated) {
                    onNavigate('portal-dashboard');
                  } else {
                    onOpenAuth('login');
                  }
                  setMobileMenuOpen(false);
                }}
                className="p-3 rounded-2xl bg-slate-800 text-white text-xs font-bold flex items-center justify-between border border-slate-700"
              >
                <span>{isAuthenticated ? 'Customer Portal' : 'Sign In to Portal'}</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
