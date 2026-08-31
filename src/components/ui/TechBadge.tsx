import React from 'react';

interface TechBadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'emerald' | 'amber' | 'slate' | 'dark' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  children,
  variant = 'blue',
  size = 'sm',
  dot = false,
  className = ''
}) => {
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2.5 py-0.5' : 'text-xs px-3 py-1';

  const variantClasses = {
    blue: 'bg-amber-400/10 text-amber-400 border-amber-400/30',
    emerald: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30',
    amber: 'bg-amber-400/15 text-amber-300 border-amber-400/40',
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
    dark: 'bg-slate-900 text-slate-200 border-slate-700',
    outline: 'bg-transparent text-slate-300 border-slate-700'
  };

  const dotColors = {
    blue: 'bg-amber-400 animate-pulse',
    emerald: 'bg-emerald-400 animate-pulse',
    amber: 'bg-amber-400',
    slate: 'bg-slate-400',
    dark: 'bg-amber-400',
    outline: 'bg-slate-400'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-medium rounded-full border tracking-tight whitespace-nowrap select-none ${sizeClasses} ${variantClasses[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
