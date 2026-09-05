// ==========================================
// INTERACTIVE INDIA MAP & REGIONAL RADAR
// ==========================================

import React, { useState } from 'react';
import { StateCrisisData, ShortageSeverity, DistrictShortage } from '../../types';
import { EmptyState } from '../common/EmptyState';
import { MapPin, AlertCircle, ArrowRight, ShieldAlert, GraduationCap, Clock, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';

interface IndiaMapProps {
  statesData?: StateCrisisData[] | null;
  onSelectState?: (stateCode: string) => void;
  selectedStateCode?: string | null;
  loading?: boolean;
}

// Representative Geo Polygons / Nodes for Indian States for crisp responsive vector rendering
interface StateCoordinate {
  code: string;
  name: string;
  cx: number;
  cy: number;
  r: number;
  region: 'North' | 'South' | 'West' | 'East' | 'Central' | 'NorthEast';
}

const INDIAN_STATES: StateCoordinate[] = [
  { code: 'DL', name: 'Delhi NCR', cx: 200, cy: 155, r: 20, region: 'North' },
  { code: 'HR', name: 'Haryana', cx: 185, cy: 145, r: 18, region: 'North' },
  { code: 'PB', name: 'Punjab', cx: 165, cy: 125, r: 20, region: 'North' },
  { code: 'RJ', name: 'Rajasthan', cx: 145, cy: 200, r: 32, region: 'North' },
  { code: 'UP', name: 'Uttar Pradesh', cx: 240, cy: 190, r: 34, region: 'North' },
  { code: 'GJ', name: 'Gujarat', cx: 110, cy: 250, r: 28, region: 'West' },
  { code: 'MP', name: 'Madhya Pradesh', cx: 210, cy: 260, r: 36, region: 'Central' },
  { code: 'MH', name: 'Maharashtra', cx: 165, cy: 330, r: 36, region: 'West' },
  { code: 'KA', name: 'Karnataka', cx: 160, cy: 420, r: 30, region: 'South' },
  { code: 'TS', name: 'Telangana', cx: 220, cy: 360, r: 25, region: 'South' },
  { code: 'AP', name: 'Andhra Pradesh', cx: 235, cy: 410, r: 28, region: 'South' },
  { code: 'TN', name: 'Tamil Nadu', cx: 195, cy: 485, r: 30, region: 'South' },
  { code: 'KL', name: 'Kerala', cx: 155, cy: 495, r: 20, region: 'South' },
  { code: 'WB', name: 'West Bengal', cx: 330, cy: 250, r: 24, region: 'East' },
  { code: 'OR', name: 'Odisha', cx: 290, cy: 310, r: 26, region: 'East' },
  { code: 'JH', name: 'Jharkhand', cx: 285, cy: 240, r: 22, region: 'East' },
  { code: 'BR', name: 'Bihar', cx: 285, cy: 200, r: 24, region: 'East' },
  { code: 'AS', name: 'Assam', cx: 400, cy: 190, r: 22, region: 'NorthEast' },
];

export const IndiaMap: React.FC<IndiaMapProps> = ({
  statesData,
  onSelectState,
  selectedStateCode = 'KA',
}) => {
  const [hoveredState, setHoveredState] = useState<StateCoordinate | null>(null);
  const [activeDistrict, setActiveDistrict] = useState<DistrictShortage | null>(null);

  // If no data is available from API, show clean empty state
  if (!statesData || statesData.length === 0) {
    return (
      <EmptyState
        icon={MapPin}
        title="No regional shortage data connected"
        description="Connect district telemetry or state skill data source to view the live India Skill Crisis Radar."
        actionText="Configure Data Source"
        badgeText="Skill Crisis Radar"
      />
    );
  }

  const selectedStateData = statesData.find((s) => s.stateCode === selectedStateCode) || statesData[0];

  const getSeverityColor = (severity?: ShortageSeverity) => {
    switch (severity) {
      case 'Critical': return '#ef4444';
      case 'High': return '#f97316';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#94a3b8';
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.2fr) minmax(300px, 1fr)', gap: 'var(--space-6)' }}>
      {/* Map Vector Visualization Container */}
      <div className="card" style={{ padding: 'var(--space-5)', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
          <div>
            <h3 className="card-title">National Skill Imbalance Heatmap</h3>
            <p className="card-subtitle">Select an economic zone or state to drill into district telemetry</p>
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444' }} /> Critical
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f97316' }} /> High
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981' }} /> Stable
            </span>
          </div>
        </div>

        {/* SVG India Visual Graphic */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 480,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-app)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            overflow: 'hidden',
          }}
        >
          <svg viewBox="0 0 460 560" style={{ width: '100%', height: '100%' }}>
            {/* Outline Contour Background */}
            <path
              d="M170 80 Q210 60 220 100 Q260 120 280 160 Q340 170 410 180 Q430 220 380 240 Q320 260 310 320 Q280 390 230 480 Q190 530 180 520 Q150 480 140 400 Q100 320 90 250 Q110 180 140 140 Z"
              fill="rgba(124, 58, 237, 0.03)"
              stroke="var(--border-subtle)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Connecting regional lines */}
            <g stroke="var(--border-subtle)" strokeWidth="1" opacity="0.6">
              <line x1="200" y1="155" x2="240" y2="190" />
              <line x1="240" y1="190" x2="210" y2="260" />
              <line x1="210" y1="260" x2="165" y2="330" />
              <line x1="165" y1="330" x2="160" y2="420" />
              <line x1="160" y1="420" x2="195" y2="485" />
              <line x1="220" y1="360" x2="235" y2="410" />
              <line x1="210" y1="260" x2="290" y2="310" />
              <line x1="240" y1="190" x2="330" y2="250" />
            </g>

            {/* State Hub Nodes */}
            {INDIAN_STATES.map((st) => {
              const stData = statesData.find((d) => d.stateCode === st.code);
              const severity = stData?.overallSeverity || 'Medium';
              const color = getSeverityColor(severity);
              const isSelected = selectedStateData?.stateCode === st.code;
              const isHovered = hoveredState?.code === st.code;

              return (
                <g
                  key={st.code}
                  onClick={() => onSelectState && onSelectState(st.code)}
                  onMouseEnter={() => setHoveredState(st)}
                  onMouseLeave={() => setHoveredState(null)}
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                >
                  {/* Pulse ring for critical or selected */}
                  {(isSelected || severity === 'Critical') && (
                    <circle
                      cx={st.cx}
                      cy={st.cy}
                      r={st.r + 6}
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      opacity="0.4"
                    >
                      <animate
                        attributeName="r"
                        values={`${st.r + 4};${st.r + 12};${st.r + 4}`}
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.5;0.1;0.5"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}

                  {/* Main State Node */}
                  <circle
                    cx={st.cx}
                    cy={st.cy}
                    r={isSelected ? st.r + 2 : st.r}
                    fill={isSelected ? color : `${color}20`}
                    stroke={color}
                    strokeWidth={isSelected ? 3 : 2}
                  />

                  {/* State Abbreviation */}
                  <text
                    x={st.cx}
                    y={st.cy + 4}
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : 'var(--text-primary)'}
                    fontSize={st.r > 24 ? "11px" : "9px"}
                    fontWeight="700"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {st.code}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hover Tooltip Overlay */}
          {hoveredState && (
            <div
              style={{
                position: 'absolute',
                top: 16,
                left: 16,
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.785rem',
                backdropFilter: 'blur(4px)',
                boxShadow: 'var(--shadow-md)',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              <div style={{ fontWeight: 700 }}>{hoveredState.name}</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.72rem' }}>
                Zone: {hoveredState.region} • Click to inspect
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected State & District Drilldown Panel */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {selectedStateData.stateName}
            </h3>
            <Badge
              variant={
                selectedStateData.overallSeverity === 'Critical'
                  ? 'critical'
                  : selectedStateData.overallSeverity === 'High'
                  ? 'warning'
                  : 'success'
              }
            >
              {selectedStateData.overallSeverity} Shortage
            </Badge>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Critical Districts Monitored: {selectedStateData.districts?.length || 0}
          </p>
        </div>

        {/* Top Crisis Skills */}
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>
            Top Regional Skill Deficits
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedStateData.topCrisisSkills.map((sk) => (
              <Badge key={sk} variant="purple" size="sm">
                {sk}
              </Badge>
            ))}
          </div>
        </div>

        {/* Districts List */}
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: 'var(--space-4)' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>
            District Telemetry & Recommendations
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {selectedStateData.districts.map((dst) => {
              const isSelected = activeDistrict?.districtName === dst.districtName;
              return (
                <div
                  key={dst.districtName}
                  onClick={() => setActiveDistrict(dst)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${isSelected ? 'var(--zuno-primary-500)' : 'var(--border-subtle)'}`,
                    backgroundColor: isSelected ? 'var(--zuno-primary-50)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                      {dst.districtName}
                    </div>
                    <Badge
                      variant={
                        dst.shortageSeverity === 'Critical'
                          ? 'critical'
                          : dst.shortageSeverity === 'High'
                          ? 'warning'
                          : 'neutral'
                      }
                      size="sm"
                    >
                      {dst.shortageSeverity}
                    </Badge>
                  </div>

                  <div style={{ fontSize: '0.785rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                    <strong>Action:</strong> {dst.suggestedAction}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6, fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Clock size={12} /> {dst.timeToImpact}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <GraduationCap size={12} /> {dst.availableTrainingInstitutesCount || 'N/A'} Institutes
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          className="btn btn-primary btn-sm"
          style={{ width: '100%', marginTop: 'auto' }}
          onClick={() => {
            window.location.hash = 'district-plan';
          }}
        >
          Create District Training Plan
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
