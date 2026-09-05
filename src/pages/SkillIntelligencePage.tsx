// ==========================================
// PAGE 3: SKILL INTELLIGENCE
// ==========================================

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { skillService } from '../services/skillService';
import { Skill } from '../types';
import { 
  Sparkles, 
  TrendingUp, 
  Flame, 
  TrendingDown, 
  Search, 
  Layers, 
  Wrench, 
  X,
  BookOpen,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { Badge } from '../components/common/Badge';

export const SkillIntelligencePage: React.FC = () => {
  const { selectedSkillId, setSelectedSkillId, setCurrentRoute } = useApp();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<Skill[] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSkillDetail, setActiveSkillDetail] = useState<Skill | null>(null);

  useEffect(() => {
    async function loadSkills() {
      setLoading(true);
      try {
        const data = await skillService.getTopSkills(30);
        setSkills(data);
      } finally {
        setLoading(false);
      }
    }
    loadSkills();
  }, []);

  useEffect(() => {
    if (selectedSkillId && skills) {
      const found = skills.find((s) => s.id === selectedSkillId);
      if (found) setActiveSkillDetail(found);
    }
  }, [selectedSkillId, skills]);

  const categories = ['all', 'technical', 'tool', 'domain', 'emerging', 'soft'];

  const filteredSkills = skills
    ? skills.filter((s) => {
        const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
        return matchesQuery && matchesCat;
      })
    : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Search & Category Filter Bar */}
      <div className="card" style={{ padding: 'var(--space-4)' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
            <Search size={16} style={{ position: 'absolute', left: 14, top: 12, color: 'var(--text-subtle)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: 38 }}
              placeholder="Search skill intelligence database (e.g. LLM Fine-Tuning, Docker, Rust)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  border: `1px solid ${selectedCategory === cat ? 'var(--zuno-primary-500)' : 'var(--border-subtle)'}`,
                  backgroundColor: selectedCategory === cat ? 'var(--zuno-primary-50)' : 'transparent',
                  color: selectedCategory === cat ? 'var(--zuno-primary-700)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Skill List & Detail Panel */}
      {loading ? (
        <SkeletonLoader type="card" count={6} />
      ) : !skills || skills.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="No skill intelligence connected"
          description="Connect job postings or career data feeds to populate the real-time skills taxonomy."
          actionText="Connect Data Source"
          onAction={() => setCurrentRoute('settings')}
          badgeText="Skill Database"
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: activeSkillDetail ? '1fr 380px' : '1fr', gap: 'var(--space-6)' }}>
          {/* Skills Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            {filteredSkills.map((skill) => {
              const isSelected = activeSkillDetail?.id === skill.id;
              return (
                <div
                  key={skill.id}
                  className={`card card-interactive ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    setActiveSkillDetail(skill);
                    setSelectedSkillId(skill.id);
                  }}
                  style={{
                    borderColor: isSelected ? 'var(--zuno-primary-500)' : undefined,
                    backgroundColor: isSelected ? 'var(--zuno-primary-50)' : undefined,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span className="badge badge-purple" style={{ textTransform: 'capitalize' }}>
                        {skill.category}
                      </span>
                      {skill.growthTrajectory && (
                        <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>
                          <TrendingUp size={11} />
                          {skill.growthTrajectory}
                        </span>
                      )}
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                      {skill.name}
                    </h4>
                    {skill.description && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {skill.description}
                      </p>
                    )}
                  </div>

                  <div style={{ marginTop: 'var(--space-3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>Proficiency: {skill.requiredProficiency || 'Intermediate'}</span>
                    <span style={{ color: 'var(--zuno-primary-600)', fontWeight: 600 }}>Inspect &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Skill Inspection Drawer */}
          {activeSkillDetail && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', position: 'sticky', top: 88, maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div>
                  <span className="badge badge-purple" style={{ marginBottom: 4 }}>
                    {activeSkillDetail.category}
                  </span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {activeSkillDetail.name}
                  </h3>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setActiveSkillDetail(null)}
                  style={{ padding: 4 }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Sections */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {activeSkillDetail.description && (
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 4 }}>
                      Competency Scope
                    </div>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {activeSkillDetail.description}
                    </p>
                  </div>
                )}

                {activeSkillDetail.topIndustries && (
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 4 }}>
                      Primary Hiring Industries
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {activeSkillDetail.topIndustries.map((ind) => (
                        <Badge key={ind} variant="neutral" size="sm">
                          {ind}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {activeSkillDetail.topRoles && (
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 4 }}>
                      Associated Roles
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {activeSkillDetail.topRoles.map((role) => (
                        <Badge key={role} variant="purple" size="sm">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {activeSkillDetail.relatedSkills && (
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 4 }}>
                      Complementary Capabilities
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {activeSkillDetail.relatedSkills.map((rel) => (
                        <Badge key={rel} variant="neutral" size="sm">
                          {rel}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ marginTop: 'var(--space-2)' }}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%' }}
                    onClick={() => {
                      setCurrentRoute('curriculum');
                    }}
                  >
                    Check Curriculum Coverage
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
