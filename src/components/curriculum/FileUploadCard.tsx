// ==========================================
// CURRICULUM FILE UPLOAD CARD
// ==========================================

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
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

  const handleLoadSample = (sampleCourse: string, sampleInst: string, sampleSemester: string) => {
    const sampleBlob = new Blob([
      `Course Syllabus: ${sampleCourse}\nInstitution: ${sampleInst}\nModules:\n1. Introduction & Monolithic RPC\n2. Database Schemas\n3. Web Services (SOAP / XML)\n4. Basic Linux Commands\n5. Final Theoretical Exam`
    ], { type: 'text/plain' });
    const sampleFile = new File([sampleBlob], `${sampleCourse.replace(/[^a-zA-Z0-9]/g, '_')}_Syllabus.txt`, { type: 'text/plain' });
    
    setSelectedFile(sampleFile);
    setCourseTitle(sampleCourse);
    setInstitution(sampleInst);
    setSemester(sampleSemester);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select or upload a curriculum file to analyze.');
      return;
    }
    onFileSelected(selectedFile, { courseTitle, institution, semester });
  };

  return (
    <div className="card" style={{ maxWidth: 740, margin: '0 auto', padding: 'var(--space-6)' }}>
      <div className="card-header" style={{ marginBottom: 'var(--space-4)' }}>
        <div>
          <h3 className="card-title" style={{ fontSize: '1.2rem', fontWeight: 800 }}>Upload Course Syllabus</h3>
          <p className="card-subtitle">Upload your university syllabus document or select a sample course to test AI alignment</p>
        </div>
        <span className="badge badge-purple">Step 1 of 5</span>
      </div>

      {/* Quick 1-Click Preset Samples */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Sparkles size={13} color="#7c3aed" />
          <span>Or test instantly with standard university syllabi:</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { title: 'B.Tech CS – Cloud & Distributed Systems', inst: 'National Institute of Technology', sem: 'Year 3 / Semester 5' },
            { title: 'B.Tech AI & Machine Learning Engineering', inst: 'State Technological University', sem: 'Year 3 / Semester 6' },
            { title: 'B.E. Embedded Systems & Industrial IoT', inst: 'Regional Engineering College', sem: 'Year 4 / Semester 7' },
          ].map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleLoadSample(sample.title, sample.inst, sample.sem)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: courseTitle === sample.title ? '#ede9fe' : '#f8fafc',
                border: `1px solid ${courseTitle === sample.title ? '#a78bfa' : '#e2e8f0'}`,
                color: courseTitle === sample.title ? '#6d28d9' : '#475569',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.15s ease',
              }}
            >
              <BookOpen size={12} />
              {sample.title}
            </button>
          ))}
        </div>
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
            border: `2px dashed ${dragOver ? '#7c3aed' : selectedFile ? '#10b981' : '#cbd5e1'}`,
            borderRadius: 'var(--radius-lg)',
            backgroundColor: dragOver ? '#f5f3ff' : selectedFile ? '#f0fdf4' : '#f8fafc',
            padding: '32px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            marginBottom: 'var(--space-5)',
            transition: 'all var(--transition-fast)',
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />

          {selectedFile ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircle2 size={26} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>
                  {selectedFile.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  {(selectedFile.size / 1024).toFixed(1)} KB • Ready for AI telemetry analysis
                </div>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
                style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: 4 }}
              >
                Remove / Change file
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: '#ede9fe',
                  color: '#7c3aed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <UploadCloud size={24} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem', marginBottom: 2 }}>
                  Click to upload or drag &amp; drop
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  PDF, DOCX, DOC, or TXT (Max 25MB)
                </div>
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
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              fontSize: '0.85rem',
              marginBottom: 'var(--space-4)',
              border: '1px solid #fecaca',
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
              placeholder="e.g. Cloud & Distributed Computing"
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
            style={{ width: '100%', borderRadius: 'var(--radius-md)', padding: '12px' }}
          >
            {isProcessing ? 'Initializing AI Pipeline...' : 'Start AI Curriculum Analysis →'}
          </button>
        </div>
      </form>
    </div>
  );
};
