// ==========================================
// CURRICULUM FILE UPLOAD CARD
// ==========================================

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { CurriculumFile } from '../../types';

interface FileUploadCardProps {
  onFileSelected: (file: File, meta: { courseTitle: string; institution: string; semester: string }) => void;
  isProcessing?: boolean;
}

export const FileUploadCard: React.FC<FileUploadCardProps> = ({
  onFileSelected,
  isProcessing = false,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [institution, setInstitution] = useState('');
  const [semester, setSemester] = useState('Year 3 / Semester 5');
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragOver(true);
    } else if (e.type === 'dragleave') {
      setDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setError(null);
    const validExtensions = ['pdf', 'doc', 'docx', 'txt'];
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (!ext || !validExtensions.includes(ext)) {
      setError('Please upload a valid document (.pdf, .doc, .docx, .txt)');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setError('File size exceeds the 25MB limit.');
      return;
    }

    setSelectedFile(file);
    if (!courseTitle) {
      setCourseTitle(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a curriculum file to analyze.');
      return;
    }
    onFileSelected(selectedFile, { courseTitle, institution, semester });
  };

  return (
    <div className="card" style={{ maxWidth: 720, margin: '0 auto' }}>
      <div className="card-header">
        <div>
          <h3 className="card-title">Upload your curriculum</h3>
          <p className="card-subtitle">Upload a course syllabus or curriculum document to begin AI alignment analysis.</p>
        </div>
        <span className="badge badge-purple">Step 1 of 4</span>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Drag & Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? 'var(--zuno-primary-500)' : selectedFile ? 'var(--status-success)' : 'var(--border-strong)'}`,
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-8) var(--space-6)',
            textAlign: 'center',
            backgroundColor: dragOver ? 'var(--zuno-primary-50)' : selectedFile ? 'var(--status-success-bg)' : 'var(--bg-surface-subtle)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            marginBottom: 'var(--space-5)',
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            style={{ display: 'none' }}
            onChange={handleFileInput}
          />

          {selectedFile ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  color: 'var(--status-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <CheckCircle2 size={24} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                {selectedFile.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {(selectedFile.size / 1024).toFixed(1)} KB • Click or drag another file to replace
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div className="empty-icon-wrap" style={{ margin: '0 auto 8px' }}>
                <UploadCloud size={24} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                Drag and drop your syllabus here, or <span style={{ color: 'var(--zuno-primary-600)' }}>browse</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Supports PDF, DOC, DOCX and TXT (up to 25MB)
              </div>
            </div>
          )}
        </div>

        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--status-critical-bg)',
              color: 'var(--status-critical)',
              fontSize: '0.85rem',
              marginBottom: 'var(--space-4)',
            }}
          >
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Course Metadata Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Course / Subject Name</label>
            <input
              type="text"
              className="form-input"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="e.g. Data Structures & Cloud Architecture"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Institution / University</label>
            <input
              type="text"
              className="form-input"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="e.g. State Technical University"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Cohort Level</label>
            <select
              className="form-select"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="Year 1 / Semester 1-2">Year 1 (Foundation)</option>
              <option value="Year 2 / Semester 3-4">Year 2 (Core Engineering)</option>
              <option value="Year 3 / Semester 5-6">Year 3 (Specialization)</option>
              <option value="Year 4 / Semester 7-8">Year 4 (Capstone / Industry Track)</option>
              <option value="Postgraduate / Diploma">Postgraduate / Diploma</option>
            </select>
          </div>
        </div>

        {/* Submit CTA */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={!selectedFile || isProcessing}
            style={{ width: '100%' }}
          >
            {isProcessing ? 'Initializing AI Pipeline...' : 'Start AI Curriculum Analysis'}
          </button>
        </div>
      </form>
    </div>
  );
};
