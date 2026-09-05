// ==========================================
// SKELETON SHIMMER LOADERS
// ==========================================

import React from 'react';

interface SkeletonProps {
  type?: 'card' | 'text' | 'title' | 'chart' | 'table' | 'avatar' | 'map';
  count?: number;
  height?: number | string;
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({
  type = 'card',
  count = 1,
  height,
  width,
  className = '',
  style = {},
}) => {
  const items = Array.from({ length: count }, (_, i) => i);

  if (type === 'card') {
    return (
      <div style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {items.map((i) => (
          <div
            key={i}
            className={`card skeleton skeleton-card ${className}`}
            style={{ height: height || 120, ...style }}
          />
        ))}
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div
        className={`card skeleton skeleton-chart ${className}`}
        style={{ height: height || 260, ...style }}
      />
    );
  }

  if (type === 'table') {
    return (
      <div className="card" style={{ padding: 'var(--space-4)' }}>
        <div className="skeleton skeleton-title" style={{ width: '30%', marginBottom: 'var(--space-4)' }} />
        {items.map((i) => (
          <div
            key={i}
            className="skeleton skeleton-text"
            style={{ height: 36, marginBottom: 8, borderRadius: 'var(--radius-sm)' }}
          />
        ))}
      </div>
    );
  }

  if (type === 'avatar') {
    return (
      <div
        className={`skeleton ${className}`}
        style={{
          width: width || 40,
          height: height || 40,
          borderRadius: '50%',
          ...style,
        }}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((i) => (
        <div
          key={i}
          className={`skeleton ${type === 'title' ? 'skeleton-title' : 'skeleton-text'} ${className}`}
          style={{ height, width, ...style }}
        />
      ))}
    </div>
  );
};
