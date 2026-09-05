// ==========================================
// PAGE 5: ZUNO FORECAST (Future Skill Signals)
// ==========================================

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { forecastService } from '../services/forecastService';
import { ForecastData, ForecastHorizon } from '../types';
import { 
  Compass, 
  TrendingUp, 
  Sparkles, 
  Cpu, 
  Radio, 
  ArrowUpRight, 
  Zap, 
  Activity,
  Layers,
  Clock
} from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { Badge } from '../components/common/Badge';
import { MinimalChart } from '../components/charts/MinimalChart';

export const ZunoForecastPage: React.FC = () => {
  const { setCurrentRoute } = useApp();
  const [horizon, setHorizon] = useState<ForecastHorizon>('12M');
  const [loading, setLoading] = useState(false);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);

  useEffect(() => {
    async function loadForecast() {
      setLoading(true);
      try {
        const data = await forecastService.getForecast(horizon);
        setForecastData(data);
      } finally {
        setLoading(false);
      }
    }
    loadForecast();
  }, [horizon]);

  const horizons: ForecastHorizon[] = ['6M', '12M', '18M', '24M'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header & Horizon Selector */}
      <div className="card" style={{ padding: 'var(--space-4) var(--space-5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h3 className="card-title">Forecast Time Horizon</h3>
            <p className="card-subtitle">Projected technology adoption and skill expansion curve</p>
          </div>

          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--bg-surface-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: 3,
              border: '1px solid var(--border-subtle)',
            }}
          >
            {horizons.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHorizon(h)}
                style={{
                  padding: '7px 16px',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: horizon === h ? '#ffffff' : 'transparent',
                  color: horizon === h ? 'var(--zuno-primary-700)' : 'var(--text-muted)',
                  boxShadow: horizon === h ? 'var(--shadow-xs)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {h} Horizon
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content or Empty State */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <SkeletonLoader type="chart" height={240} />
          <SkeletonLoader type="card" count={4} />
        </div>
      ) : !forecastData ? (
        <EmptyState
          icon={Compass}
          title="No forecast data available"
          description="Zuno needs market data to generate a forecast. Connect historical job market feeds to activate the predictive AI model."
          actionText="Connect Data Source"
          onAction={() => setCurrentRoute('settings')}
          badgeText="Predictive Model Awaiting Data"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Top Forecast Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            {forecastData.topRisingSkills.map((item) => (
              <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span className="badge badge-purple" style={{ textTransform: 'capitalize' }}>
                      {item.category}
                    </span>
                    <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>
                      <TrendingUp size={11} /> {item.expectedAdoptionTier}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
                    {item.skillName}
                  </h4>
                  <div style={{ fontSize: '0.785rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
                    <strong>Key Drivers:</strong> {item.keyDrivers.join(', ')}
                  </div>
                </div>

                <div style={{ paddingTop: 8, borderTop: '1px solid var(--border-subtle)', fontSize: '0.75rem', color: 'var(--zuno-primary-800)' }}>
                  <strong>Institutional Action:</strong> {item.actionRecommendation}
                </div>
              </div>
            ))}
          </div>

          {/* Technology Signals & Industry Growth Signals */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-5)' }}>
            <div className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Emerging Technology Signals</h3>
                  <p className="card-subtitle">Maturity lifecycle and hiring impact</p>
                </div>
                <Radio size={18} color="var(--zuno-primary-600)" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {forecastData.emergingTechnologies.map((tech, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                        {tech.technology}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Peak Demand: {tech.timeToPeakDemand}
                      </div>
                    </div>
                    <Badge variant={tech.maturity === 'Accelerating' ? 'purple' : 'neutral'} size="sm">
                      {tech.maturity}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Future Role Expansion</h3>
                  <p className="card-subtitle">Evolving job profiles over next {horizon}</p>
                </div>
                <Zap size={18} color="var(--status-warning)" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {forecastData.futureRoleDemand.map((role, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                        {role.role}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.785rem', color: 'var(--text-secondary)' }}>
                      <strong>Structural Shift:</strong> {role.keyShift}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
