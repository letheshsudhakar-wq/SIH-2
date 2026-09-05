// ==========================================
// PAGE 8: FUTURE JOBS MAP (Economic Growth Hubs)
// ==========================================

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Map, MapPin, Building2, TrendingUp, Cpu, ArrowRight, ShieldCheck, Layers } from 'lucide-react';
import { Badge } from '../components/common/Badge';

interface HubInfo {
  id: string;
  name: string;
  state: string;
  primaryClusters: string[];
  emergingRoles: string[];
  prioritySkills: string[];
  readinessRating: 'High' | 'Moderate' | 'Lagging';
  policyFocus: string;
}

const HUBS: HubInfo[] = [
  {
    id: 'bengaluru',
    name: 'Bengaluru Tech Corridor',
    state: 'Karnataka',
    primaryClusters: ['Generative AI', 'Deep Tech', 'Semiconductors', 'FinTech'],
    emergingRoles: ['AI Systems Engineer', 'Silicon Verification Lead', 'Autonomous Systems Dev'],
    prioritySkills: ['CUDA / PyTorch', 'SystemVerilog', 'Rust', 'Kubernetes'],
    readinessRating: 'High',
    policyFocus: 'Expand advanced post-graduate specialized labs in silicon design and edge AI.',
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad Pharma-Tech & Cyberabad',
    state: 'Telangana',
    primaryClusters: ['BioTech / Life Sciences', 'Cloud Infrastructure', 'Enterprise AI'],
    emergingRoles: ['Computational Biologist', 'Cloud Resilience Specialist', 'HealthTech Data Architect'],
    prioritySkills: ['Bioinformatics / Python', 'Multi-Cloud Architecture', 'HIPAA Data Governance'],
    readinessRating: 'High',
    policyFocus: 'Incorporate life-science analytics and clinical informatics into university curricula.',
  },
  {
    id: 'pune',
    name: 'Pune Auto-EV & Engineering Hub',
    state: 'Maharashtra',
    primaryClusters: ['Electric Mobility (EV)', 'Embedded IoT', 'Industrial Robotics'],
    emergingRoles: ['Battery Management System (BMS) Eng', 'ADAS Simulation Engineer', 'PLC Automation Lead'],
    prioritySkills: ['MATLAB / Simulink', 'CAN Bus Protocol', 'Embedded C/C++', 'ROS 2'],
    readinessRating: 'Moderate',
    policyFocus: 'Upgrade state polytechnics with high-voltage EV training benches and battery testing rigs.',
  },
  {
    id: 'ncr',
    name: 'NCR Electronics & FinTech Hub (Noida / Gurugram)',
    state: 'Uttar Pradesh / Haryana',
    primaryClusters: ['Electronics Manufacturing (ESDM)', 'Digital Payments', 'Supply Chain Tech'],
    emergingRoles: ['PCB Layout Specialist', 'Smart Manufacturing QA Lead', 'Fraud Detection ML Dev'],
    prioritySkills: ['Altium Designer', 'Surface Mount Tech (SMT)', 'Kafka Streaming'],
    readinessRating: 'Moderate',
    policyFocus: 'Launch rapid SMT and electronics prototyping certifications for diploma holders.',
  },
  {
    id: 'chennai',
    name: 'Chennai SaaS & Aerospace Corridor',
    state: 'Tamil Nadu',
    primaryClusters: ['Enterprise B2B SaaS', 'Automotive OEM', 'Aerospace Defense'],
    emergingRoles: ['SpaceTech Avionics Engineer', 'Product-Led Growth (PLG) Architect', 'Industrial CAD Lead'],
    prioritySkills: ['Avionics C / RTOS', 'Product Telemetry', 'Computational Fluid Dynamics'],
    readinessRating: 'High',
    policyFocus: 'Foster deep academia-industry aerospace research hubs with ISRO/DRDO ecosystem.',
  },
];

export const FutureJobsMapPage: React.FC = () => {
  const { setCurrentRoute } = useApp();
  const [selectedHubId, setSelectedHubId] = useState<string>('bengaluru');
  const [filterState, setFilterState] = useState<string>('all');

  const selectedHub = HUBS.find((h) => h.id === selectedHubId) || HUBS[0];

  const filteredHubs = filterState === 'all' ? HUBS : HUBS.filter((h) => h.state.includes(filterState));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header Context */}
      <div className="card" style={{ padding: 'var(--space-4) var(--space-5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h3 className="card-title">National Economic Hubs & Future Job Growth</h3>
            <p className="card-subtitle">Strategic geographic mapping of industrial clusters and talent requirements</p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <select
              className="form-select"
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              style={{ width: 180 }}
            >
              <option value="all">All States</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Telangana">Telangana</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid: Hubs Directory & Selected Hub Blueprint */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.1fr) minmax(340px, 1.3fr)', gap: 'var(--space-6)' }}>
        {/* Hubs List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {filteredHubs.map((hub) => {
            const isSelected = selectedHub.id === hub.id;
            return (
              <div
                key={hub.id}
                className={`card card-interactive ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedHubId(hub.id)}
                style={{
                  borderColor: isSelected ? 'var(--zuno-primary-500)' : undefined,
                  backgroundColor: isSelected ? 'var(--zuno-primary-50)' : undefined,
                  padding: 'var(--space-4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={15} color="var(--zuno-primary-600)" />
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {hub.name}
                    </span>
                  </div>
                  <Badge variant={hub.readinessRating === 'High' ? 'success' : 'warning'} size="sm">
                    {hub.readinessRating} Readiness
                  </Badge>
                </div>
                <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                  {hub.state} • {hub.primaryClusters.join(' • ')}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Hub Strategic Detail Panel */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: 'var(--space-6)' }}>
          <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge badge-purple">{selectedHub.state}</span>
              <Badge variant="neutral">{selectedHub.readinessRating} Institutional Readiness</Badge>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: 8 }}>
              {selectedHub.name}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Active Industrial Clusters: {selectedHub.primaryClusters.join(', ')}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {/* Emerging Roles */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>
                High-Growth Job Profiles
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {selectedHub.emergingRoles.map((r) => (
                  <Badge key={r} variant="purple">
                    {r}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Critical Skills */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>
                Priority Technical Skills Needed
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {selectedHub.prioritySkills.map((s) => (
                  <Badge key={s} variant="neutral">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Policy & Infrastructure Recommendation */}
            <div
              style={{
                padding: 'var(--space-4)',
                backgroundColor: 'var(--bg-surface-subtle)',
                borderRadius: 'var(--radius-md)',
                borderLeft: '4px solid var(--zuno-primary-600)',
                marginTop: 'var(--space-2)',
              }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                Recommended Government / Institutional Action:
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {selectedHub.policyFocus}
              </p>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              style={{ width: '100%', marginTop: 'auto' }}
              onClick={() => setCurrentRoute('district-plan')}
            >
              Generate Training Plan for {selectedHub.state}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
