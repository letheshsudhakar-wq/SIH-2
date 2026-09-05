// ==========================================
// METRIC CARD COMPONENT
// ==========================================

import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight, Database, ChevronRight } from 'lucide-react';
import { SkeletonLoader } from './SkeletonLoader';

interface MetricCardProps {
  title: string;
  value?: string | number | null;
  change?: string | number | null;
  isPositive?: boolean;
  subtitle?: string;
  icon?: LucideIcon;
  loading?: boolean;
  emptyMessage?: string;
  onAction?: () => void;
  actionLabel?: string;
  badge?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  subtitle,
  icon: Icon,
  loading = false,
  emptyMessage = 'Awaiting data',
  onAction,
  actionLabel,
  badge,
}) => {
  if (loading) {
    return <SkeletonLoader type="card" height={130} />;
  }

  const hasData = value !== undefined && value !== null && value !== '';

  return (
    <div
      className={`card ${onAction ? 'card-interactive' : ''}`}
      onClick={onAction}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 126,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div>
          <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {title}
          </span>
          {badge && (
            <span className="badge badge-purple" style={{ marginLeft: 6, fontSize: '0.7rem' }}>
              {badge}
            </span>
          )}
        </div>
        {Icon && (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--zuno-primary-50)',
              color: 'var(--zuno-primary-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon size={16} />
          </div>
        )}
      </div>

      {/* Main Metric Value / Empty State */}
      <div style={{ margin: 'var(--space-2) 0' }}>
        {hasData ? (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              {value}
            </span>
            {change !== undefined && change !== null && (
              <span
                className={`badge ${isPositive ? 'badge-success' : 'badge-critical'}`}
                style={{ fontSize: '0.75rem', padding: '2px 6px' }}
              >
                {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {change}
              </span>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-subtle)', padding: '4px 0' }}>
            <Database size={15} />
            <span style={{ fontSize: '0.875rem', fontStyle: 'italic', fontWeight: 500 }}>
              {emptyMessage}
            </span>
          </div>
        )}
      </div>

      {/* Footer / Subtitle / Action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
          {subtitle || (hasData ? 'Real-time industry telemetry' : 'Connect data source to populate')}
        </span>
        {actionLabel && (
          <span
            style={{
              fontSize: '0.775rem',
              fontWeight: 600,
              color: 'var(--zuno-primary-600)',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {actionLabel}
            <ChevronRight size={12} />
          </span>
        )}
      </div>
    </div>
  );
};
