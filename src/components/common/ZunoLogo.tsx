// ==========================================
// ZUNO BRAND LOGO
// ==========================================

import React from 'react';

interface ZunoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  inverted?: boolean;
}

export const ZunoLogo: React.FC<ZunoLogoProps> = ({ size = 'md', showText = true, inverted = false }) => {
  const dimensions = {
    sm: { icon: 24, font: '1rem', markWidth: 24, markHeight: 24 },
    md: { icon: 32, font: '1.25rem', markWidth: 32, markHeight: 32 },
    lg: { icon: 40, font: '1.5rem', markWidth: 40, markHeight: 40 },
  }[size];

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, userSelect: 'none' }}>
      {/* Modern Geometric Z Icon */}
      <svg
        width={dimensions.markWidth}
        height={dimensions.markHeight}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="zunoGradient1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#6366F1" />
          </linearGradient>
          <linearGradient id="zunoGradient2" x1="0" y1="20" x2="40" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A78BFA" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        {/* Background pill / rounded square */}
        <rect width="40" height="40" rx="11" fill="url(#zunoGradient1)" />
        {/* Sleek Z path */}
        <path
          d="M11 13H28.5C29.3 13 29.8 13.9 29.3 14.5L16.2 26H29C29.6 26 30 26.4 30 27V27.5C30 28.1 29.6 28.5 29 28.5H11.5C10.7 28.5 10.2 27.6 10.7 27L23.8 15.5H11C10.4 15.5 10 15.1 10 14.5V14C10 13.4 10.4 13 11 13Z"
          fill="#FFFFFF"
        />
        {/* Accent spark dot */}
        <circle cx="28.5" cy="11.5" r="2.5" fill="#38BDF8" />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span
            style={{
              fontSize: dimensions.font,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: inverted ? '#FFFFFF' : 'var(--text-primary)',
              display: 'flex',
              alignItems: 'baseline',
            }}
          >
            Zuno
            <span style={{ color: '#8B5CF6', fontSize: '0.85em', marginLeft: 1 }}>.</span>
          </span>
        </div>
      )}
    </div>
  );
};
