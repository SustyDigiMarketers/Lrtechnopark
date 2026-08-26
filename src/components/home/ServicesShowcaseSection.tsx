import React from 'react';
import { servicesData } from '../../data/servicesData';
import {
  ShieldCheck,
  Network,
  Shield,
  Wifi,
  ArrowRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { TechBadge } from '../ui/TechBadge';
import { StaggerContainer, StaggerItem } from '../motion/StaggerContainer';

interface ServicesShowcaseSectionProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenContactWithService: (serviceName: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck,
  Network,
  Shield,
  Wifi
};

const SERVICE_SUMMARIES: Record<string, { tag: string; headline: string; summary: string }> = {
  'firewall': {
    tag: 'MANAGED SECURITY',
    headline: 'Protect your network with managed security.',
    summary: 'Perimeter firewall installation, VPN hardening, UTM rulesets, and 24/7 security monitoring.'
  },
  'networking': {
    tag: 'INFRASTRUCTURE',
    headline: 'Build a faster, more reliable network.',
    summary: 'Structured Cat6/fiber cabling, managed rack assembly, switching, and routing architecture.'
  },
  'cctv': {
    tag: 'SURVEILLANCE',
    headline: 'See more. Secure better.',
    summary: 'High-definition 4K surveillance, AI night-vision cameras, NVR storage arrays, and mobile monitoring.'
  },
  'wifi': {
    tag: 'CONNECTIVITY',
    headline: 'Reliable connectivity across your space.',
    summary: 'High-density commercial Wi-Fi 6/7, seamless roaming, guest hotspots, and bandwidth management.'
  }
};

export const ServicesShowcaseSection: React.FC<ServicesShowcaseSectionProps> = ({
  onNavigate,
  onOpenContactWithService
}) => {
  return (
    <section className="py-24 sm:py-32 bg-white border-t border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          indexTag="[ 02 // MANAGED SERVICES ]"
          badge="IT INFRASTRUCTURE & ENGINEERING"
          title="Infrastructure Services."
          highlightText=""
          description="End-to-end IT deployment, network engineering, and 24/7 technical maintenance for modern commercial facilities."
          className="mb-16"
        />

        {/* 4 Clean High-Impact Service Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.slice(0, 4).map((srv) => {
            const IconComponent = ICON_MAP[srv.icon] || ShieldCheck;
            const meta = SERVICE_SUMMARIES[srv.slug] || {
              tag: 'MANAGED SERVICE',
              headline: srv.name,
              summary: srv.shortDescription
            };

            return (
              <StaggerItem key={srv.id}>
                <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-blue-500/50 hover:bg-white transition-all duration-300 flex flex-col justify-between h-full shadow-xs hover:shadow-xl group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1a56db] group-hover:scale-105 transition-transform shadow-xs">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <TechBadge variant="slate" size="sm">
                        {meta.tag}
                      </TechBadge>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1a56db] transition-colors leading-snug">
                        {srv.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#1a56db] mt-1">
                        {meta.headline}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {meta.summary}
                    </p>

                    {/* Key capabilities pill list */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                      {srv.capabilities.slice(0, 3).map((cap, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200/60 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigate('services', srv.slug)}
                      className="w-full py-2.5 px-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenContactWithService(srv.name)}
                      className="w-full py-2 px-4 rounded-full bg-transparent hover:bg-slate-200/60 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors cursor-pointer text-center"
                    >
                      Book Consultation
                    </button>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
