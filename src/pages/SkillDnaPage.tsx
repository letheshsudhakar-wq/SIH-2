// ==========================================
// PAGE 7: SKILL DNA (Role Competency Blueprints)
// ==========================================

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { skillService } from '../services/skillService';
import { RoleSkillDna } from '../types';
import { SkillDnaGraph } from '../components/dna/SkillDnaGraph';
import { Dna, Sparkles, UserCheck, ChevronRight, Layers, CheckCircle2 } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { Badge } from '../components/common/Badge';

const PRESET_ROLES = [
  { id: 'ai_engineer', title: 'AI / LLM Systems Engineer', industry: 'Artificial Intelligence' },
  { id: 'cloud_architect', title: 'Cloud Platform Architect', industry: 'Cloud & DevOps' },
  { id: 'vlsi_design', title: 'VLSI Physical Design Engineer', industry: 'Semiconductors' },
  { id: 'cyber_defense', title: 'Cybersecurity Threat Hunter', industry: 'Cyber Defense' },
  { id: 'data_platform', title: 'Real-Time Data Platform Engineer', industry: 'Data & Analytics' },
  { id: 'robotics_engineer', title: 'Autonomous Robotics Engineer', industry: 'Robotics & Hardware' },
];

export const SkillDnaPage: React.FC = () => {
  const { userProfile, setCurrentRoute } = useApp();
  const [selectedRoleId, setSelectedRoleId] = useState<string>('ai_engineer');
  const [loading, setLoading] = useState(false);
  const [dnaData, setDnaData] = useState<RoleSkillDna | null>(null);

  useEffect(() => {
    async function loadDna() {
      setLoading(true);
      try {
        const data = await skillService.getSkillDnaForRole(selectedRoleId);
        if (data) {
          setDnaData(data);
        } else {
          // Provide structural baseline DNA representation for the selected role
          const roleMeta = PRESET_ROLES.find((r) => r.id === selectedRoleId) || PRESET_ROLES[0];
          setDnaData({
            roleId: roleMeta.id,
            roleTitle: roleMeta.title,
            industry: roleMeta.industry,
            description: `Production capability architecture and skill relationships required for ${roleMeta.title}.`,
            coreSkills: [
              { id: 'c1', name: 'Transformer Architectures & Attention', type: 'core', importanceWeight: 95, proficiencyNeeded: 'Mastery', connectedSkillIds: ['PyTorch', 'Vector Databases'] },
              { id: 'c2', name: 'Retrieval Augmented Generation (RAG)', type: 'core', importanceWeight: 90, proficiencyNeeded: 'Advanced', connectedSkillIds: ['Embeddings', 'LangChain'] },
              { id: 'c3', name: 'Distributed Model Serving & Quantization', type: 'core', importanceWeight: 88, proficiencyNeeded: 'Advanced', connectedSkillIds: ['vLLM', 'Triton Server'] },
            ],
            supportingSkills: [
              { id: 's1', name: 'Vector Indexing (HNSW / IVFFlat)', type: 'supporting', importanceWeight: 82, proficiencyNeeded: 'Advanced', connectedSkillIds: ['Milvus', 'Pinecone'] },
              { id: 's2', name: 'API Gateway Orchestration', type: 'supporting', importanceWeight: 75, proficiencyNeeded: 'Intermediate', connectedSkillIds: ['FastAPI', 'gRPC'] },
              { id: 's3', name: 'Evaluation Harnesses & Benchmarking', type: 'supporting', importanceWeight: 70, proficiencyNeeded: 'Intermediate', connectedSkillIds: ['Ragas', 'DeepEval'] },
            ],
            tools: [
              { id: 't1', name: 'PyTorch / HuggingFace', type: 'tool', importanceWeight: 92, proficiencyNeeded: 'Mastery', connectedSkillIds: ['CUDA'] },
              { id: 't2', name: 'Milvus / Qdrant Vector DB', type: 'tool', importanceWeight: 85, proficiencyNeeded: 'Advanced', connectedSkillIds: ['FastAPI'] },
              { id: 't3', name: 'Docker & Kubernetes (k8s)', type: 'tool', importanceWeight: 80, proficiencyNeeded: 'Intermediate', connectedSkillIds: ['vLLM'] },
            ],
            knowledgeAreas: [
              { id: 'k1', name: 'Linear Algebra & High-Dimensional Spaces', type: 'knowledge', importanceWeight: 88, proficiencyNeeded: 'Advanced', connectedSkillIds: ['Embeddings'] },
              { id: 'k2', name: 'Distributed Systems & Memory Profiling', type: 'knowledge', importanceWeight: 82, proficiencyNeeded: 'Advanced', connectedSkillIds: ['vLLM'] },
            ],
          });
        }
      } finally {
        setLoading(false);
      }
    }
    loadDna();
  }, [selectedRoleId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Role Selector Header */}
      <div className="card" style={{ padding: 'var(--space-5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--zuno-primary-50)',
                  color: 'var(--zuno-primary-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Dna size={16} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Role Skill DNA Blueprints
              </h3>
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Deconstructed industry capability matrices mapping required tools, foundational knowledge, and proficiency weights.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setCurrentRoute('student')}
          >
            <UserCheck size={14} />
            Test Personal Match
          </button>
        </div>

        {/* Roles Pill Tabs */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {PRESET_ROLES.map((role) => {
            const isSelected = selectedRoleId === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRoleId(role.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSelected ? 'var(--zuno-primary-600)' : 'var(--bg-surface-subtle)',
                  color: isSelected ? '#ffffff' : 'var(--text-primary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.825rem',
                  border: `1px solid ${isSelected ? 'var(--zuno-primary-700)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {role.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main DNA Graph View */}
      {loading ? (
        <SkeletonLoader type="card" count={4} />
      ) : (
        <SkillDnaGraph dna={dnaData} />
      )}
    </div>
  );
};
