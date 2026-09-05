// ==========================================
// PAGE 13: REPORTS & AUDIT BRIEFINGS
// ==========================================

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { reportService } from '../services/reportService';
import { GeneratedReport, ReportType } from '../types';
import { 
  FileText, 
  Plus, 
  Download, 
  Eye, 
  Share2, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Printer,
  X
} from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';

export const ReportsPage: React.FC = () => {
  const { userProfile, addToast } = useApp();
  const [reports, setReports] = useState<GeneratedReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [previewReport, setPreviewReport] = useState<GeneratedReport | null>(null);

  // New report form state
  const [reportTitle, setReportTitle] = useState('Q3 National Labour Demand & Curriculum Brief');
  const [reportType, setReportType] = useState<ReportType>('curriculum_alignment');
  const [isGenerating, setIsGenerating] = useState(false);

  const loadReports = async () => {
    setLoading(true);
    try {
      const data = await reportService.getReports();
      setReports(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleGenerateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const newReport = await reportService.generateReport(
        reportType,
        reportTitle,
        userProfile.organization
      );
      setReports((prev) => [newReport, ...prev]);
      setIsGenerateModalOpen(false);
      addToast({
        type: 'success',
        title: 'Report Generated',
        message: `"${newReport.title}" is ready for preview and export.`,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header & Generate CTA */}
      <div className="card" style={{ padding: 'var(--space-4) var(--space-5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h3 className="card-title">Intelligence &amp; Audit Reports Center</h3>
            <p className="card-subtitle">Executive briefings, curriculum audit summaries, and regional development plans</p>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setIsGenerateModalOpen(true)}
          >
            <Plus size={15} />
            Generate New Report
          </button>
        </div>
      </div>

      {/* Reports List or Empty State */}
      {reports.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No reports generated yet"
          description="Generate your first data-driven intelligence report for academic councils or state skill directorates."
          actionText="Generate Report"
          onAction={() => setIsGenerateModalOpen(true)}
          badgeText="Document Center"
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="card card-interactive"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span className="badge badge-purple" style={{ textTransform: 'capitalize' }}>
                    {rep.type.replace(/_/g, ' ')}
                  </span>
                  <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                    <CheckCircle2 size={11} /> Ready
                  </span>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>
                  {rep.title}
                </h4>

                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.45 }}>
                  {rep.summary}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                  <Calendar size={13} />
                  <span>Generated on {rep.generatedAt}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => setPreviewReport(rep)}
                  >
                    <Eye size={13} />
                    Preview
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => {
                      setPreviewReport(rep);
                      setTimeout(() => window.print(), 300);
                    }}
                  >
                    <Download size={13} />
                    Export
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Generate Report Modal */}
      <Modal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        title="Generate Intelligence Report"
        subtitle="Select the report template and scope"
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setIsGenerateModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleGenerateSubmit}
              disabled={isGenerating}
            >
              <Sparkles size={14} />
              {isGenerating ? 'Synthesizing...' : 'Generate Document'}
            </button>
          </>
        }
      >
        <form onSubmit={handleGenerateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Report Title</label>
            <input
              type="text"
              className="form-input"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              placeholder="e.g. State Curriculum Alignment Report 2026"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Report Category &amp; Template</label>
            <select
              className="form-select"
              value={reportType}
              onChange={(e) => setReportType(e.target.value as ReportType)}
            >
              <option value="curriculum_alignment">Curriculum Alignment Report</option>
              <option value="labour_market">Labour Market Demand Telemetry</option>
              <option value="district_skill">District Skill Shortage Briefing</option>
              <option value="future_skills">Future Skills &amp; Horizon Forecast</option>
              <option value="training_plan">District Training Plan Action Blueprint</option>
              <option value="placement_trends">Institutional Placement Alignment Trend</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Issuing Organization / Authority</label>
            <input
              type="text"
              className="form-input"
              value={userProfile.organization}
              readOnly
            />
          </div>
        </form>
      </Modal>

      {/* Report Preview Modal */}
      {previewReport && (
        <Modal
          isOpen={!!previewReport}
          onClose={() => setPreviewReport(null)}
          title={previewReport.title}
          subtitle={`Issued by ${previewReport.organization} • ${previewReport.generatedAt}`}
          maxWidth={760}
          footer={
            <>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setPreviewReport(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => window.print()}
              >
                <Printer size={14} />
                Print / Save as PDF
              </button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', padding: 'var(--space-2) 0' }}>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 4 }}>Executive Summary</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {previewReport.summary}
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 8 }}>Key Insights &amp; Findings</h4>
              <ul style={{ paddingLeft: 20, fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>Highest volume demand detected in Cloud Native systems, Vector Databases, and PyTorch AI workflows.</li>
                <li>Identified outdated course syllabi in legacy SOAP protocols, needing transition to gRPC/REST OpenAPI.</li>
                <li>Proposed expansion of hands-on laboratory allocations from 6 hours to 14 hours per week.</li>
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
