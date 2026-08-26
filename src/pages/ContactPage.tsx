import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ShieldCheck, CheckCircle2, Headphones, Terminal } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { PageTransition } from '../components/motion/PageTransition';
import { SectionHeader } from '../components/ui/SectionHeader';
import { TechBadge } from '../components/ui/TechBadge';

export const ContactPage: React.FC<{ initialSubject?: string }> = ({
  initialSubject = ''
}) => {
  const { showToast } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    topic: initialSubject
      ? `Inquiry regarding ${initialSubject}`
      : 'Computer Hardware & Network Infrastructure Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast(
        'Missing Fields',
        'Please provide your name, email, and inquiry details.',
        'warning'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: formData.topic,
          serviceInterest: formData.topic,
          message: formData.message
        })
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        setIsSuccess(true);
        setSubmittedEnquiryId(resData.enquiryId || resData.data?.enquiryId || 'LRTP-CON-2026-CONFIRMED');
        showToast(
          'Inquiry Transmitted',
          `Your enquiry (${resData.enquiryId || 'Logged'}) has been logged and synced to Google Sheets.`,
          'success'
        );
      } else {
        showToast(
          'Submission Failed',
          'Submission failed. Please try again or contact our team directly.',
          'error'
        );
      }
    } catch (err) {
      showToast(
        'Submission Failed',
        'Submission failed. Please try again or contact our team directly.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition className="pt-32 pb-24 bg-[#fafbff] min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <SectionHeader
          indexTag="[ ADVISORY // 2026 ]"
          badge="IT SOLUTIONS & HARDWARE DESK"
          title="Connect with Solutions"
          highlightText="Architects & Engineers"
          description="Whether you need physical computer hardware, firewall deployment, CCTV surveillance setups, or high-density campus WiFi infrastructure."
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Left Column: Direct Telemetry & Locations (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900">
                Direct Enterprise Communications
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">
                      Technical Hotline & Onsite Dispatch
                    </div>
                    <div className="text-slate-600 font-mono mt-0.5">
                      +1 (800) 578-3246 / +91 98400 12345
                    </div>
                    <div className="text-[10px] text-emerald-600 font-mono font-semibold mt-1">
                      Guaranteed &lt; 2 business hours response
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Mail className="w-4 h-4 text-[#1a56db] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">
                      Procurement & Hardware Quotes
                    </div>
                    <div className="text-slate-600 font-mono mt-0.5">
                      sales@lrtechnopark.com
                    </div>
                    <div className="text-[10px] text-blue-600 font-mono font-semibold mt-1">
                      Direct quote & GST invoice verification
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">
                      Corporate Headquarters & Hardware Hub
                    </div>
                    <div className="text-slate-600 mt-0.5 leading-relaxed">
                      LR Techno Park Complex, IT Corridor, Sector 4, Silicon Avenue
                    </div>
                  </div>
                </div>
              </div>

              {/* SLA Guarantee Box */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-3 text-xs text-blue-900">
                <ShieldCheck className="w-5 h-5 text-[#1a56db] shrink-0" />
                <span className="font-normal">
                  All enterprise communications and quotes are recorded with strict data privacy and logged to Google Sheets for immediate response tracking.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Inquiry Successfully Logged & Dispatched
                  </h3>
                  <div className="inline-block px-3 py-1 bg-slate-100 border border-slate-200 rounded-full font-mono text-xs font-bold text-[#1a56db]">
                    Enquiry ID: {submittedEnquiryId}
                  </div>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.name}</strong>. A
                    dedicated Senior Solutions Architect has been assigned to your
                    enquiry and will contact you within 2 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setSubmittedEnquiryId('');
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        topic: 'Computer Hardware & Network Infrastructure Inquiry',
                        message: ''
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 mb-4">
                    <h3 className="text-xl font-bold text-slate-900">
                      Request IT Solutions & Hardware Quote
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Directly connect with solutions engineering leads
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Rachel Jenkins"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1a56db] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Corporate Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="rachel.jenkins@company.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1a56db] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Company / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="e.g. Apex Global Systems"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1a56db] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1a56db] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Solution / Service Domain *
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) =>
                        setFormData({ ...formData, topic: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#1a56db] focus:bg-white"
                    >
                      <option>Computer Hardware Procurement & Workstations</option>
                      <option>Firewall & Network Security Deployment</option>
                      <option>Structured Cabling & Switching Infrastructure</option>
                      <option>CCTV Surveillance Systems & Storage</option>
                      <option>Campus High-Density WiFi & Hotspot Solutions</option>
                      <option>Comprehensive Annual Maintenance Contract (AMC)</option>
                      <option>Bulk Enterprise IT Hardware Purchase</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Requirements & Site Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Please describe the quantities required, office/facility layout, current network devices, or requested installation timeline..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1a56db] focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#1a56db] hover:bg-[#1545b3] disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/25 active:scale-98"
                  >
                    {isSubmitting ? (
                      <span>Dispatching to Solutions Architecture...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Enterprise Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
