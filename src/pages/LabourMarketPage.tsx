// ==========================================
// PAGE 2: LABOUR MARKET INTELLIGENCE
// ==========================================

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { marketService } from '../services/marketService';
import { LabourMarketData, LabourMarketFilters } from '../types';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Briefcase, 
  MapPin, 
  Building, 
  Clock, 
  DollarSign,
  ChevronDown,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { Badge } from '../components/common/Badge';
import { MinimalChart } from '../components/charts/MinimalChart';

export const LabourMarketPage: React.FC = () => {
  const { setCurrentRoute } = useApp();
  const [loading, setLoading] = useState(false);
  const [marketData, setMarketData] = useState<LabourMarketData | null>(null);

  // Filter State
  const [filters, setFilters] = useState<LabourMarketFilters>({
    role: '',
    skill: '',
    location: '',
    industry: '',
    experienceLevel: '',
    timePeriod: '6M',
    searchQuery: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await marketService.getLabourMarketData(filters);
      setMarketData(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters.timePeriod]);

  const handleFilterChange = (key: keyof LabourMarketFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Search & Filter Bar */}
      <div className="card" style={{ padding: 'var(--space-4)' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {/* Top Search Row */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: 14, top: 12, color: 'var(--text-subtle)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: 38 }}
                placeholder="Search job titles, skills (e.g. AI Architect, Kubernetes, VLSI Design)..."
                value={filters.searchQuery || ''}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Filter size={15} />
              Filter Signals
            </button>
          </div>

          {/* Filters Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
            {/* Industry */}
            <select
              className="form-select"
              value={filters.industry || ''}
              onChange={(e) => handleFilterChange('industry', e.target.value)}
            >
              <option value="">All Industries</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Semiconductors & VLSI">Semiconductors & VLSI</option>
              <option value="Healthcare & BioTech">Healthcare & BioTech</option>
              <option value="Automotive & EV">Automotive & EV</option>
              <option value="Banking & FinTech">Banking & FinTech</option>
              <option value="Renewable Energy">Renewable Energy</option>
            </select>

            {/* Location */}
            <select
              className="form-select"
              value={filters.location || ''}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              <option value="">All Regions / Hubs</option>
              <option value="Bengaluru Urban">Bengaluru Urban</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              <option value="NCR (Gurugram / Noida)">NCR (Gurugram / Noida)</option>
              <option value="Chennai">Chennai</option>
              <option value="Mumbai Metropolitan">Mumbai Metropolitan</option>
            </select>

            {/* Experience */}
            <select
              className="form-select"
              value={filters.experienceLevel || ''}
              onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
            >
              <option value="">Experience Level</option>
              <option value="0-2">Entry Level (0-2 Yrs)</option>
              <option value="3-5">Mid Level (3-5 Yrs)</option>
              <option value="6+">Senior / Principal (6+ Yrs)</option>
            </select>

            {/* Time Horizon Pill Group */}
            <div
              style={{
                display: 'flex',
                backgroundColor: 'var(--bg-surface-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 3,
                border: '1px solid var(--border-subtle)',
              }}
            >
              {(['1M', '3M', '6M', '1Y', 'All'] as const).map((period) => (
                <button
                  key={period}
                  type="button"
                  onClick={() => handleFilterChange('timePeriod', period)}
                  style={{
                    flex: 1,
                    padding: '6px 0',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: filters.timePeriod === period ? '#ffffff' : 'transparent',
                    color: filters.timePeriod === period ? 'var(--zuno-primary-700)' : 'var(--text-muted)',
                    boxShadow: filters.timePeriod === period ? 'var(--shadow-xs)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* Main Labour Market Content */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <SkeletonLoader type="chart" height={260} />
          <SkeletonLoader type="table" count={5} />
        </div>
      ) : !marketData ? (
        <EmptyState
          icon={TrendingUp}
          title="No labour market data available"
          description="Connect a live job telemetry data source or configure API endpoints to begin analyzing industry demand signals."
          actionText="Configure Data Source"
          onAction={() => setCurrentRoute('settings')}
          secondaryActionText="Refresh Telemetry"
          onSecondaryAction={loadData}
          badgeText="Awaiting Telemetry"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Charts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-5)' }}>
            <MinimalChart
              type="bar"
              title="Demand by Critical Skill"
              subtitle="Aggregated posting volume across key competencies"
              data={marketData.demandBySkill.map((s) => ({ label: s.skill, value: s.postingsCount || 0 }))}
            />

            <MinimalChart
              type="donut"
              title="Regional Hiring Intensity"
              subtitle="Distribution of demand across economic clusters"
              data={marketData.demandByLocation.map((l) => ({ label: l.location, value: l.intensityScore || 0 }))}
            />
          </div>

          {/* Demand by Role Table */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--border-subtle)' }}>
              <h3 className="card-title">Role Demand & Competency Requirements</h3>
              <p className="card-subtitle">Detailed breakdown of active roles and skill expectations</p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-surface-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
                    <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-secondary)' }}>Target Role</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-secondary)' }}>Industry</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-secondary)' }}>Key Skills Required</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-secondary)' }}>Experience</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-secondary)' }}>Hiring Momentum</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.demandByRole.map((role) => (
                    <tr key={role.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>{role.title}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{role.industry}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {role.keySkills.map((sk) => (
                            <Badge key={sk} variant="purple" size="sm">
                              {sk}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>
                        {role.avgExperienceMinYears}-{role.avgExperienceMaxYears} Years
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <Badge variant="success" size="sm">
                          {role.growthSignal || 'Active'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
