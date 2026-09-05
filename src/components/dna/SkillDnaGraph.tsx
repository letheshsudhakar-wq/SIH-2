// ==========================================
// SKILL DNA VISUALIZER COMPONENT
// ==========================================

import React, { useState } from 'react';
import { RoleSkillDna, SkillDnaNode } from '../../types';
import { Badge } from '../common/Badge';
import { Dna, CheckCircle2, Zap, Wrench, BookOpen, Layers } from 'lucide-react';

interface SkillDnaGraphProps {
  dna: RoleSkillDna | null;
  onSelectNode?: (node: SkillDnaNode) => void;
}

export const SkillDnaGraph: React.FC<SkillDnaGraphProps> = ({ dna, onSelectNode }) => {
  const [selectedNode, setSelectedNode] = useState<SkillDnaNode | null>(null);

  if (!dna) return null;

  const handleNodeClick = (node: SkillDnaNode) => {
    setSelectedNode(node);
    if (onSelectNode) onSelectNode(node);
  };

  const sections = [
    { title: 'Core Architectural Capabilities', icon: Zap, color: '#7c3aed', items: dna.coreSkills, tag: 'Must-Have' },
    { title: 'Supporting & Applied Skills', icon: Layers, color: '#6366f1', items: dna.supportingSkills, tag: 'High-Impact' },
    { title: 'Industry Toolsets & Platforms', icon: Wrench, color: '#0ea5e9', items: dna.tools, tag: 'Execution' },
    { title: 'Foundational Knowledge Areas', icon: BookOpen, color: '#10b981', items: dna.knowledgeAreas, tag: 'Theory' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1.4fr) minmax(260px, 1fr)', gap: 'var(--space-6)' }}>
      {/* Left: Capability Matrix */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {sections.map((sec, idx) => (
          <div key={idx} className="card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <sec.icon size={16} color={sec.color} />
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {sec.title}
                </span>
              </div>
              <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                {sec.items.length} Elements
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {sec.items.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => handleNodeClick(node)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isSelected ? 'var(--zuno-primary-600)' : 'var(--bg-surface-subtle)',
                      color: isSelected ? '#ffffff' : 'var(--text-primary)',
                      border: `1px solid ${isSelected ? 'var(--zuno-primary-700)' : 'var(--border-subtle)'}`,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    <span>{node.name}</span>
                    <span
                      style={{
                        fontSize: '0.675rem',
                        padding: '1px 4px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)',
                        color: isSelected ? '#ffffff' : 'var(--text-muted)',
                      }}
                    >
                      {node.importanceWeight}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Right: Selected Node Telemetry */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--zuno-primary-600)', marginBottom: 4 }}>
            <Dna size={16} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
              DNA Node Telemetry
            </span>
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {selectedNode ? selectedNode.name : 'Select a capability node'}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
            {selectedNode
              ? `Required for ${dna.roleTitle} in ${dna.industry}`
              : 'Click any node to view importance weighting, required proficiency, and market expectations.'}
          </p>
        </div>

        {selectedNode ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                Role Importance Weight
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, height: 8, backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${selectedNode.importanceWeight}%`,
                      backgroundColor: 'var(--zuno-primary-600)',
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {selectedNode.importanceWeight}%
                </span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                Required Industry Proficiency
              </div>
              <Badge variant="purple">{selectedNode.proficiencyNeeded}</Badge>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                Connected Capabilities
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {selectedNode.connectedSkillIds.map((c) => (
                  <Badge key={c} variant="neutral" size="sm">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--text-muted)', padding: 'var(--space-6)' }}>
            <p style={{ fontSize: '0.85rem' }}>
              Select any skill from the left matrix to examine industry importance and prerequisite links.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
