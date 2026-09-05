// ==========================================
// MINIMALIST SAAS CHARTS WITH EMPTY STATE
// ==========================================

import React from 'react';
import { EmptyState } from '../common/EmptyState';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';
import { SkeletonLoader } from '../common/SkeletonLoader';

interface DataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  color?: string;
}

interface MinimalChartProps {
  type?: 'bar' | 'line' | 'donut';
  title?: string;
  subtitle?: string;
  data?: DataPoint[] | null;
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  height?: number;
  onAction?: () => void;
  actionText?: string;
}

export const MinimalChart: React.FC<MinimalChartProps> = ({
  type = 'bar',
  title,
  subtitle,
  data,
  loading = false,
  emptyTitle = 'No market data available yet',
  emptyDescription = 'Telemetry signals will render here once job and skills data sources are connected.',
  height = 240,
  onAction,
  actionText,
}) => {
  if (loading) {
    return <SkeletonLoader type="chart" height={height + 60} />;
  }

  const hasData = data && data.length > 0;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      {(title || subtitle) && (
        <div className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {hasData && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>
                <Activity size={10} /> Live Telemetry
              </span>
            </div>
          )}
        </div>
      )}

      {/* Render Chart Content or Empty State */}
      {!hasData ? (
        <EmptyState
          icon={type === 'line' ? TrendingUp : BarChart3}
          title={emptyTitle}
          description={emptyDescription}
          actionText={actionText}
          onAction={onAction}
          compact
        />
      ) : (
        <div style={{ height, width: '100%', position: 'relative', marginTop: 'var(--space-2)' }}>
          {type === 'bar' && <RenderBarChart data={data} height={height} />}
          {type === 'line' && <RenderLineChart data={data} height={height} />}
          {type === 'donut' && <RenderDonutChart data={data} height={height} />}
        </div>
      )}
    </div>
  );
};

// SVG Bar Chart
const RenderBarChart: React.FC<{ data: DataPoint[]; height: number }> = ({ data, height }) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const chartHeight = height - 40;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ height: chartHeight, display: 'flex', alignItems: 'flex-end', gap: 12, padding: '0 8px' }}>
        {data.map((d, i) => {
          const heightPercent = (d.value / maxValue) * 100;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  marginBottom: 4,
                }}
              >
                {d.value}
              </div>
              <div
                style={{
                  width: '100%',
                  maxWidth: 36,
                  height: `${heightPercent}%`,
                  backgroundColor: d.color || 'var(--zuno-primary-600)',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.4s ease',
                }}
              />
            </div>
          );
        })}
      </div>
      {/* X Axis labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 8,
          marginTop: 4,
        }}
      >
        {data.map((d, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
};

// SVG Line Chart
const RenderLineChart: React.FC<{ data: DataPoint[]; height: number }> = ({ data, height }) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * 360 + 20;
    const y = height - 40 - (d.value / maxValue) * (height - 60);
    return { x, y, label: d.label, val: d.value };
  });

  const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
  const areaD = `${pathD} L ${points[points.length - 1]?.x || 0} ${height - 30} L ${points[0]?.x || 0} ${height - 30} Z`;

  return (
    <svg viewBox={`0 0 400 ${height}`} style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--zuno-primary-500)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--zuno-primary-500)" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <path d={areaD} fill="url(#lineGrad)" />
      {/* Line */}
      <path d={pathD} fill="none" stroke="var(--zuno-primary-600)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="#ffffff" stroke="var(--zuno-primary-600)" strokeWidth="2" />
      ))}
    </svg>
  );
};

// SVG Donut Chart
const RenderDonutChart: React.FC<{ data: DataPoint[]; height: number }> = ({ data, height }) => {
  const total = data.reduce((acc, d) => acc + d.value, 0) || 1;
  let accumulatedAngle = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height }}>
      <svg width={height - 20} height={height - 20} viewBox="0 0 100 100">
        {data.map((d, i) => {
          const sliceAngle = (d.value / total) * 360;
          const strokeDasharray = `${(sliceAngle / 360) * 251.2} 251.2`;
          const strokeDashoffset = -((accumulatedAngle / 360) * 251.2);
          accumulatedAngle += sliceAngle;

          return (
            <circle
              key={i}
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke={d.color || `hsl(${i * 60 + 240}, 70%, 55%)`}
              strokeWidth="14"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
            />
          );
        })}
      </svg>
    </div>
  );
};
