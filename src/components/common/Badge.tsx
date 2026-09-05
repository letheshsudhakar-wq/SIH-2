// ==========================================
// BADGE & SKILL TAG COMPONENT
// ==========================================

import React from 'react';

interface BadgeProps {
  variant?: 'purple' | 'success' | 'warning' | 'critical' | 'neutral' | 'info';
  children: React.ReactNode;
  icon?: React.ReactNode;
  dot?: boolean;
  size?: 'sm' | 'md';
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  icon,
  dot = false,
  size = 'md',
  onClick,
  style = {},
  className = '',
}) => {
  const variantClass = `badge-${variant}`;
  const sizeStyle = size === 'sm' ? { fontSize: '0.72rem', padding: '2px 6px' } : {};

  return (
    <span
      className={`badge ${variantClass} ${className}`}
      onClick={onClick}
      style={{
        ...sizeStyle,
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        ...style,
      }}
    >
      {dot && <span className="badge-dot" />}
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </span>
  );
};
