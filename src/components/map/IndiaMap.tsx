// =========================================================
// INTERACTIVE INDIA SKILL CRISIS RADAR MAP
// High-Precision SVG Map with Geopolitical Boundaries & Radar Hotspots
// =========================================================

import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Lightbulb, 
  MapPin, 
  Layers,
  Sparkles
} from 'lucide-react';
import { INDIA_STATES } from './indiaMapData';

export interface HotspotCrisis {
  id: string;
  stateId: string;
  name: string;
  state: string;
  shortageTitle: string;
  risk: 'High' | 'Medium' | 'Low';
  riskLabel: string;
  riskColor: string;
  demand: number;
  supply: number;
  timeToImpact: string;
  recommendedAction: string;
  cx: number;
  cy: number;
  r: number;
}

export const RADAR_HOTSPOTS: HotspotCrisis[] = [
  {
    id: 'bengaluru',
    stateId: 'INKA',
    name: 'Bengaluru, Karnataka',
    state: 'Karnataka',
    shortageTitle: 'Cloud Infrastructure & DevOps Shortage',
    risk: 'High',
    riskLabel: 'High Risk',
    riskColor: '#ef4444',
    demand: 87,
    supply: 41,
    timeToImpact: '6-12 months',
    recommendedAction: 'Increase training capacity for Cloud Computing & DevOps by 30% across regional engineering colleges.',
    cx: 338,
    cy: 775,
    r: 16,
  },
  {
    id: 'delhi',
    stateId: 'INDL',
    name: 'Delhi NCR',
    state: 'Delhi',
    shortageTitle: 'AI Systems & LLM Engineering Shortage',
    risk: 'High',
    riskLabel: 'High Risk',
    riskColor: '#ef4444',
    demand: 92,
    supply: 38,
    timeToImpact: '3-6 months',
    recommendedAction: 'Upgrade AI laboratory infrastructure and open faculty access to centralized GPU computing clusters.',
    cx: 344,
    cy: 321,
    r: 18,
  },
  {
    id: 'mumbai',
    stateId: 'INMH',
    name: 'Mumbai - Pune, Maharashtra',
    state: 'Maharashtra',
    shortageTitle: 'Fullstack & Fintech Security Shortage',
    risk: 'Medium',
    riskLabel: 'Medium Risk',
    riskColor: '#f59e0b',
    demand: 76,
    supply: 52,
    timeToImpact: '6-12 months',
    recommendedAction: 'Accelerate corporate apprenticeship partnerships with BFSI technology hubs in BKC & Hinjawadi.',
    cx: 250,
    cy: 605,
    r: 15,
  },
  {
    id: 'hyderabad',
    stateId: 'INTG',
    name: 'Hyderabad, Telangana',
    state: 'Telangana',
    shortageTitle: 'Data Platform & MLOps Shortage',
    risk: 'High',
    riskLabel: 'High Risk',
    riskColor: '#ef4444',
    demand: 84,
    supply: 43,
    timeToImpact: '4-8 months',
    recommendedAction: 'Expand specialized data platform certifications and co-op research curricula with HITEC city enterprises.',
    cx: 410,
    cy: 642,
    r: 16,
  },
  {
    id: 'ahmedabad',
    stateId: 'INGJ',
    name: 'Ahmedabad - Gandhinagar, Gujarat',
    state: 'Gujarat',
    shortageTitle: 'Semiconductor VLSI & Embedded Systems Shortage',
    risk: 'Medium',
    riskLabel: 'Medium Risk',
    riskColor: '#f59e0b',
    demand: 79,
    supply: 45,
    timeToImpact: '6-9 months',
    recommendedAction: 'Establish dedicated VLSI testbeds and microelectronics synthesis coursework in state engineering institutions.',
    cx: 210,
    cy: 490,
    r: 14,
  },
  {
    id: 'kolkata',
    stateId: 'INWB',
    name: 'Kolkata, West Bengal',
    state: 'West Bengal',
    shortageTitle: 'Data Platform & Analytics Shortage',
    risk: 'Medium',
    riskLabel: 'Medium Risk',
    riskColor: '#f59e0b',
    demand: 72,
    supply: 46,
    timeToImpact: '6-12 months',
    recommendedAction: 'Launch district-level data pipeline and cloud data warehousing bootcamps in state universities.',
    cx: 648,
    cy: 478,
    r: 15,
  },
  {
    id: 'bhopal',
    stateId: 'INMP',
    name: 'Central Cluster (Bhopal / Indore, MP)',
    state: 'Madhya Pradesh',
    shortageTitle: 'Industrial IoT & Automation Shortage',
    risk: 'Low',
    riskLabel: 'Low Risk',
    riskColor: '#10b981',
    demand: 55,
    supply: 49,
    timeToImpact: '12-24 months',
    recommendedAction: 'Maintain steady intake with focused vocational polytechnic and smart manufacturing upgrades.',
    cx: 380,
    cy: 463,
    r: 13,
  },
  {
    id: 'chennai',
    stateId: 'INTN',
    name: 'Chennai, Tamil Nadu',
    state: 'Tamil Nadu',
    shortageTitle: 'Automotive Embedded Systems & EV Shortage',
    risk: 'Low',
    riskLabel: 'Low Risk',
    riskColor: '#10b981',
    demand: 58,
    supply: 54,
    timeToImpact: '12-18 months',
    recommendedAction: 'Expand advanced powertrain, battery management systems and IoT microcontroller coursework.',
    cx: 412,
    cy: 785,
    r: 14,
  },
];

export const IndiaMap: React.FC = () => {
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>('bengaluru');
  const [selectedFilter, setSelectedFilter] = useState<string>('India');
  const [riskFilter, setRiskFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number; text: string; sub?: string } | null>(null);

  const activeHotspot = useMemo(() => {
    return RADAR_HOTSPOTS.find((h) => h.id === selectedHotspotId) || RADAR_HOTSPOTS[0];
  }, [selectedHotspotId]);

  const filteredHotspots = useMemo(() => {
    if (riskFilter === 'All') return RADAR_HOTSPOTS;
    return RADAR_HOTSPOTS.filter((h) => h.risk === riskFilter);
  }, [riskFilter]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedFilter(val);
    if (val !== 'India') {
      const match = RADAR_HOTSPOTS.find((h) => h.id === val || h.state === val);
      if (match) {
        setSelectedHotspotId(match.id);
      }
    }
  };

  const handleHotspotClick = (hotspot: HotspotCrisis) => {
    setSelectedHotspotId(hotspot.id);
    setSelectedFilter(hotspot.id);
  };

  const handleStateClick = (stateItem: { id: string; name: string }) => {
    const matchingHotspot = RADAR_HOTSPOTS.find(
      (h) => h.stateId === stateItem.id || h.state.toLowerCase() === stateItem.name.toLowerCase()
    );
    if (matchingHotspot) {
      setSelectedHotspotId(matchingHotspot.id);
      setSelectedFilter(matchingHotspot.id);
    }
  };

  return (
    <div
      className="card"
      style={{
        padding: 'var(--space-6)',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(0,0,0,0.04)',
        border: '1px solid #e2e8f0',
        position: 'relative',
      }}
    >
      {/* Card Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-5)',
          flexWrap: 'wrap',
          gap: 16,
          paddingBottom: 'var(--space-4)',
          borderBottom: '1px solid #f1f5f9',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#eef2ff',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Layers size={18} />
            </div>
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.025em',
                margin: 0,
              }}
            >
              Skill Crisis Radar
            </h2>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                border: '1px solid #bfdbfe',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Sparkles size={11} />
              Live Regional Telemetry
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0, paddingLeft: 42 }}>
            Real-time detection of impending talent and capability shortages across Indian industrial & tech corridors
          </p>
        </div>

        {/* Action Controls & Region Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* Risk Filter Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f8fafc',
              padding: 3,
              borderRadius: 'var(--radius-md)',
              border: '1px solid #e2e8f0',
              fontSize: '0.78rem',
              fontWeight: 600,
            }}
          >
            {(['All', 'High', 'Medium', 'Low'] as const).map((r) => {
              const active = riskFilter === r;
              return (
                <button
                  key={r}
                  onClick={() => setRiskFilter(r)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    backgroundColor: active ? '#ffffff' : 'transparent',
                    color: active ? '#0f172a' : '#64748b',
                    boxShadow: active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    fontWeight: active ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {r === 'All' ? 'All Risks' : `${r} Risk`}
                </button>
              );
            })}
          </div>

          {/* Region Selector Dropdown */}
          <div style={{ position: 'relative', minWidth: 160 }}>
            <select
              value={selectedFilter}
              onChange={handleSelectChange}
              style={{
                appearance: 'none',
                width: '100%',
                padding: '8px 36px 8px 14px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#1e293b',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                outline: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                transition: 'border-color 0.15s ease',
              }}
            >
              <option value="India">All Regions (India)</option>
              {RADAR_HOTSPOTS.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={15}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748b',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* Main 2-Column Content Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(340px, 1.28fr) minmax(320px, 1fr)',
          gap: 'var(--space-6)',
          alignItems: 'stretch',
        }}
      >
        {/* Left Column: Authentic Interactive Vector Map of India */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: 520,
            background: 'linear-gradient(180deg, #f0f6fc 0%, #e6effa 100%)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid #d0e1f3',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.02)',
          }}
          onMouseMove={(e) => {
            if (tooltipPos) {
              const rect = e.currentTarget.getBoundingClientRect();
              setTooltipPos((prev) =>
                prev
                  ? {
                      ...prev,
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    }
                  : null
              );
            }
          }}
          onMouseLeave={() => {
            setHoveredHotspotId(null);
            setHoveredStateId(null);
            setTooltipPos(null);
          }}
        >
          {/* Subtle Background Grid Pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(#93c5fd 0.75px, transparent 0.75px)',
              backgroundSize: '24px 24px',
              opacity: 0.35,
              pointerEvents: 'none',
            }}
          />

          <svg
            viewBox="80 30 840 940"
            style={{
              width: '100%',
              height: '100%',
              maxHeight: 560,
              filter: 'drop-shadow(0 4px 16px rgba(15, 23, 42, 0.08))',
              userSelect: 'none',
            }}
          >
            <defs>
              {/* Radial Gradients for Radar Hotspots */}
              <radialGradient id="redRadarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#ef4444" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#ef4444" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="orangeRadarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="greenRadarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>

              {/* Map Filter Dropshadow */}
              <filter id="hotspotShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Render Every Indian State & UT with Accurate Geometry */}
            <g id="india-states-layer">
              {INDIA_STATES.map((state) => {
                const isStateActive =
                  activeHotspot.stateId === state.id ||
                  activeHotspot.state.toLowerCase() === state.name.toLowerCase();
                const isHovered = hoveredStateId === state.id;
                const hasHotspot = RADAR_HOTSPOTS.some(
                  (h) => h.stateId === state.id || h.state.toLowerCase() === state.name.toLowerCase()
                );

                let fillColor = '#ffffff';
                let strokeColor = '#b8d0eb';
                let strokeWidth = 1.0;

                if (isStateActive) {
                  fillColor = '#e0edfc';
                  strokeColor = '#3b82f6';
                  strokeWidth = 1.8;
                } else if (isHovered) {
                  fillColor = '#edf5ff';
                  strokeColor = '#60a5fa';
                  strokeWidth = 1.4;
                } else if (hasHotspot) {
                  fillColor = '#f8fbff';
                  strokeColor = '#a8c6e6';
                  strokeWidth = 1.1;
                }

                return (
                  <path
                    key={state.id}
                    d={state.d}
                    id={state.id}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    style={{
                      cursor: 'pointer',
                      transition: 'fill 0.2s ease, stroke 0.2s ease, stroke-width 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      setHoveredStateId(state.id);
                      const matchingH = RADAR_HOTSPOTS.find(
                        (h) => h.stateId === state.id || h.state.toLowerCase() === state.name.toLowerCase()
                      );
                      const rect = e.currentTarget.closest('div')?.getBoundingClientRect();
                      if (rect) {
                        setTooltipPos({
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top - 20,
                          text: state.name,
                          sub: matchingH ? `${matchingH.risk} Risk Shortage` : 'Normal Capacity',
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredStateId(null);
                      if (!hoveredHotspotId) setTooltipPos(null);
                    }}
                    onClick={() => handleStateClick(state)}
                  />
                );
              })}
            </g>

            {/* Render Radar Hotspot Markers */}
            <g id="radar-hotspots-layer">
              {filteredHotspots.map((hotspot) => {
                const isSelected = hotspot.id === selectedHotspotId;
                const isHovered = hotspot.id === hoveredHotspotId;
                const glowGradient =
                  hotspot.risk === 'High'
                    ? 'url(#redRadarGlow)'
                    : hotspot.risk === 'Medium'
                    ? 'url(#orangeRadarGlow)'
                    : 'url(#greenRadarGlow)';

                return (
                  <g
                    key={hotspot.id}
                    onClick={() => handleHotspotClick(hotspot)}
                    onMouseEnter={(e) => {
                      setHoveredHotspotId(hotspot.id);
                      const rect = e.currentTarget.closest('div')?.getBoundingClientRect();
                      if (rect) {
                        setTooltipPos({
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top - 25,
                          text: hotspot.name,
                          sub: `${hotspot.shortageTitle} • ${hotspot.riskLabel}`,
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredHotspotId(null);
                      setTooltipPos(null);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Outer Radar Glow / Multi-layer Aura */}
                    <circle
                      cx={hotspot.cx}
                      cy={hotspot.cy}
                      r={isSelected ? 54 : isHovered ? 48 : 38}
                      fill={glowGradient}
                      style={{ transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />

                    {/* Outer Pulsing Wave Ring 1 */}
                    <circle
                      cx={hotspot.cx}
                      cy={hotspot.cy}
                      r={hotspot.r + 4}
                      fill="none"
                      stroke={hotspot.riskColor}
                      strokeWidth="2"
                      opacity="0.75"
                    >
                      <animate
                        attributeName="r"
                        values={`${hotspot.r + 2};${hotspot.r + 34};${hotspot.r + 2}`}
                        dur="2.6s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.8;0.0;0.8"
                        dur="2.6s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Outer Pulsing Wave Ring 2 (Offset phase) */}
                    <circle
                      cx={hotspot.cx}
                      cy={hotspot.cy}
                      r={hotspot.r + 4}
                      fill="none"
                      stroke={hotspot.riskColor}
                      strokeWidth="1.2"
                      opacity="0.5"
                    >
                      <animate
                        attributeName="r"
                        values={`${hotspot.r + 2};${hotspot.r + 22};${hotspot.r + 2}`}
                        dur="2.6s"
                        begin="1.1s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.6;0.0;0.6"
                        dur="2.6s"
                        begin="1.1s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Middle Halo Circle for Selected Hotspot */}
                    {isSelected && (
                      <circle
                        cx={hotspot.cx}
                        cy={hotspot.cy}
                        r={hotspot.r + 8}
                        fill="none"
                        stroke={hotspot.riskColor}
                        strokeWidth="2.5"
                        strokeDasharray="4,3"
                        opacity="0.9"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from={`0 ${hotspot.cx} ${hotspot.cy}`}
                          to={`360 ${hotspot.cx} ${hotspot.cy}`}
                          dur="12s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    {/* Solid Center Core Pin with White Border */}
                    <circle
                      cx={hotspot.cx}
                      cy={hotspot.cy}
                      r={isSelected ? 9.5 : isHovered ? 8.5 : 7}
                      fill={hotspot.riskColor}
                      stroke="#ffffff"
                      strokeWidth="3"
                      filter="url(#hotspotShadow)"
                      style={{
                        transition: 'all 0.2s ease',
                      }}
                    />

                    {/* Inner Center White Dot */}
                    <circle
                      cx={hotspot.cx}
                      cy={hotspot.cy}
                      r={isSelected ? 3.5 : 2.5}
                      fill="#ffffff"
                    />
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Floating Interactive Tooltip */}
          {tooltipPos && (
            <div
              style={{
                position: 'absolute',
                left: tooltipPos.x,
                top: tooltipPos.y,
                transform: 'translate(-50%, -100%)',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                fontSize: '0.78rem',
                fontWeight: 600,
                pointerEvents: 'none',
                zIndex: 40,
                whiteSpace: 'nowrap',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={12} style={{ color: '#60a5fa' }} />
                <span>{tooltipPos.text}</span>
              </div>
              {tooltipPos.sub && (
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500 }}>
                  {tooltipPos.sub}
                </div>
              )}
            </div>
          )}

          {/* Bottom-Left Floating Legend Box */}
          <div
            style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08)',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#334155',
              zIndex: 10,
              userSelect: 'none',
            }}
          >
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>
              Radar Legend
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  backgroundColor: '#ef4444',
                  boxShadow: '0 0 6px #ef4444',
                }}
              />
              <span>High Risk (&lt;6 mo)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b',
                  boxShadow: '0 0 6px #f59e0b',
                }}
              />
              <span>Medium Risk (6-12 mo)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 6px #10b981',
                }}
              />
              <span>Low Risk (12+ mo)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Hotspot Analytics & Action Panel */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid #f1f5f9',
            padding: 'var(--space-5)',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {/* Header Row: Region Name & Risk Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <MapPin size={15} style={{ color: activeHotspot.riskColor }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {activeHotspot.state}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    letterSpacing: '-0.02em',
                    margin: 0,
                  }}
                >
                  {activeHotspot.name}
                </h3>
              </div>

              <span
                style={{
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  backgroundColor:
                    activeHotspot.risk === 'High'
                      ? '#fee2e2'
                      : activeHotspot.risk === 'Medium'
                      ? '#fef3c7'
                      : '#dcfce7',
                  color:
                    activeHotspot.risk === 'High'
                      ? '#dc2626'
                      : activeHotspot.risk === 'Medium'
                      ? '#d97706'
                      : '#15803d',
                  border: `1px solid ${
                    activeHotspot.risk === 'High'
                      ? '#fca5a5'
                      : activeHotspot.risk === 'Medium'
                      ? '#fcd34d'
                      : '#86efac'
                  }`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: activeHotspot.riskColor,
                  }}
                />
                {activeHotspot.riskLabel}
              </span>
            </div>

            {/* Shortage Title */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                padding: '12px 14px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid #e2e8f0',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: 3 }}>
                CRITICAL SHORTAGE DETECTED
              </div>
              <div
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: '#1e293b',
                  letterSpacing: '-0.01em',
                }}
              >
                {activeHotspot.shortageTitle}
              </div>
            </div>

            {/* Demand vs Available Supply Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <TrendingUp size={16} style={{ color: '#4f46e5' }} />
                <span>Demand vs. Available Supply</span>
              </div>

              {/* Demand Progress Bar */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#475569',
                    marginBottom: 6,
                  }}
                >
                  <span>Industry Hiring Demand</span>
                  <span style={{ fontWeight: 800, color: '#0f172a' }}>
                    {activeHotspot.demand}%
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: 10,
                    backgroundColor: '#f1f5f9',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${activeHotspot.demand}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #f87171, #ef4444)',
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>
              </div>

              {/* Available Supply Progress Bar */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#475569',
                    marginBottom: 6,
                  }}
                >
                  <span>Graduate Ready Supply</span>
                  <span style={{ fontWeight: 800, color: '#0f172a' }}>
                    {activeHotspot.supply}%
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: 10,
                    backgroundColor: '#f1f5f9',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${activeHotspot.supply}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #34d399, #10b981)',
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>
              </div>

              {/* Deficit Metric Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  backgroundColor: '#fff1f2',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #ffe4e6',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#be123c',
                }}
              >
                <span>Talent Deficit Gap:</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 800 }}>
                  -{activeHotspot.demand - activeHotspot.supply}% Net Shortage
                </span>
              </div>
            </div>

            {/* Shortage Risk & Time to Impact Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                padding: '14px',
                backgroundColor: '#f8fafc',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid #e2e8f0',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#64748b',
                    marginBottom: 4,
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                  }}
                >
                  Shortage Severity
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    textTransform: 'uppercase',
                  }}
                >
                  <AlertTriangle size={15} style={{ color: activeHotspot.riskColor }} />
                  <span>{activeHotspot.risk}</span>
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#64748b',
                    marginBottom: 4,
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                  }}
                >
                  Time to Critical Impact
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    color: '#0f172a',
                  }}
                >
                  <Clock size={15} style={{ color: '#6366f1' }} />
                  <span>{activeHotspot.timeToImpact}</span>
                </div>
              </div>
            </div>

            {/* Recommended Actions Card */}
            <div
              style={{
                backgroundColor: '#f5f3ff',
                border: '1px solid #ede9fe',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  color: '#6366f1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Lightbulb size={16} />
                <span>Recommended Curriculum Intervention</span>
              </div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: '#4338ca',
                  fontWeight: 500,
                  lineHeight: 1.5,
                }}
              >
                {activeHotspot.recommendedAction}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
