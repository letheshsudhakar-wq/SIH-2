// ==========================================
// CURRICULUM DIFF & PROPOSAL VIEWER
// ==========================================

import React, { useState } from 'react';
import { ImprovedModuleDiff } from '../../types';
import { PlusCircle, MinusCircle, ArrowRight, Wrench, Clock, Check, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

interface CurriculumDiffViewerProps {
  diffs: ImprovedModuleDiff[];
  onApplyChanges?: () => void;
}

export const CurriculumDiffViewer: React.FC<CurriculumDiffViewerProps> = ({
  diffs,
  onApplyChanges,
}) => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  if (!diffs || diffs.length === 0) {
    return null;
  }

  const currentModule = diffs[activeModuleIndex] || diffs[0];

  return (
    <div className="card" style={{ padding: 'var(--space-6)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-5)', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-purple">
              <Sparkles size={12} /> AI Proposed Modernization
            </span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Curriculum Modernization Blueprint
            </h3>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Side-by-side modular upgrades replacing obsolete constructs with current industry practices.
          </p>
        </div>

        {onApplyChanges && (
          <button type="button" className="btn btn-primary btn-sm" onClick={onApplyChanges}>
            <Check size={14} />
            Export Modernized Syllabus
          </button>
        )}
      </div>

      {/* Module Selector Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 'var(--space-2)',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: 'var(--space-5)',
        }}
      >
        {diffs.map((mod, idx) => {
          const isActive = idx === activeModuleIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveModuleIndex(idx)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--zuno-primary-50)' : 'var(--bg-surface-subtle)',
                color: isActive ? 'var(--zuno-primary-700)' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.825rem',
                border: `1px solid ${isActive ? 'var(--zuno-primary-300)' : 'var(--border-subtle)'}`,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>Module {mod.moduleNumber}:</span>
              <span>{mod.moduleName}</span>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: mod.changeType === 'modified' ? 'var(--status-warning)' : 'var(--status-success)',
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Detailed Module Diff Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-5)' }}>
        {/* Left: Current Syllabus */}
        <div
          style={{
            padding: 'var(--space-4)',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Current Syllabus
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={12} /> {currentModule.practicalHours.before}h Labs
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {currentModule.currentTopics.map((topic, i) => (
              <div
                key={i}
                style={{
                  padding: '8px 10px',
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.825rem',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {topic}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Proposed Upgrade */}
        <div
          style={{
            padding: 'var(--space-4)',
            backgroundColor: 'var(--zuno-primary-50)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--zuno-primary-200)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--zuno-primary-800)', textTransform: 'uppercase' }}>
              Zuno Proposed Modernization
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--zuno-primary-700)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={12} /> {currentModule.practicalHours.proposed}h Labs (+{currentModule.practicalHours.proposed - currentModule.practicalHours.before}h)
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 'var(--space-4)' }}>
            {currentModule.proposedTopics.map((topic, i) => (
              <div
                key={i}
                style={{
                  padding: '8px 10px',
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  border: '1px solid var(--zuno-primary-200)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <PlusCircle size={14} color="var(--status-success)" />
                {topic}
              </div>
            ))}
          </div>

          {/* New Tools Introduced */}
          {currentModule.newTools && currentModule.newTools.length > 0 && (
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--zuno-primary-900)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Wrench size={12} /> Industry Toolsets Integrated
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {currentModule.newTools.map((t) => (
                  <Badge key={t} variant="purple" size="sm">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Rationale */}
          <div
            style={{
              padding: '8px 10px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.785rem',
              color: 'var(--text-secondary)',
              borderLeft: '3px solid var(--zuno-primary-600)',
            }}
          >
            <strong>Industry Rationale:</strong> {currentModule.rationale}
          </div>
        </div>
      </div>
    </div>
  );
};
