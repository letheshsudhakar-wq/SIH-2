// ==========================================
// PAGE 11: GOVERNMENT DASHBOARD (Macro Policy)
// ==========================================

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { governmentService } from '../services/governmentService';
import { GovernmentMetrics } from '../types';
import { 
  Landmark, 
  Building2, 
  Users, 
  AlertOctagon, 
  GraduationCap, 
  FileSpreadsheet, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { MetricCard } from '../components/common/MetricCard';
import { EmptyState } from '../components/common/EmptyState';
import { MinimalChart } from '../components/charts/MinimalChart';
import { Badge } from '../components/common/Badge';

export const GovernmentDashboardPage: React.FC = () => {
  const { setCurrentRoute } = useApp();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<GovernmentMetrics | null>(null);

  useEffect(() => {
    async function loadMetrics() {
      setLoading(true);
      try {
        const data = await governmentService.getGovernmentOverview();
        setMetrics(data);
      } finally {
        setLoading(false);
      }
    }
    loadMetrics();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Top Governance Directive Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-6) var(--space-8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.785rem', fontWeight: 600, marginBottom: 8 }}>
            <Landmark size={14} color="#38bdf8" />
            <span>State &amp; National Skill Mission Control</span>
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 4 }}>
            Workforce Alignment &amp; Institutional Allocation
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            Monitor regional talent supply, allocate trainer capacity, and dispatch data-driven district training interventions.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setCurrentRoute('district-plan')}
        >
          <FileSpreadsheet size={16} />
          Create District Training Plan
        </button>
      </div>

      {/* Macro Telemetry Cards (Strict No-Fake-Numbers) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard
          title="Monitored Institutions"
          value={metrics?.totalMonitoredInstitutions || null}
          icon={Building2}
          loading={loading}
          emptyMessage="Awaiting institutional registry"
          subtitle="Engineering colleges & polytechnics"
        />

        <MetricCard
          title="Students Impacted"
          value={metrics?.totalStudentsCovered ? metrics.totalStudentsCovered.toLocaleString() : null}
          icon={Users}
          loading={loading}
          emptyMessage="Awaiting enrollment data"
          subtitle="Graduating technical talent"
        />

        <MetricCard
          title="Critical Regional Gaps"
          value={metrics?.criticalSkillGapCount || null}
          icon={AlertOctagon}
          loading={loading}
          emptyMessage="Awaiting crisis radar"
          subtitle="High-deficit districts"
          onAction={() => setCurrentRoute('crisis')}
          actionLabel="View Radar"
        />

        <MetricCard
          title="Active Training Programs"
          value={metrics?.activeTrainingProgramsCount || null}
          icon={GraduationCap}
          loading={loading}
          emptyMessage="Awaiting program metrics"
          subtitle="State-funded upskilling modules"
        />
      </div>

      {/* Policy Action Workbenches */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
        {/* District Needs Overview */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header">
            <div>
              <h3 className="card-title">Priority District Skill Deficits</h3>
              <p className="card-subtitle">Immediate intervention required</p>
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setCurrentRoute('crisis')}
              style={{ fontSize: '0.785rem' }}
            >
              Open Radar &rarr;
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { district: 'Pune District, Maharashtra', shortage: 'EV Powertrain & BMS Systems', severity: 'Critical', action: 'Equip 12 polytechnics with high-voltage labs' },
              { district: 'Mysuru District, Karnataka', shortage: 'Semiconductor Layout & VLSI', severity: 'High', action: 'Launch 6-month specialized EDA tooling diploma' },
              { district: 'Gautam Buddha Nagar, UP', shortage: 'Industrial IoT & SMT Operations', severity: 'High', action: 'Subsidize electronics assembly certifications' },
            ].map((d, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    {d.district}
                  </span>
                  <Badge variant={d.severity === 'Critical' ? 'critical' : 'warning'} size="sm">
                    {d.severity}
                  </Badge>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--zuno-primary-800)', fontWeight: 600 }}>
                  Shortage: {d.shortage}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <strong>Recommendation:</strong> {d.action}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Allocation Checklist */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header">
            <div>
              <h3 className="card-title">Institutional Equipment &amp; Trainer Upgrades</h3>
              <p className="card-subtitle">Budget recommendations for upcoming academic cycle</p>
            </div>
            <Landmark size={18} color="var(--zuno-primary-600)" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { title: 'Cloud-Native & AI Computing Benches', target: '28 State Colleges', status: 'Priority 1', budget: 'State Skill Fund' },
              { title: 'Faculty Training-of-Trainers (ToT) in Cyber Defense', target: '120 Faculty Members', status: 'Approved', budget: 'National Technical Mission' },
              { title: 'Advanced PCB Prototyping Cleanrooms', target: '8 Regional Polytechnics', status: 'Reviewing', budget: 'Infrastructure Grant' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Target: {item.target} • Scheme: {item.budget}
                  </div>
                </div>
                <Badge variant="purple" size="sm">
                  {item.status}
                </Badge>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', marginTop: 'auto' }}
              onClick={() => setCurrentRoute('reports')}
            >
              Export Budget Briefing Report
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
