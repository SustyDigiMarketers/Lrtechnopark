import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import {
  Layers,
  Network,
  Code2,
  Cloud,
  ShieldCheck,
  Headphones,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Shield,
  Wifi,
  Calendar,
  Clock,
  MapPin,
  X,
  Send
} from 'lucide-react';
import { PageTransition } from '../components/motion/PageTransition';
import { SectionHeader } from '../components/ui/SectionHeader';
import { TechBadge } from '../components/ui/TechBadge';
import { useNotification } from '../context/NotificationContext';

interface ServicesPageProps {
  initialCategory?: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenContact: (serviceName?: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Shield,
  Network,
  ShieldCheck,
  Wifi,
  Layers,
  Headphones,
  Sparkles
};

export const ServicesPage: React.FC<ServicesPageProps> = ({
  initialCategory,
  onNavigate,
  onOpenContact
}) => {
  const { showToast } = useNotification();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('Firewall');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<{ id: string; service: string } | null>(null);

  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    company: '',
    email: '',
    phone: '',
    service: 'Firewall & Network Security',
    preferredDate: '',
    preferredTime: '10:00 AM - 01:00 PM',
    location: '',
    requirements: ''
  });

  const handleOpenBooking = (serviceName: string) => {
    setSelectedService(serviceName);
    setBookingForm((prev) => ({
      ...prev,
      service: serviceName
    }));
    setBookingConfirmed(null);
    setBookingModalOpen(true);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && bookingModalOpen) {
        setBookingModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bookingModalOpen]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.customerName || !bookingForm.email || !bookingForm.phone || !bookingForm.preferredDate || !bookingForm.location) {
      showToast('Required Fields', 'Please fill in name, email, phone, preferred date, and location.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/service-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingForm)
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        setBookingConfirmed({
          id: resData.bookingId || resData.data?.bookingId || 'LRTP-SVC-2026-CONFIRMED',
          service: bookingForm.service
        });
        showToast(
          'Service Scheduled',
          `Booking ${resData.bookingId || ''} confirmed and dispatched to Service Bookings Google Sheet.`,
          'success'
        );
      } else {
        showToast(
          'Booking Failed',
          'Submission failed. Please try again or contact our team directly.',
          'error'
        );
      }
    } catch (err) {
      showToast(
        'Booking Failed',
        'Submission failed. Please try again or contact our team directly.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition className="pt-32 pb-24 bg-[#07090e] min-h-screen text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <SectionHeader
          indexTag="[ SERVICES // 2026 ]"
          badge="MANAGED IT & INFRASTRUCTURE"
          title="Infrastructure & Deployment Services."
          highlightText=""
          description="End-to-end installation, structured cabling, surveillance systems, and 24/7 SLA-backed managed network engineering."
        />
      </div>

      {/* Services List with Rich Frameworks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {servicesData.map((service, index) => {
          const Icon = ICON_MAP[service.icon] || Layers;
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={service.id}
              id={service.slug}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl bg-[#0d1322] border border-slate-800 shadow-xl hover:shadow-2xl hover:border-amber-500/50 transition-all"
            >
              {/* Service Info (7 cols) */}
              <div
                className={`space-y-6 ${
                  isReversed ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-amber-400 tracking-wider">
                      SERVICE PRACTICE 0{index + 1}
                    </span>
                    <h2 className="text-2xl font-black text-white">{service.name}</h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {service.shortDescription}
                </p>

                {/* Capabilities */}
                <div className="space-y-2.5">
                  <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold font-mono">
                    CORE DELIVERABLES & SERVICE HIGHLIGHTS
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {service.capabilities.map((cap, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-slate-200 font-semibold">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-xs text-slate-400 font-mono">Hardware & Tech:</span>
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 text-[11px] font-mono border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenBooking(service.name)}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-amber-500/20 active:scale-98"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book {service.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenContact(service.name)}
                    className="px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Request Custom Scope Quote</span>
                  </button>
                </div>
              </div>

              {/* Delivery Steps Blueprint (5 cols) */}
              <div
                className={`space-y-3 ${
                  isReversed ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5'
                }`}
              >
                <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      DELIVERY METHODOLOGY
                    </span>
                    <TechBadge variant="blue" size="sm">
                      CERTIFIED ENGINEERS
                    </TechBadge>
                  </div>

                  <div className="space-y-3">
                    {service.processSteps.map((step) => (
                      <div key={step.stepNumber} className="flex items-start gap-3 text-xs">
                        <div className="w-7 h-7 rounded-xl bg-slate-950 border border-amber-400/30 flex items-center justify-center text-[11px] font-bold text-amber-400 shrink-0 shadow-xs font-mono">
                          {step.stepNumber}
                        </div>
                        <div>
                          <div className="font-bold text-white">{step.phase}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                            {step.outcome}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Service Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-[#0d1322] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingConfirmed ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Service Booking Confirmed
                </h3>
                <div className="inline-block px-3 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full font-mono text-xs font-bold text-amber-400">
                  Booking Reference: {bookingConfirmed.id}
                </div>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Your booking for <strong className="text-white">{bookingConfirmed.service}</strong> has been logged and synced to our service operations pipeline. A certified field engineer will contact you prior to arrival.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBookingModalOpen(false);
                    setBookingConfirmed(null);
                  }}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-bold shadow-md cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <TechBadge variant="blue" size="sm">
                    SERVICE DISPATCH
                  </TechBadge>
                  <h3 className="text-xl font-bold text-white mt-2">
                    Schedule On-Site Service & Deployment
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Book certified technicians for installation, configuration, and testing.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingForm.customerName}
                      onChange={(e) => setBookingForm({ ...bookingForm, customerName: e.target.value })}
                      placeholder="e.g. Anand Kumar"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Company / Facility Name
                    </label>
                    <input
                      type="text"
                      value={bookingForm.company}
                      onChange={(e) => setBookingForm({ ...bookingForm, company: e.target.value })}
                      placeholder="e.g. Apex Tech Park"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      placeholder="anand@apex.example"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      placeholder="+91 98400 12345"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Select Service Category *
                  </label>
                  <select
                    value={bookingForm.service}
                    onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Firewall & Network Security">Firewall & Network Security</option>
                    <option value="Networking & Infrastructure">Networking & Infrastructure</option>
                    <option value="CCTV Cameras & Surveillance Systems">CCTV Cameras & Surveillance Systems</option>
                    <option value="WiFi & Hotspot Solutions">WiFi & Hotspot Solutions</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingForm.preferredDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Preferred Time Window
                    </label>
                    <select
                      value={bookingForm.preferredTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, preferredTime: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM (Morning Slot)</option>
                      <option value="12:00 PM - 03:00 PM">12:00 PM - 03:00 PM (Afternoon Slot)</option>
                      <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM (Evening Slot)</option>
                      <option value="Flexible / Full Day">Flexible / Full Day Site Visit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Site Location Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.location}
                    onChange={(e) => setBookingForm({ ...bookingForm, location: e.target.value })}
                    placeholder="Floor / Building / Tech Park / City"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Requirements & Equipment Details
                  </label>
                  <textarea
                    rows={3}
                    value={bookingForm.requirements}
                    onChange={(e) => setBookingForm({ ...bookingForm, requirements: e.target.value })}
                    placeholder="Describe specific devices, port counts, camera locations, or cable run details..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-98"
                >
                  {isSubmitting ? (
                    <span>Registering Service Booking...</span>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Confirm & Schedule Service Booking</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </PageTransition>
  );
};
