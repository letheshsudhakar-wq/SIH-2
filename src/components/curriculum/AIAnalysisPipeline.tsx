// ==========================================
// AI ANALYSIS PIPELINE PROGRESS COMPONENT
// ==========================================

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, BrainCircuit, Target, AlertTriangle } from 'lucide-react';
import { AnalysisStage } from '../../types';

interface StageItem {
  key: AnalysisStage;
  label: string;
  description: string;
}

const stages: StageItem[] = [
  {
    key: 'reading',
    label: 'Reading Curriculum Document',
    description: 'Parsing modules, topics, lab specifications and prerequisites.',
  },
  {
    key: 'identifying_subjects',
    label: 'Deconstructing Syllabus Structure',
    description: 'Segmenting weekly credit hours, theoretical vs practical balance.',
  },
  {
    key: 'extracting_skills',
    label: 'Extracting Core & Applied Skills',
    description: 'Identifying underlying frameworks, toolsets, and competency taxonomy.',
  },
  {
    key: 'comparing_industry',
    label: 'Comparing with Live Industry Demand',
    description: 'Cross-referencing active job postings, employer feedback & hiring velocity.',
  },
  {
    key: 'detecting_gaps',
    label: 'Detecting Gaps & Outdated Topics',
    description: 'Pinpointing obsolete tools and high-demand missing industry standards.',
  },
  {
    key: 'generating_recommendations',
    label: 'Formulating Actionable Upgrades',
    description: 'Generating replacement topics, practical assignments & trainer needs.',
  },
];

interface AIAnalysisPipelineProps {
  currentStage: AnalysisStage;
  progressPercent: number;
  onCancel?: () => void;
}

export const AIAnalysisPipeline: React.FC<AIAnalysisPipelineProps> = ({
  currentStage,
  progressPercent,
  onCancel,
}) => {
  const getStageStatus = (stageKey: AnalysisStage) => {
    const stageIndex = stages.findIndex((s) => s.key === stageKey);
    const currentIndex = stages.findIndex((s) => s.key === currentStage);

    if (currentIndex > stageIndex || currentStage === 'completed') {
      return 'completed';
    }
    if (currentIndex === stageIndex) {
      return 'active';
    }
    return 'pending';
  };

  return (
    <div className="card" style={{ maxWidth: 720, margin: '0 auto', padding: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--zuno-primary-600), var(--zuno-primary-800))',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Zuno AI Engine in Progress
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Synthesizing curriculum against national labour telemetry
            </p>
          </div>
        </div>

        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--zuno-primary-600)' }}>
          {progressPercent}%
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: '100%',
          height: 6,
          backgroundColor: 'var(--bg-surface-subtle)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          marginBottom: 'var(--space-6)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, var(--zuno-primary-500) 0%, var(--zuno-primary-700) 100%)',
            transition: 'width 0.4s ease',
          }}
        />
      </div>

      {/* Stage Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {stages.map((stage) => {
          const status = getStageStatus(stage.key);

          return (
            <div
              key={stage.key}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                opacity: status === 'pending' ? 0.45 : 1,
                transition: 'opacity var(--transition-fast)',
              }}
            >
              {/* Icon Status */}
              <div style={{ marginTop: 2, flexShrink: 0 }}>
                {status === 'completed' && (
                  <CheckCircle2 size={20} color="var(--status-success)" />
                )}
                {status === 'active' && (
                  <Loader2 size={20} color="var(--zuno-primary-600)" className="spin-animation" style={{ animation: 'spin 1s linear infinite' }} />
                )}
                {status === 'pending' && (
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border: '2px solid var(--border-strong)',
                    }}
                  />
                )}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: status === 'active' ? 700 : 600,
                    color: status === 'active' ? 'var(--zuno-primary-700)' : 'var(--text-primary)',
                  }}
                >
                  {stage.label}
                </div>
                <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  {stage.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
