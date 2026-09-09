// ==========================================
// PAGE 1: ZUNO HOME / OVERVIEW
// ==========================================

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { marketService } from '../services/marketService';
import { skillService } from '../services/skillService';
import { 
  TrendingUp, 
  Sparkles, 
  Stethoscope, 
  AlertOctagon, 
  FileText, 
  Briefcase, 
  Flame, 
  ArrowRight
} from 'lucide-react';
import { MetricCard } from '../components/common/MetricCard';
import { MinimalChart } from '../components/charts/MinimalChart';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { Skill, SkillDemandMetrics } from '../types';

export const OverviewPage: React.FC = () => {
  const { setCurrentRoute, setSelectedSkillId, addToast } = useApp();
  const [loading, setLoading] = useState(true);
  const [marketMetrics, setMarketMetrics] = useState<SkillDemandMetrics | null>(null);
  const [emergingSkills, setEmergingSkills] = useState<Skill[] | null>(null);

  useEffect(() => {
    async function loadOverview() {
      setLoading(true);
      try {
        const [metrics, emerging] = await Promise.all([
          marketService.getMarketOverview(),
          skillService.getEmergingSkills(),
        ]);
        setMarketMetrics(metrics);
        setEmergingSkills(emerging);
      } finally {
        setLoading(false);
      }
    }
    loadOverview();
  }, []);

  const quickActions = [
    {
      title: 'Analyze Curriculum',
      desc: 'Upload a syllabus to detect obsolete topics & missing industry skills.',
      icon: Stethoscope,
      route: 'curriculum' as const,
      color: 'var(--zuno-primary-600)',
      bg: 'var(--zuno-primary-50)',
    },
    {
      title: 'Explore Labour Market',
      desc: 'Analyze hiring volume, in-demand capabilities and company signals.',
      icon: TrendingUp,
      route: 'labour-market' as const,
      color: '#0ea5e9',
      bg: '#f0f9ff',
    },
    {
      title: 'Check Skill Crisis',
      desc: 'Identify regional talent shortages across Indian states & districts.',
      icon: AlertOctagon,
      route: 'crisis' as const,
      color: '#ef4444',
      bg: '#fef2f2',
    },
    {
      title: 'Generate Briefing Report',
      desc: 'Export executive-ready curriculum and labour market audit documents.',
      icon: FileText,
      route: 'reports' as const,
      color: '#10b981',
      bg: '#ecfdf5',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Top Banner Statement */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-6) var(--space-8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.12)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.785rem', fontWeight: 600, marginBottom: 12 }}>
            <Sparkles size={13} color="#a78bfa" />
            <span>National Labour Intelligence Platform</span>
          </div>
          <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 6 }}>
            Preparing India for the jobs of tomorrow.
          </h2>
          <p style={{ color: '#c7d2fe', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Zuno helps institutions and governments understand industry demand, identify skill gaps and align educational curricula with the real labour market.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-primary"
            style={{ background: '#ffffff', color: 'var(--zuno-primary-900)' }}
            onClick={() => setCurrentRoute('curriculum')}
          >
            <Stethoscope size={16} color="var(--zuno-primary-700)" />
            Upload Curriculum
          </button>
          <button
            type="button"
            className="btn btn-outline"
            style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}
            onClick={() => setCurrentRoute('crisis')}
          >
            <AlertOctagon size={16} />
            Explore Crisis Radar
          </button>
        </div>
      </div>

      {/* A. Market Overview Telemetry Cards (Strict No Fake Data - Empty/Awaiting State) */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Market Telemetry Overview
          </h3>
          <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
            Awaiting real-time backend telemetry
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
          <MetricCard
            title="Active Job Demand"
            value={marketMetrics?.totalJobsIdentified ? `${marketMetrics.totalJobsIdentified.toLocaleString()}` : null}
            change={marketMetrics?.growthYoY ? `${marketMetrics.growthYoY}% YoY` : null}
            icon={Briefcase}
            loading={loading}
            emptyMessage="Awaiting market telemetry"
            subtitle="Verified job requirements tracked"
            onAction={() => setCurrentRoute('labour-market')}
            actionLabel="Explore"
          />

          <MetricCard
            title="In-Demand Skills"
            value={marketMetrics?.topSkillNames ? `${marketMetrics.topSkillNames.length} Skills` : null}
            icon={Sparkles}
            loading={loading}
            emptyMessage="Awaiting skill clusters"
            subtitle="Skills actively recruited"
            onAction={() => setCurrentRoute('skills')}
            actionLabel="View"
          />

          <MetricCard
            title="Emerging Capabilities"
            value={emergingSkills ? `${emergingSkills.length} High-Growth` : null}
            icon={Flame}
            loading={loading}
            emptyMessage="Awaiting capability data"
            subtitle="Rapidly accelerating toolsets"
            onAction={() => setCurrentRoute('skills')}
            actionLabel="Skills"
          />

          <MetricCard
            title="Critical Skill Gaps"
            value={marketMetrics?.marketSupplyGap ? `${marketMetrics.marketSupplyGap}% Gap` : null}
            isPositive={false}
            icon={AlertOctagon}
            loading={loading}
            emptyMessage="Awaiting regional data"
            subtitle="Imbalances between supply and demand"
            onAction={() => setCurrentRoute('crisis')}
            actionLabel="Radar"
          />
        </div>
      </section>

      {/* B. Market Pulse & Emerging Skills Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.4fr) minmax(280px, 1fr)', gap: 'var(--space-6)' }}>
        {/* Market Pulse Chart Card */}
        <MinimalChart
          type="line"
          title="Market Pulse & Hiring Velocity"
          subtitle="Real-time macro skill demand index across high-growth engineering domains"
          data={null} // Faithfully empty until real API connects
          loading={loading}
          emptyTitle="No market data connected"
          emptyDescription="Connect a live job telemetry pipeline or API endpoint in Settings to visualize hiring momentum."
          actionText="Connect Data Source"
          onAction={() => setCurrentRoute('settings')}
          height={220}
        />

        {/* Emerging Skills Telemetry List */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header">
            <div>
              <h3 className="card-title">Emerging Skills Radar</h3>
              <p className="card-subtitle">Highest velocity technical requirements</p>
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setCurrentRoute('skills')}
              style={{ fontSize: '0.775rem' }}
            >
              View All
            </button>
          </div>

          {!emergingSkills || emergingSkills.length === 0 ? (
            <EmptyState
              icon={Sparkles}
              title="No emerging skills data"
              description="Awaiting continuous industry stream to detect novel competencies."
              compact
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {emergingSkills.map((sk) => (
                <div
                  key={sk.id}
                  onClick={() => {
                    setSelectedSkillId(sk.id);
                    setCurrentRoute('skills');
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    {sk.name}
                  </span>
                  <Badge variant="purple" size="sm">
                    {sk.category}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* F. Quick Action Launchers */}
      <section>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
          Quick Action Workflows
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <div
                key={idx}
                className="card card-interactive"
                onClick={() => setCurrentRoute(action.route)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 'var(--space-4)',
                }}
              >
                <div>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: action.bg,
                      color: action.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                    {action.title}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    {action.desc}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: '0.785rem',
                    fontWeight: 700,
                    color: 'var(--zuno-primary-600)',
                    marginTop: 'var(--space-3)',
                  }}
                >
                  Launch
                  <ArrowRight size={13} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
