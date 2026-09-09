// ==========================================
// ZUNO BRAND LOGO
// ==========================================

import React from 'react';

interface ZunoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showSubtitle?: boolean;
  inverted?: boolean;
}

export const ZunoLogo: React.FC<ZunoLogoProps> = ({ 
  size = 'md', 
  showText = true, 
  showSubtitle = false,
  inverted = false 
}) => {
  const dimensions = {
    sm: { icon: 28, font: '1.15rem', subFont: '0.65rem', markWidth: 28, markHeight: 28 },
    md: { icon: 34, font: '1.25rem', subFont: '0.7rem', markWidth: 34, markHeight: 34 },
    lg: { icon: 42, font: '1.5rem', subFont: '0.75rem', markWidth: 42, markHeight: 42 },
  }[size];

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, userSelect: 'none' }}>
      {/* Modern Geometric Z Icon in Purple Gradient Rounded Box */}
      <svg
        width={dimensions.markWidth}
        height={dimensions.markHeight}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 4px rgba(124, 58, 237, 0.25))' }}
      >
        <defs>
          <linearGradient id="zunoGradient1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#6366F1" />
          </linearGradient>
        </defs>
        {/* Background rounded squircle */}
        <rect width="40" height="40" rx="10" fill="url(#zunoGradient1)" />
        {/* Sleek Z path */}
        <path
          d="M11 13H28.5C29.3 13 29.8 13.9 29.3 14.5L16.2 26H29C29.6 26 30 26.4 30 27V27.5C30 28.1 29.6 28.5 29 28.5H11.5C10.7 28.5 10.2 27.6 10.7 27L23.8 15.5H11C10.4 15.5 10 15.1 10 14.5V14C10 13.4 10.4 13 11 13Z"
          fill="#FFFFFF"
        />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <span
            style={{
              fontSize: dimensions.font,
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: inverted ? '#FFFFFF' : '#0f172a',
              display: 'flex',
              alignItems: 'baseline',
            }}
          >
            Zuno
          </span>
          {showSubtitle && (
            <span
              style={{
                fontSize: dimensions.subFont,
                color: '#64748b',
                fontWeight: 500,
                marginTop: 2,
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              AI-Powered Skill Intelligence Platform
            </span>
          )}
        </div>
      )}
    </div>
  );
};
