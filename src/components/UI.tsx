import React from 'react';
import { ExternalLink, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import type { VerificationStatus } from '../data/gccs';

// VerificationBadge
interface VerificationBadgeProps {
  status: VerificationStatus;
  size?: 'sm' | 'md';
}

export function VerificationBadge({ status, size = 'sm' }: VerificationBadgeProps) {
  const config = {
    verified: {
      label: 'Verified',
      icon: <CheckCircle2 size={size === 'sm' ? 11 : 13} />,
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    reported: {
      label: 'Reported',
      icon: <Clock size={size === 'sm' ? 11 : 13} />,
      className: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    demo: {
      label: 'Demo',
      icon: <AlertCircle size={size === 'sm' ? 11 : 13} />,
      className: 'bg-slate-100 text-slate-500 border-slate-200',
    },
  };

  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1 border rounded px-1.5 py-0.5 font-medium
      ${size === 'sm' ? 'text-[10px]' : 'text-xs'}
      ${c.className}`}
    >
      {c.icon}
      {c.label}
    </span>
  );
}

// SourceLink
interface SourceLinkProps {
  url: string;
  label?: string;
  date?: string;
}

export function SourceLink({ url, label = 'Source', date }: SourceLinkProps) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-800 text-xs font-medium transition-colors group"
    >
      <ExternalLink size={11} className="flex-shrink-0" />
      {label}
      {date && <span className="text-slate-400 font-normal">· {date}</span>}
    </a>
  );
}

// ConfidencePill
interface ConfidencePillProps {
  confidence: 'high' | 'medium' | 'low' | 'unavailable';
}

export function ConfidencePill({ confidence }: ConfidencePillProps) {
  const config = {
    high: { label: 'High confidence', className: 'bg-emerald-50 text-emerald-700' },
    medium: { label: 'Medium confidence', className: 'bg-amber-50 text-amber-700' },
    low: { label: 'Estimate', className: 'bg-orange-50 text-orange-700' },
    unavailable: { label: 'Data unavailable', className: 'bg-slate-100 text-slate-500' },
  };
  const c = config[confidence];
  return (
    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${c.className}`}>
      {c.label}
    </span>
  );
}

// PageHeader
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  badge?: string;
}

export function PageHeader({ title, subtitle, actions, badge }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
          {badge && (
            <span className="text-[10px] font-bold bg-teal-500/15 text-teal-700 border border-teal-200 rounded px-1.5 py-0.5">
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-sm text-slate-500 leading-relaxed">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  );
}

// Card
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md';
}

export function Card({ children, className = '', padding = 'md' }: CardProps) {
  const padClass = padding === 'none' ? '' : padding === 'sm' ? 'p-4' : 'p-5';
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${padClass} ${className}`}>
      {children}
    </div>
  );
}

// StatCard
interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon?: React.ReactNode;
  trend?: { value: string; positive: boolean };
}

export function StatCard({ label, value, sub, icon, trend }: StatCardProps) {
  return (
    <Card className="flex items-start gap-3">
      {icon && (
        <div className="w-9 h-9 rounded-lg bg-navy-50 flex items-center justify-center flex-shrink-0 text-navy-600">
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <div className="text-xs text-slate-500 font-medium mb-0.5">{label}</div>
        <div className="text-2xl font-bold text-slate-900 leading-tight">{value}</div>
        {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
        {trend && (
          <div className={`text-xs font-medium mt-1 ${trend.positive ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </div>
        )}
      </div>
    </Card>
  );
}

// Badge
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'navy' | 'teal' | 'amber' | 'red';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const styles = {
    default: 'bg-slate-100 text-slate-700',
    navy: 'bg-navy-100 text-navy-700',
    teal: 'bg-teal-50 text-teal-700 border border-teal-200',
    amber: 'bg-amber-50 text-amber-700',
    red: 'bg-red-50 text-red-700',
  };
  return (
    <span className={`inline-block text-[11px] font-medium rounded px-1.5 py-0.5 ${styles[variant]}`}>
      {children}
    </span>
  );
}

// EmptyState
interface EmptyStateProps {
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && <div className="text-slate-300 mb-4">{icon}</div>}
      <h3 className="text-slate-700 font-semibold text-base mb-1">{title}</h3>
      <p className="text-slate-400 text-sm max-w-xs leading-relaxed">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 text-sm text-teal-600 hover:text-teal-800 font-medium underline underline-offset-2"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// FilterBar
interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (v: string) => void;
  allLabel?: string;
}

export function FilterSelect({ label, options, value, onChange, allLabel = 'All' }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white
          focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400
          hover:border-slate-300 transition-colors"
      >
        <option value="">{allLabel}</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

// SearchInput
interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Search...' }: SearchInputProps) {
  return (
    <div className="relative">
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400
          hover:border-slate-300 transition-colors bg-white placeholder-slate-400"
      />
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </div>
  );
}

// MetricRow
interface MetricRowProps {
  label: string;
  value: string;
  sourceUrl?: string;
  confidence?: 'high' | 'medium' | 'low' | 'unavailable';
  notes?: string;
}

export function MetricRow({ label, value, sourceUrl, confidence, notes }: MetricRowProps) {
  const isUnavailable = value === 'Data unavailable';
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-slate-100 last:border-0 gap-2">
      <div className="text-sm text-slate-500 min-w-0">{label}</div>
      <div className="text-right flex-shrink-0">
        <div className={`text-sm font-semibold ${isUnavailable ? 'text-slate-400 italic' : 'text-slate-900'}`}>
          {value}
        </div>
        <div className="flex items-center gap-2 justify-end mt-0.5 flex-wrap">
          {confidence && <ConfidencePill confidence={confidence} />}
          {sourceUrl && <SourceLink url={sourceUrl} label="Source" />}
        </div>
        {notes && <div className="text-[11px] text-slate-400 mt-0.5 max-w-48 text-right">{notes}</div>}
      </div>
    </div>
  );
}

// DataNote
interface DataNoteProps {
  text: string;
  type?: 'info' | 'warning' | 'success';
}

export function DataNote({ text, type = 'info' }: DataNoteProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-700',
    warning: 'bg-amber-50 border-amber-200 text-amber-700',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  };
  return (
    <div className={`text-xs border rounded-lg px-3 py-2 ${styles[type]}`}>
      {text}
    </div>
  );
}

// LoadingSpinner
export function LoadingSpinner({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-500 text-sm py-8 justify-center">
      <svg className="animate-spin w-4 h-4 text-teal-500" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      {label}
    </div>
  );
}
