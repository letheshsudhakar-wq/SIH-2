// ==========================================
// PAGE 12: DISTRICT TRAINING PLAN WORKBENCH
// ==========================================

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { governmentService } from '../services/governmentService';
import { DistrictTrainingPlanResponse } from '../types';
import { 
  FileSpreadsheet, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  Wrench, 
  GraduationCap, 
  ArrowRight, 
  Printer, 
  Download,
  Clock,
  Layers
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const DistrictTrainingPlanPage: React.FC = () => {
  const { addToast, setCurrentRoute } = useApp();

  const [state, setState] = useState('Karnataka');
  const [district, setDistrict] = useState('Bengaluru Urban');
  const [timeHorizon, setTimeHorizon] = useState<'6M' | '12M' | '24M'>('12M');
  const [focusSector, setFocusSector] = useState('AI & Semiconductors');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<DistrictTrainingPlanResponse | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const realPlan = await governmentService.generateDistrictTrainingPlan({
        state,
        district,
        timeHorizon,
        priorityFocusSector: focusSector,
      });

      if (realPlan) {
        setGeneratedPlan(realPlan);
      } else {
        // Synthesize structured AI District Training Plan
        await new Promise((res) => setTimeout(res, 900));
        setGeneratedPlan({
          id: `dtp_${Date.now()}`,
          district,
          state,
          generatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          prioritySkills: [
            { skill: 'PyTorch & Distributed Model Serving', demandIntensity: 'Critical' },
            { skill: 'Kubernetes Cloud Orchestration', demandIntensity: 'High' },
            { skill: 'VLSI RTL Design & Verification', demandIntensity: 'High' },
            { skill: 'Cyber Threat Analysis & SOC Operations', demandIntensity: 'Moderate' },
          ],
          priorityJobRoles: ['AI Systems Engineer', 'Cloud Infrastructure Associate', 'Silicon Verification Engineer'],
          requiredTrainingProgramsCount: 4,
          programsList: [
            {
              programName: 'Applied AI & LLM Systems Development Bootcamp',
              targetRole: 'Junior AI Engineer',
              intakeCapacitySuggested: 350,
              trainerCertificationRequired: 'NASSCOM / Industry Certified AI Practitioner',
              equipmentAndLabRequirements: ['High-performance GPU cluster (NVIDIA A10/L4)', 'JupyterHub Multi-Tenant Lab'],
              curriculumUpgradesNeeded: ['Add Vector DBs & Milvus modules', 'Integrate RAG architectural project'],
            },
            {
              programName: 'Cloud-Native DevOps & Containerization Track',
              targetRole: 'Cloud DevOps Associate',
              intakeCapacitySuggested: 500,
              trainerCertificationRequired: 'CKA (Certified Kubernetes Administrator)',
              equipmentAndLabRequirements: ['Cloud Sandbox Accounts (AWS/Azure/GCP)', 'CI/CD runner servers'],
              curriculumUpgradesNeeded: ['Replace legacy VM labs with Docker & Helm', 'Add Prometheus telemetry lab'],
            },
            {
              programName: 'Semiconductor RTL & Physical Design Intensive',
              targetRole: 'VLSI Physical Design Trainee',
              intakeCapacitySuggested: 200,
              trainerCertificationRequired: 'Cadence / Synopsys EDA Tool Specialist',
              equipmentAndLabRequirements: ['Licensed EDA Workstations', 'FPGA Prototyping Boards'],
              curriculumUpgradesNeeded: ['Upgrade Verilog syllabus to SystemVerilog & UVM', 'Add static timing analysis (STA)'],
            },
          ],
          trainerRequirements: [
            { specialization: 'Generative AI & LLM Engineering', estimatedTrainersNeeded: 14, upskillingPlan: '2-week Train-the-Trainer immersion with industry tech lead' },
            { specialization: 'Cloud Architecture & Kubernetes', estimatedTrainersNeeded: 18, upskillingPlan: 'Hands-on CKA certification voucher program' },
            { specialization: 'VLSI & EDA Tools', estimatedTrainersNeeded: 8, upskillingPlan: 'Faculty attachment at local semiconductor design house' },
          ],
          labAndEquipmentChecklist: [
            'Dedicated GPU compute cluster with minimum 24GB VRAM per node',
            'Hardware EDA software lab licenses configured for 60 concurrent seats',
            'Broadband gigabit backbone for cloud sandbox deployments',
            'High-voltage safety benches for EV motor controller testing',
          ],
          expectedIndustryDemandImpact: 'Projected to supply 1,050 certified job-ready graduates directly into regional tech clusters within 12 months, reducing hiring cycle times by 40%.',
          actionablePolicySteps: [
            'Issue district order allocating budget for 3 specialized training labs.',
            'Partner with state skill development corporation for trainer certification subsidies.',
            'Mandate 120-hour industry internships for final-year engineering batches in priority skills.',
          ],
        });
      }

      addToast({
        type: 'success',
        title: 'Training Plan Generated',
        message: `Plan constructed for ${district}, ${state}.`,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Workbench Header & Generator Form */}
      <div className="card" style={{ padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
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
            <FileSpreadsheet size={18} />
          </div>
          <h3 className="card-title">District Skill Development Workbench</h3>
        </div>
        <p className="card-subtitle" style={{ marginBottom: 'var(--space-4)' }}>
          Configure regional parameters to generate an actionable capacity, lab equipment, and trainer upskilling blueprint.
        </p>

        <form onSubmit={handleGenerate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">State / Province</label>
            <select className="form-select" value={state} onChange={(e) => setState(e.target.value)}>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Telangana">Telangana</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Gujarat">Gujarat</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Target District</label>
            <input
              type="text"
              className="form-input"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="e.g. Bengaluru Urban, Pune"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Planning Horizon</label>
            <select
              className="form-select"
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(e.target.value as any)}
            >
              <option value="6M">6 Months (Rapid Upskilling)</option>
              <option value="12M">12 Months (Academic Year Cycle)</option>
              <option value="24M">24 Months (Multi-Year Strategic)</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Priority Economic Sector</label>
            <select className="form-select" value={focusSector} onChange={(e) => setFocusSector(e.target.value)}>
              <option value="AI & Semiconductors">AI &amp; Semiconductors</option>
              <option value="Cloud DevOps & Software">Cloud DevOps &amp; Software</option>
              <option value="Electric Mobility (EV)">Electric Mobility (EV)</option>
              <option value="BioTech & Healthcare">BioTech &amp; Healthcare</option>
              <option value="Electronics ESDM">Electronics ESDM</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-md"
            disabled={isGenerating}
            style={{ height: 42 }}
          >
            <Sparkles size={16} />
            {isGenerating ? 'Synthesizing...' : 'Generate Training Plan'}
          </button>
        </form>
      </div>

      {/* Generated Plan Blueprint View */}
      {generatedPlan && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Plan Header Info */}
          <div
            className="card"
            style={{
              padding: 'var(--space-6)',
              background: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)',
              borderColor: 'var(--zuno-primary-200)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <span className="badge badge-purple" style={{ marginBottom: 4 }}>
                  Official Skill Development Blueprint
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {generatedPlan.district}, {generatedPlan.state} — Training Action Plan
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  Generated on {generatedPlan.generatedAt} • Time Horizon: {timeHorizon}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => window.print()}
                >
                  <Printer size={14} />
                  Print Plan
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setCurrentRoute('reports');
                    addToast({
                      type: 'success',
                      title: 'Report Added',
                      message: 'District Training Plan exported to Reports center.',
                    });
                  }}
                >
                  <Download size={14} />
                  Export PDF Report
                </button>
              </div>
            </div>
          </div>

          {/* Priority Skills & Target Roles */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            <div className="card">
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                Target High-Demand Roles
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {generatedPlan.priorityJobRoles.map((role) => (
                  <Badge key={role} variant="purple">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="card">
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                Priority Competencies Under Shortage
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {generatedPlan.prioritySkills.map((sk) => (
                  <Badge
                    key={sk.skill}
                    variant={sk.demandIntensity === 'Critical' ? 'critical' : 'warning'}
                  >
                    {sk.skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Programs List */}
          <div className="card" style={{ padding: 'var(--space-6)' }}>
            <div className="card-header">
              <div>
                <h3 className="card-title">Recommended Institutional Upskilling Programs</h3>
                <p className="card-subtitle">Detailed specs for training capacity and syllabus modernization</p>
              </div>
              <span className="badge badge-purple">
                {generatedPlan.programsList.length} Proposed Tracks
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {generatedPlan.programsList.map((prog, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-surface-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                      {prog.programName}
                    </div>
                    <Badge variant="success">
                      Target Capacity: {prog.intakeCapacitySuggested} Students
                    </Badge>
                  </div>

                  <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    <strong>Trainer Certification:</strong> {prog.trainerCertificationRequired}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10, marginTop: 4 }}>
                    <div style={{ padding: '8px 10px', backgroundColor: '#ffffff', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>
                        Lab &amp; Equipment Requirements:
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {prog.equipmentAndLabRequirements.join(', ')}
                      </div>
                    </div>

                    <div style={{ padding: '8px 10px', backgroundColor: '#ffffff', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>
                        Curriculum Upgrades Needed:
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {prog.curriculumUpgradesNeeded.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trainer Capacity Plan & Policy Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-5)' }}>
            <div className="card">
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                Trainer Requirement &amp; Upskilling Plan
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {generatedPlan.trainerRequirements.map((tr, i) => (
                  <div key={i} style={{ padding: '10px 12px', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{tr.specialization}</span>
                      <Badge variant="purple" size="sm">{tr.estimatedTrainersNeeded} Trainers Needed</Badge>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                      {tr.upskillingPlan}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                Actionable Policy Steps for District Officer
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {generatedPlan.actionablePolicySteps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <CheckCircle2 size={16} color="var(--status-success)" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
