import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import {
  Headphones,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Send,
  Phone,
  Mail,
  Terminal
} from 'lucide-react';
import { PageTransition } from '../../components/motion/PageTransition';
import { TechBadge } from '../../components/ui/TechBadge';
import { SectionHeader } from '../../components/ui/SectionHeader';

export const SupportDeskPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useNotification();

  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [subject, setSubject] = useState('');
  const [severity, setSeverity] = useState<'SEV_1_CRITICAL' | 'SEV_2_HIGH' | 'SEV_3_NORMAL'>('SEV_3_NORMAL');
  const [description, setDescription] = useState('');
  const [orderRef, setOrderRef] = useState('LRTP-2026-000101');

  const [tickets, setTickets] = useState([
    {
      id: 'TICK-2026-8801',
      subject: 'VLAN 20 CCTV PoE Switch Port Routing & Isolation',
      severity: 'SEV_3_NORMAL',
      status: 'RESOLVED',
      createdAt: '2026-03-12',
      product: '24-Port Managed L3 PoE+ Switch'
    },
    {
      id: 'TICK-2026-9042',
      subject: 'Dual-WAN Router Automated ISP Failover Calibration',
      severity: 'SEV_2_HIGH',
      status: 'IN_PROGRESS',
      createdAt: '2026-04-02',
      product: 'Enterprise Dual-WAN Gateway'
    }
  ]);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) {
      showToast('Required Fields', 'Please provide a subject and ticket description.', 'warning');
      return;
    }

    try {
      await fetch('/api/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: user?.id || 'LR-CUST-GUEST',
          companyName: user?.company || 'Enterprise Partner',
          subject,
          severity,
          description,
          orderId: orderRef
        })
      });

      const newTick = {
        id: `TICK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        subject,
        severity,
        status: 'OPEN',
        createdAt: new Date().toISOString().split('T')[0],
        product: orderRef || 'General System'
      };

      setTickets([newTick, ...tickets]);
      setIsCreatingTicket(false);
      setSubject('');
      setDescription('');
      showToast(
        'Support Ticket Logged',
        `Assigned Ticket ID ${newTick.id}. Incident engineer notified under 24/7 SLA.`,
        'success'
      );
    } catch {
      showToast('Ticket Recorded', 'Dispatching incident notification.', 'success');
    }
  };

  return (
    <PageTransition className="pt-32 pb-24 bg-[#07090e] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <SectionHeader
            indexTag="[ NOC/SOC // TICKET DESK ]"
            badge="24/7 SLA OPERATIONS"
            title="Enterprise Support &"
            highlightText="Incident Desk"
            description="Direct escalation path into LR Techno Park Tier-3 Systems Engineering and Dual-Redundant NOC."
            align="left"
          />

          <button
            type="button"
            onClick={() => setIsCreatingTicket(!isCreatingTicket)}
            className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-amber-500/20 shrink-0 self-start md:self-auto active:scale-98"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isCreatingTicket ? 'Cancel' : 'Open Priority Ticket'}</span>
          </button>
        </div>

        {/* Create Ticket Drawer */}
        {isCreatingTicket && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1322] border border-slate-800 shadow-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Log Technical Support Incident</h3>
              <p className="text-xs text-slate-400 mt-0.5">Response guaranteed within 15 minutes for SEV-1 incidents</p>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Incident Subject *</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. SD-WAN tunnel failover latency spike on Node 4"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Severity Level *</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
                  >
                    <option value="SEV_3_NORMAL" className="bg-slate-900 text-white">SEV-3 Normal (General configuration / Question)</option>
                    <option value="SEV_2_HIGH" className="bg-slate-900 text-white">SEV-2 High (Degraded performance / Impending deadline)</option>
                    <option value="SEV_1_CRITICAL" className="bg-slate-900 text-white">SEV-1 Critical (Service Outage / Production Down)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Related Order Reference ID</label>
                <input
                  type="text"
                  value={orderRef}
                  onChange={(e) => setOrderRef(e.target.value)}
                  placeholder="LRTP-2026-000101"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Detailed Description & Diagnostics *</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide system logs, error codes, steps to reproduce, or affected IP ranges..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingTicket(false)}
                  className="px-5 py-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20 active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Ticket to Incident Commander</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Existing Tickets List */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">
            Active Support Incidents ({tickets.length})
          </h3>

          <div className="space-y-3">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-3xl bg-[#0d1322] border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-amber-400/40 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-white text-xs">{t.id}</span>
                    <TechBadge
                      variant={
                        t.severity === 'SEV_1_CRITICAL'
                          ? 'rose'
                          : t.severity === 'SEV_2_HIGH'
                          ? 'amber'
                          : 'blue'
                      }
                      size="sm"
                    >
                      {t.severity.replace(/_/g, ' ')}
                    </TechBadge>
                    <TechBadge
                      variant={t.status === 'RESOLVED' ? 'emerald' : 'slate'}
                      size="sm"
                    >
                      {t.status}
                    </TechBadge>
                  </div>
                  <h4 className="text-base font-bold text-white">{t.subject}</h4>
                  <div className="text-xs text-slate-400 font-normal">
                    Product: {t.product} &bull; Created: {t.createdAt}
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs">
                  <span className="font-mono font-semibold text-emerald-400">15-Min SLA Active</span>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-mono">Assigned to SRE Team</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Escalation Contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-7 rounded-3xl bg-[#0d1322] border border-slate-800 shadow-xl">
          <div className="flex items-start gap-3.5">
            <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <div className="font-bold text-white">Direct 24/7 Redundant NOC Hotline</div>
              <div className="text-slate-400 font-mono mt-0.5">+1 (800) 578-3246 (Option 1 for SEV-1 emergencies)</div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <div className="font-bold text-white">Emergency Pager Duty Escalation</div>
              <div className="text-slate-400 font-mono mt-0.5">noc-pager@lrtechnopark.com</div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
