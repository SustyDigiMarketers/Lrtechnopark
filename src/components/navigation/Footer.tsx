import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenTracker
}) => {
  return (
    <footer className="bg-[#05070a] border-t border-slate-800 text-slate-400 text-sm">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Col 1: Brand & Statement (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#0d1322] border border-amber-500/30 flex items-center justify-center text-white shadow-md group-hover:border-amber-400 transition-colors">
                <div className="text-xs font-black tracking-tighter text-amber-400 font-mono">
                  LR
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-white leading-none">
                  LR TECHNOPARK
                </span>
                <span className="text-[10px] font-mono tracking-widest text-amber-400/80 uppercase leading-tight mt-1">
                  IT INFRASTRUCTURE & HARDWARE
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-normal">
              Enterprise computer hardware, high-throughput networking, next-gen firewalls, and CCTV surveillance systems built for continuous operations.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-amber-400/90 font-mono">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Certified IT Solutions & GST Invoicing</span>
            </div>
          </div>

          {/* Col 2: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services', 'firewall')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Firewall Solutions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services', 'networking')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Enterprise Networking
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services', 'cctv')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  CCTV Surveillance
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services', 'wifi')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  WiFi & High-Density Hotspots
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('products')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Products Catalog
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('blogs')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Blogs & Insights
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500">Email</div>
                  <a
                    href="mailto:sales@lrtechnopark.com"
                    className="text-slate-300 hover:text-amber-400 transition-colors"
                  >
                    sales@lrtechnopark.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500">Phone</div>
                  <span className="text-slate-300 font-mono">
                    +1 (800) 578-3246 / +91 98400 12345
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500">Location</div>
                  <span className="text-slate-300 leading-snug">
                    LR Techno Park Complex, IT Corridor, Sector 4, Silicon Avenue
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Privacy, Terms */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} LR Techno Park. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="hover:text-amber-400 transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

