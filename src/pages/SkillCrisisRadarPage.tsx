// ==========================================
// PAGE 6: SKILL CRISIS RADAR (Regional Shortages)
// ==========================================

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { crisisService } from '../services/crisisService';
import { StateCrisisData } from '../types';
import { IndiaMap } from '../components/map/IndiaMap';
import { EmptyState } from '../components/common/EmptyState';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { AlertOctagon, MapPin, Building, ShieldAlert, Sparkles, Filter } from 'lucide-react';

export const SkillCrisisRadarPage: React.FC = () => {
  const { setCurrentRoute } = useApp();
  const [loading, setLoading] = useState(false);
  const [statesData, setStatesData] = useState<StateCrisisData[] | null>(null);
  const [selectedStateCode, setSelectedStateCode] = useState<string>('KA');

  useEffect(() => {
    async function loadCrisis() {
      setLoading(true);
      try {
        const data = await crisisService.getAllStateCrises();
        setStatesData(data);
      } finally {
        setLoading(false);
      }
    }
    loadCrisis();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Top Banner Context */}
      <div
        style={{
          padding: 'var(--space-5) var(--space-6)',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: 'var(--status-critical)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AlertOctagon size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#991b1b' }}>
              National Skill Shortage Early Warning Radar
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#7f1d1d' }}>
              Identifying geographic clusters where employer skill demand significantly outpaces institutional graduation supply.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          style={{ backgroundColor: '#dc2626', borderColor: '#b91c1c' }}
          onClick={() => setCurrentRoute('district-plan')}
        >
          Draft Regional Training Policy
        </button>
      </div>

      {/* Main Interactive Map & Telemetry Explorer */}
      {loading ? (
        <SkeletonLoader type="chart" height={480} />
      ) : (
        <IndiaMap
          statesData={statesData}
          selectedStateCode={selectedStateCode}
          onSelectState={(code) => setSelectedStateCode(code)}
        />
      )}
    </div>
  );
};
