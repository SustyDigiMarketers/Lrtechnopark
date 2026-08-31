import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Cpu,
  Activity,
  Database,
  Lock,
  Server,
  Cloud,
  Zap,
  Globe,
  Radio,
  Terminal,
  CheckCircle2
} from 'lucide-react';

interface Node {
  id: string;
  label: string;
  category: 'core' | 'edge' | 'cloud' | 'security';
  icon: React.ElementType;
  x: number; // percentage
  y: number; // percentage
  status: 'optimal' | 'syncing' | 'protected';
  metric: string;
  spec: string;
}

const NODES: Node[] = [
  {
    id: 'n1',
    label: 'Next-Gen Firewall & UTM Core',
    category: 'security',
    icon: Shield,
    x: 50,
    y: 50,
    status: 'protected',
    metric: 'Stateful DPI & IPSec',
    spec: 'Hardware Threat Prevention Engine'
  },
  {
    id: 'n2',
    label: 'Dual-WAN Multi-Gigabit Router',
    category: 'cloud',
    icon: Cloud,
    x: 22,
    y: 24,
    status: 'optimal',
    metric: '99.999% Zero-Downtime',
    spec: 'Automated Dual-ISP Failover & BGP'
  },
  {
    id: 'n3',
    label: 'Enterprise Wi-Fi 7 Access Network',
    category: 'edge',
    icon: Globe,
    x: 78,
    y: 24,
    status: 'optimal',
    metric: 'Gigabit Mesh Roaming',
    spec: 'Seamless 802.11be High-Density'
  },
  {
    id: 'n4',
    label: '4K AI CCTV & NVR Video Matrix',
    category: 'security',
    icon: Lock,
    x: 18,
    y: 76,
    status: 'protected',
    metric: '16-Channel 4K AI Stream',
    spec: 'Continuous RAID Storage & Cloud App'
  },
  {
    id: 'n5',
    label: '10G Managed L3 PoE+ Core Switch',
    category: 'core',
    icon: Server,
    x: 82,
    y: 76,
    status: 'optimal',
    metric: '128 Gbps Switching Fabric',
    spec: 'Cat6A Structured Cabling Backbone'
  },
  {
    id: 'n6',
    label: 'Online Pure Sine Wave UPS Unit',
    category: 'edge',
    icon: Cpu,
    x: 50,
    y: 16,
    status: 'syncing',
    metric: '0ms Transfer Double-Conversion',
    spec: 'Automated Battery & Load Telemetry'
  }
];

const CONNECTIONS = [
  { from: 'n1', to: 'n2' },
  { from: 'n1', to: 'n3' },
  { from: 'n1', to: 'n4' },
  { from: 'n1', to: 'n5' },
  { from: 'n1', to: 'n6' },
  { from: 'n2', to: 'n6' },
  { from: 'n3', to: 'n5' },
  { from: 'n4', to: 'n5' }
];

export const TechnologyVisualizer: React.FC = () => {
  const [activeNode, setActiveNode] = useState<Node>(NODES[0]);
  const [pulseCount, setPulseCount] = useState(1482);
  const [liveThroughput, setLiveThroughput] = useState(48.6);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount((p) => p + 1);
      setLiveThroughput(+(46 + Math.random() * 6).toFixed(1));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-3xl bg-[#090d18] border border-slate-800 overflow-hidden shadow-2xl p-5 sm:p-7 flex flex-col justify-between select-none text-white">
      {/* Precision Background Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #f59e0b 1px, transparent 1px), linear-gradient(to bottom, #f59e0b 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Atmospheric Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Telemetry Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-200">
              LR ZERO-TRUST TELEMETRY FABRIC
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30">
              ACTIVE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-800">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>
              Bandwidth: <strong className="text-amber-300">{liveThroughput} Gbps</strong>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-800">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>
              Uptime SLA: <strong className="text-emerald-400">99.995%</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Central Interactive Neural Mesh Canvas */}
      <div className="relative w-full h-[320px] sm:h-[380px] my-4">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.4" />
            </linearGradient>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {CONNECTIONS.map((c, i) => {
            const source = NODES.find((n) => n.id === c.from)!;
            const target = NODES.find((n) => n.id === c.to)!;
            return (
              <g key={`${c.from}-${c.to}-${i}`}>
                {/* Structural line */}
                <line
                  x1={`${source.x}%`}
                  y1={`${source.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="#1e293b"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                {/* Flowing animated stream */}
                <motion.line
                  x1={`${source.x}%`}
                  y1={`${source.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="url(#cyberGrad)"
                  strokeWidth="2"
                  filter="url(#neonGlow)"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  animate={{
                    pathLength: [0.1, 1, 0.1],
                    opacity: [0.3, 0.9, 0.3]
                  }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {NODES.map((node) => {
          const isSelected = activeNode.id === node.id;
          const Icon = node.icon;
          return (
            <motion.button
              key={node.id}
              type="button"
              onClick={() => setActiveNode(node)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl p-2.5 sm:p-3 transition-all duration-300 flex items-center gap-2.5 group cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-xl shadow-amber-500/30 ring-2 ring-amber-300 scale-105 z-30 font-bold'
                  : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-amber-500/60 hover:text-white z-20'
              }`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-amber-400 group-hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[11px] font-bold tracking-tight whitespace-nowrap leading-none">
                  {node.label}
                </span>
                <span className={`text-[9px] font-mono mt-1 ${isSelected ? 'text-slate-900 font-semibold' : 'text-slate-400 group-hover:text-slate-200'}`}>
                  {node.metric}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Node Details Card */}
      <div className="relative z-10 bg-[#0d1322]/95 backdrop-blur-md rounded-2xl border border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
            <activeNode.icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{activeNode.label}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 uppercase font-semibold">
                {activeNode.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              <span className="text-slate-200 font-semibold">{activeNode.spec}</span> &bull; {activeNode.metric}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono text-slate-400 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
          <span>Synced Frame #{pulseCount}</span>
          <button
            type="button"
            onClick={() =>
              setActiveNode(NODES[(NODES.indexOf(activeNode) + 1) % NODES.length])
            }
            className="text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
          >
            Inspect Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
