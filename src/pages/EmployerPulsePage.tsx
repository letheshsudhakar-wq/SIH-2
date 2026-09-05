// ==========================================
// PAGE 9: EMPLOYER PULSE (Industry Demand Intake)
// ==========================================

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { employerService } from '../services/employerService';
import { EmployerFeedbackSubmission } from '../types';
import { Building2, Send, CheckCircle2, Plus, X, AlertCircle, Sparkles } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const EmployerPulsePage: React.FC = () => {
  const { addToast } = useApp();

  const [formData, setFormData] = useState<EmployerFeedbackSubmission>({
    companyName: '',
    industry: 'Information Technology',
    companySize: '201-1000',
    location: 'Bengaluru, Karnataka',
    targetJobRole: '',
    skillsNeeded: ['Docker', 'FastAPI'],
    skillsDifficultToFind: ['Kubernetes Orchestration', 'Distributed Systems'],
    requiredProficiency: 'Advanced',
    hiringDifficultyLevel: 'High',
    expectedHiringNext12Months: 15,
    willingToProvideInternships: true,
    notesOrBottlenecks: '',
  });

  const [neededInput, setNeededInput] = useState('');
  const [difficultInput, setDifficultInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const addSkillNeeded = () => {
    if (neededInput.trim() && !formData.skillsNeeded.includes(neededInput.trim())) {
      setFormData((prev) => ({ ...prev, skillsNeeded: [...prev.skillsNeeded, neededInput.trim()] }));
      setNeededInput('');
    }
  };

  const removeSkillNeeded = (sk: string) => {
    setFormData((prev) => ({ ...prev, skillsNeeded: prev.skillsNeeded.filter((s) => s !== sk) }));
  };

  const addSkillDifficult = () => {
    if (difficultInput.trim() && !formData.skillsDifficultToFind.includes(difficultInput.trim())) {
      setFormData((prev) => ({ ...prev, skillsDifficultToFind: [...prev.skillsDifficultToFind, difficultInput.trim()] }));
      setDifficultInput('');
    }
  };

  const removeSkillDifficult = (sk: string) => {
    setFormData((prev) => ({ ...prev, skillsDifficultToFind: prev.skillsDifficultToFind.filter((s) => s !== sk) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName.trim() || !formData.targetJobRole.trim()) {
      addToast({ type: 'error', title: 'Validation Error', message: 'Please provide company name and target role.' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await employerService.submitFeedback(formData);
      if (res.success) {
        setSubmittedSuccess(true);
        addToast({
          type: 'success',
          title: 'Feedback Recorded',
          message: 'Your hiring signals have been integrated into Zuno Market Intelligence.',
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header Statement */}
      <div
        className="card"
        style={{
          padding: 'var(--space-6)',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ede9fe 100%)',
          borderColor: 'var(--zuno-primary-200)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--zuno-primary-600)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Building2 size={18} />
          </div>
          <span className="badge badge-purple">Industry Telemetry Channel</span>
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Employer Skill Bottleneck Intake
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.5 }}>
          Tell Zuno what skills are scarce in today&apos;s candidate pool. Your direct hiring signals feed national curriculum modernization and regional training programs.
        </p>
      </div>

      {/* Main Intake Form */}
      {submittedSuccess ? (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-10) var(--space-6)' }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: '50%',
              backgroundColor: 'var(--status-success-bg)',
              color: 'var(--status-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-4)',
            }}
          >
            <CheckCircle2 size={28} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>
            Hiring Signal Telemetry Logged
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: 460, margin: '0 auto var(--space-5)' }}>
            Thank you for contributing to India&apos;s workforce alignment. Your inputs for <strong>{formData.targetJobRole}</strong> have been queued into the national skill shortage index.
          </p>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => {
              setSubmittedSuccess(false);
              setFormData((prev) => ({ ...prev, targetJobRole: '' }));
            }}
          >
            Submit Another Role Telemetry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Company Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Company / Organization Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Razorpay, Infosys, Zoho"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Industry Sector</label>
              <select
                className="form-select"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              >
                <option value="Information Technology">Information Technology</option>
                <option value="Semiconductors & VLSI">Semiconductors & VLSI</option>
                <option value="Electric Vehicles & Auto">Electric Vehicles & Auto</option>
                <option value="FinTech & Banking">FinTech & Banking</option>
                <option value="HealthTech & BioTech">HealthTech & BioTech</option>
                <option value="Renewable Energy">Renewable Energy</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Company Size</label>
              <select
                className="form-select"
                value={formData.companySize}
                onChange={(e) => setFormData({ ...formData, companySize: e.target.value as any })}
              >
                <option value="1-50">Startup (1-50 employees)</option>
                <option value="51-200">Mid-Market (51-200 employees)</option>
                <option value="201-1000">Enterprise (201-1000 employees)</option>
                <option value="1000+">Global Corp (1000+ employees)</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Primary Hiring Location</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Bengaluru / Remote"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />

          {/* Role & Skills Under Shortage */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Target Role Under Recruitment</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Senior Backend Engineer / AI Application Developer"
              value={formData.targetJobRole}
              onChange={(e) => setFormData({ ...formData, targetJobRole: e.target.value })}
              required
            />
          </div>

          {/* Hard-to-Find Skills Tag Input */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Skills That Are Most Difficult to Find in Candidates</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input
                type="text"
                className="form-input"
                placeholder="Type a skill and click Add (e.g. Kubernetes, Vector Databases)..."
                value={difficultInput}
                onChange={(e) => setDifficultInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkillDifficult();
                  }
                }}
              />
              <button type="button" className="btn btn-secondary btn-sm" onClick={addSkillDifficult}>
                <Plus size={14} /> Add
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {formData.skillsDifficultToFind.map((sk) => (
                <span key={sk} className="badge badge-critical" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>
                  {sk}
                  <X size={13} style={{ cursor: 'pointer', marginLeft: 4 }} onClick={() => removeSkillDifficult(sk)} />
                </span>
              ))}
            </div>
          </div>

          {/* Proficiency & Difficulty Level */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Required Proficiency Level</label>
              <select
                className="form-select"
                value={formData.requiredProficiency}
                onChange={(e) => setFormData({ ...formData, requiredProficiency: e.target.value as any })}
              >
                <option value="Intermediate">Intermediate (Hands-on experience)</option>
                <option value="Advanced">Advanced (Production scale)</option>
                <option value="Expert">Expert (System design & lead)</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Current Hiring Bottleneck Severity</label>
              <select
                className="form-select"
                value={formData.hiringDifficultyLevel}
                onChange={(e) => setFormData({ ...formData, hiringDifficultyLevel: e.target.value as any })}
              >
                <option value="Moderate">Moderate (Takes 30-45 days)</option>
                <option value="High">High (Takes 60-90 days)</option>
                <option value="Extreme">Extreme (Severe candidate shortage &gt;90 days)</option>
              </select>
            </div>
          </div>

          {/* Notes / Bottlenecks */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Qualitative Feedback (Why are candidates falling short?)</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="e.g. Candidates know syntax from textbook courses but lack hands-on experience with debugging distributed systems, CI/CD, or writing production test suites."
              value={formData.notesOrBottlenecks}
              onChange={(e) => setFormData({ ...formData, notesOrBottlenecks: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" disabled={submitting} style={{ width: '100%' }}>
            <Send size={16} />
            {submitting ? 'Submitting Signal...' : 'Submit Employer Telemetry'}
          </button>
        </form>
      )}
    </div>
  );
};
