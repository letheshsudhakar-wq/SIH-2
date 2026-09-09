// ==========================================
// PAGE 6: SKILL CRISIS RADAR (Regional Shortages)
// ==========================================

import React from 'react';
import { IndiaMap } from '../components/map/IndiaMap';

export const SkillCrisisRadarPage: React.FC = () => {
  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Skill Crisis Radar Card */}
      <IndiaMap />
    </div>
  );
};
