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
    blue: 'bg-blue-50 text-[#1a56db] border-blue-200/80',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/80',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    dark: 'bg-slate-900 text-slate-300 border-slate-800',
    outline: 'bg-transparent text-slate-600 border-slate-300'
  };

  const dotColors = {
    blue: 'bg-blue-600',
    emerald: 'bg-emerald-500 animate-pulse',
    amber: 'bg-amber-500',
    slate: 'bg-slate-400',
    dark: 'bg-blue-400',
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
