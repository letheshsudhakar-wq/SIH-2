// ==========================================
// PAGE 10: STUDENT SKILL GAP (Diagnostic Tool)
// ==========================================

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Plus, X } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const StudentSkillGapPage: React.FC = () => {
  const { addToast } = useApp();

  const [targetRole, setTargetRole] = useState('AI Systems Engineer');
  const [experienceLevel, setExperienceLevel] = useState('Student');
  const [currentSkills, setCurrentSkills] = useState<string[]>(['Python', 'Git', 'Data Structures', 'SQL']);
  const [skillInput, setSkillInput] = useState('');
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const addSkill = () => {
    if (skillInput.trim() && !currentSkills.includes(skillInput.trim())) {
      setCurrentSkills([...currentSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (sk: string) => {
    setCurrentSkills(currentSkills.filter((s) => s !== sk));
  };

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    await new Promise((res) => setTimeout(res, 800));
    setIsEvaluating(false);
    setHasEvaluated(true);
    addToast({
      type: 'success',
      title: 'Readiness Evaluated',
      message: 'Generated personalized skill gap analysis and pathway recommendations.',
    });
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header Context */}
      <div className="card" style={{ padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--zuno-primary-50)',
              color: 'var(--zuno-primary-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <GraduationCap size={18} />
          </div>
          <span className="badge badge-purple">Candidate Career Alignment</span>
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Student Competency &amp; Skill Gap Diagnostic
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 4 }}>
          Evaluate your current coursework and practical competencies against verified industry role standards.
        </p>
      </div>

      {/* Diagnostic Form */}
      <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Aspirational Target Role</label>
            <select
              className="form-select"
              value={targetRole}
              onChange={(e) => {
                setTargetRole(e.target.value);
                setHasEvaluated(false);
              }}
            >
              <option value="AI Systems Engineer">AI Systems Engineer</option>
              <option value="Cloud Platform Architect">Cloud Platform Architect</option>
              <option value="Fullstack Software Engineer">Fullstack Software Engineer</option>
              <option value="VLSI Physical Design Engineer">VLSI Physical Design Engineer</option>
              <option value="Cybersecurity Threat Analyst">Cybersecurity Threat Analyst</option>
              <option value="Data Platform Engineer">Data Platform Engineer</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Current Experience Tier</label>
            <select
              className="form-select"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
            >
              <option value="Student">Undergraduate Student (Year 3/4)</option>
              <option value="Entry-Level">Fresh Graduate / Entry-Level (0-1 yrs)</option>
              <option value="Junior">Junior Engineer (1-2 yrs)</option>
            </select>
          </div>
        </div>

        {/* Current Skills List */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Your Current Competencies &amp; Tools</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <input
              type="text"
              className="form-input"
              placeholder="Add your known skills (e.g. PyTorch, Linux, Java)..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <button type="button" className="btn btn-secondary btn-sm" onClick={addSkill}>
              <Plus size={14} /> Add
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {currentSkills.map((sk) => (
              <span key={sk} className="badge badge-purple" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>
                {sk}
                <X size={13} style={{ cursor: 'pointer', marginLeft: 4 }} onClick={() => removeSkill(sk)} />
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleEvaluate}
          disabled={isEvaluating}
          style={{ width: '100%' }}
        >
          <Sparkles size={16} />
          {isEvaluating ? 'Evaluating Industry Baseline...' : 'Analyze My Skill Gap'}
        </button>
      </div>

      {/* Evaluation Results */}
      {hasEvaluated && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Readiness Score Card */}
          <div
            className="card"
            style={{
              padding: 'var(--space-6)',
              background: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)',
              borderColor: 'var(--zuno-primary-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <span className="badge badge-purple" style={{ marginBottom: 4 }}>
                Diagnostic Result
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Target Role: {targetRole}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Readiness calculation based on active hiring prerequisites in Indian tech clusters.
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Role Match Index
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--zuno-primary-600)' }}>
                58%
              </div>
            </div>
          </div>

          {/* Missing Crucial Skills vs Skills to Upgrade */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            <div className="card" style={{ borderTop: '4px solid var(--status-critical)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <AlertTriangle size={18} color="var(--status-critical)" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Missing Core Industry Skills</h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                Prerequisites absent from your current skill profile.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Vector Databases (Milvus)', 'Distributed Inference / vLLM', 'Docker Containerization', 'LangChain / RAG'].map((s) => (
                  <Badge key={s} variant="critical" size="sm">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="card" style={{ borderTop: '4px solid var(--status-warning)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <CheckCircle2 size={18} color="var(--status-warning)" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Skills to Deepen</h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                Current skills that need advance project experience.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Python (AsyncIO / Performance)', 'SQL (Query Optimization)', 'Git Branching & CI'].map((s) => (
                  <Badge key={s} variant="warning" size="sm">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Learning Modules */}
          <div className="card" style={{ padding: 'var(--space-6)' }}>
            <div className="card-header">
              <div>
                <h3 className="card-title">Recommended Bridging Curriculum</h3>
                <p className="card-subtitle">Targeted project modules to reach 90%+ industry readiness</p>
              </div>
              <BookOpen size={18} color="var(--zuno-primary-600)" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { title: 'Production RAG Architecture with Milvus & FastAPI', duration: '3 Weeks', focus: 'Vector DBs & Embeddings' },
                { title: 'Containerizing Deep Learning Inference with Docker & Triton', duration: '2 Weeks', focus: 'Model Serving & DevOps' },
                { title: 'Benchmarking & LLM Evaluation Frameworks', duration: '2 Weeks', focus: 'Quality & Observability' },
              ].map((mod, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {mod.title}
                    </div>
                    <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
                      Focus: {mod.focus} • Estimated Duration: {mod.duration}
                    </div>
                  </div>
                  <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
                    Recommended
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
