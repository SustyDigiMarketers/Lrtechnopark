import React from 'react';
import { leadershipTeam, companyCertifications } from '../data/companyData';
import { ShieldCheck, ArrowRight, Cpu, Network, Shield, Wifi, CheckCircle2, Award, Users } from 'lucide-react';
import { PageTransition } from '../components/motion/PageTransition';
import { SectionHeader } from '../components/ui/SectionHeader';
import { TechBadge } from '../components/ui/TechBadge';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerContainer';

export const AboutPage: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  return (
    <PageTransition className="pt-32 pb-24 bg-[#050607] min-h-screen text-[#f5f6f7]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <SectionHeader
          indexTag="[ COMPANY // 2026 ]"
          badge="ABOUT LR TECHNO PARK"
          title="Enterprise IT Infrastructure."
          highlightText=""
          description="We provide commercial computer hardware, structured network cabling, next-gen firewalls, and enterprise CCTV systems for modern organizations."
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Who We Are & What We Do */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Who We Are (5 cols) */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-[#0b0e12] border border-slate-800 shadow-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11161b] border border-slate-700/60 text-[#f4b72d] text-xs font-mono font-medium">
              <span>WHO WE ARE</span>
            </div>
            <h2 className="text-2xl font-bold text-[#f5f6f7] leading-snug">
              Reliable Technology Partner for Growing Businesses
            </h2>
            <p className="text-sm text-[#9ca5ae] leading-relaxed font-normal">
              LR Techno Park is an enterprise IT infrastructure provider. We specialize in physical hardware procurement, structured network deployments, managed perimeter security, and 24/7 technical maintenance to keep organizations running without interruption.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f4b72d] hover:bg-[#ffd76a] text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-md shadow-[#f4b72d]/15 active:scale-98"
              >
                <span>Talk to Our Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* What We Do (7 cols) - 4 Clear Categories */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11161b] border border-slate-800 text-slate-300 text-xs font-mono">
                <span>WHAT WE DO</span>
              </div>
              <span className="text-xs text-[#9ca5ae] font-mono">4 Core Domains</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-[#0b0e12] border border-slate-800 shadow-xl space-y-2 hover:border-[#f4b72d]/50 transition-colors">
                <div className="w-10 h-10 rounded-2xl bg-[#11161b] border border-slate-700/60 text-[#f4b72d] flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#f5f6f7]">Computer Hardware</h3>
                <p className="text-xs text-[#9ca5ae] leading-relaxed">
                  Commercial desktop PCs, CAD engineering workstations, server towers, and enterprise laptops.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#0b0e12] border border-slate-800 shadow-xl space-y-2 hover:border-[#f4b72d]/50 transition-colors">
                <div className="w-10 h-10 rounded-2xl bg-[#11161b] border border-slate-700/60 text-[#f4b72d] flex items-center justify-center">
                  <Network className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#f5f6f7]">Networking</h3>
                <p className="text-xs text-[#9ca5ae] leading-relaxed">
                  Structured Cat6/fiber cabling, server rack dress-up, managed L2/L3 switches, and routers.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#0b0e12] border border-slate-800 shadow-xl space-y-2 hover:border-[#f4b72d]/50 transition-colors">
                <div className="w-10 h-10 rounded-2xl bg-[#11161b] border border-slate-700/60 text-[#f4b72d] flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#f5f6f7]">CCTV Cameras</h3>
                <p className="text-xs text-[#9ca5ae] leading-relaxed">
                  4K AI surveillance cameras, NVR storage matrix, night-vision perimeter security, and remote view.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#0b0e12] border border-slate-800 shadow-xl space-y-2 hover:border-[#f4b72d]/50 transition-colors">
                <div className="w-10 h-10 rounded-2xl bg-[#11161b] border border-slate-700/60 text-[#f4b72d] flex items-center justify-center">
                  <Wifi className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#f5f6f7]">WiFi & Firewalls</h3>
                <p className="text-xs text-[#9ca5ae] leading-relaxed">
                  High-density enterprise Wi-Fi 6/7 coverage, Next-Gen Firewall UTM policies, and VPN gateways.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why LR Techno Park - 4 Strong Points */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0b0e12] border border-slate-800 shadow-xl space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11161b] border border-slate-700/60 text-[#f4b72d] text-xs font-mono font-medium">
              <span>WHY LR TECHNO PARK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f6f7]">
              Engineered for Real-World Reliability
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#11161b] border border-slate-800 space-y-2.5 hover:border-[#f4b72d]/50 transition-colors">
              <div className="text-lg font-bold font-mono text-[#f4b72d]">01</div>
              <h3 className="text-base font-bold text-[#f5f6f7]">Reliable Infrastructure</h3>
              <p className="text-xs text-[#9ca5ae] leading-relaxed">
                Commercial-grade components and certified structured cabling tested with Fluke calibration instruments.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#11161b] border border-slate-800 space-y-2.5 hover:border-[#f4b72d]/50 transition-colors">
              <div className="text-lg font-bold font-mono text-[#f4b72d]">02</div>
              <h3 className="text-base font-bold text-[#f5f6f7]">Practical Solutions</h3>
              <p className="text-xs text-[#9ca5ae] leading-relaxed">
                Right-sized hardware and network architectures tailored to your facility without bloated costs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#11161b] border border-slate-800 space-y-2.5 hover:border-[#f4b72d]/50 transition-colors">
              <div className="text-lg font-bold font-mono text-[#f4b72d]">03</div>
              <h3 className="text-base font-bold text-[#f5f6f7]">Fast Support</h3>
              <p className="text-xs text-[#9ca5ae] leading-relaxed">
                Guaranteed rapid response SLAs with on-site technician dispatch and direct spare parts replacement.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#11161b] border border-slate-800 space-y-2.5 hover:border-[#f4b72d]/50 transition-colors">
              <div className="text-lg font-bold font-mono text-[#f4b72d]">04</div>
              <h3 className="text-base font-bold text-[#f5f6f7]">Scalable Technology</h3>
              <p className="text-xs text-[#9ca5ae] leading-relaxed">
                Modular server racks and multi-gigabit backbones that expand seamlessly as your headcount grows.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership & Team */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#f5f6f7]">Leadership Team</h2>
              <p className="text-xs text-[#9ca5ae]">Industry engineers with decades of hands-on deployment experience.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipTeam.map((leader, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-[#0b0e12] border border-slate-800 shadow-xl flex flex-col justify-between space-y-3 hover:border-[#f4b72d]/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#11161b] border border-slate-700/60 text-[#f4b72d] flex items-center justify-center font-bold text-sm font-mono">
                    {leader.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#f5f6f7]">{leader.name}</h4>
                    <div className="text-xs font-semibold text-[#f4b72d]">{leader.role}</div>
                  </div>
                  <p className="text-xs text-[#9ca5ae] leading-relaxed pt-1">{leader.bio}</p>
                </div>
                <div className="text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800">
                  {leader.expertise}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications and Compliance */}
        <div className="p-8 rounded-3xl bg-[#0b0e12] border border-slate-800 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-6 space-y-1">
            <h3 className="text-base font-bold text-[#f5f6f7]">
              Certifications & Standards Compliance
            </h3>
            <p className="text-xs text-[#9ca5ae]">
              Enterprise standards governing our hardware supply chain and network installations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {companyCertifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#11161b] border border-slate-800 space-y-1"
              >
                <div className="font-bold text-xs text-[#f5f6f7]">{cert.name}</div>
                <div className="text-[10px] text-slate-400 font-mono">{cert.issuer} &bull; {cert.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
