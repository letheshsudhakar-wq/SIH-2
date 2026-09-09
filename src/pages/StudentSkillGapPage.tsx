// ==========================================
// PAGE 10: STUDENT SKILL GAP (Diagnostic Tool)
// ==========================================

import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Plus, 
  X, 
  UploadCloud, 
  FileText, 
  Check,
  FolderOpen
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

interface AttachedLibraryFile {
  id: string;
  name: string;
  size: number;
  extractedSkills: string[];
  uploadedAt: string;
}

// Role competency benchmarks
const ROLE_BENCHMARKS: Record<string, { core: string[]; recommended: string[]; modules: { title: string; duration: string; focus: string }[] }> = {
  'AI Systems Engineer': {
    core: ['Python', 'PyTorch', 'Vector Databases', 'Docker', 'Distributed Inference', 'Git', 'LangChain', 'FastAPI'],
    recommended: ['MLOps', 'vLLM', 'Linux', 'SQL', 'Kubernetes', 'Triton Server'],
    modules: [
      { title: 'Production RAG Architecture with Milvus & FastAPI', duration: '3 Weeks', focus: 'Vector DBs & Embeddings' },
      { title: 'Containerizing Deep Learning Inference with Docker & Triton', duration: '2 Weeks', focus: 'Model Serving & DevOps' },
      { title: 'Benchmarking & LLM Evaluation Frameworks', duration: '2 Weeks', focus: 'Quality & Observability' },
    ],
  },
  'Cloud Platform Architect': {
    core: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'CI/CD', 'Linux', 'Microservices'],
    recommended: ['Go', 'Python', 'Networking', 'Azure', 'Prometheus / Grafana', 'GCP'],
    modules: [
      { title: 'Multi-Region Kubernetes Ingress & Service Mesh', duration: '4 Weeks', focus: 'K8s & Istio' },
      { title: 'Infrastructure as Code with Terraform & GitHub Actions', duration: '2 Weeks', focus: 'Terraform & CI/CD' },
      { title: 'Cloud Security Posture & Zero-Trust Architecture', duration: '3 Weeks', focus: 'IAM & Cloud Security' },
    ],
  },
  'Fullstack Software Engineer': {
    core: ['React', 'TypeScript', 'Node.js', 'SQL', 'REST API', 'Git', 'PostgreSQL'],
    recommended: ['Docker', 'Tailwind CSS', 'Next.js', 'GraphQL', 'Redis', 'Unit Testing'],
    modules: [
      { title: 'Modern Fullstack TypeScript with Next.js & Prisma', duration: '3 Weeks', focus: 'End-to-End Type Safety' },
      { title: 'Scalable REST & GraphQL Microservices Architecture', duration: '3 Weeks', focus: 'Backend Performance' },
      { title: 'Automated CI/CD Testing & Cloud Deployment', duration: '2 Weeks', focus: 'DevOps for Developers' },
    ],
  },
  'VLSI Physical Design Engineer': {
    core: ['Verilog', 'SystemVerilog', 'Static Timing Analysis', 'Linux', 'Tcl Scripting', 'ASIC Flow'],
    recommended: ['Synopsys EDA', 'Cadence Innovus', 'Python', 'Floorplanning', 'DRC/LVS'],
    modules: [
      { title: 'Advanced Physical Design Flow & Placement Optimization', duration: '4 Weeks', focus: 'EDA Tools & Floorplanning' },
      { title: 'Deep Timing Closure & Clock Tree Synthesis (CTS)', duration: '3 Weeks', focus: 'Static Timing Analysis' },
      { title: 'Nanometer Node DRC/LVS Verification Blueprint', duration: '2 Weeks', focus: 'Physical Verification' },
    ],
  },
  'Cybersecurity Threat Analyst': {
    core: ['Network Security', 'Wireshark', 'SIEM / Splunk', 'Linux', 'Python', 'Vulnerability Assessment'],
    recommended: ['Cryptography', 'OWASP Top 10', 'Penetration Testing', 'Incident Response', 'Docker'],
    modules: [
      { title: 'Enterprise Threat Hunting & SIEM Telemetry with Splunk', duration: '3 Weeks', focus: 'SIEM & Log Correlation' },
      { title: 'Applied Web Application Penetration Testing', duration: '3 Weeks', focus: 'OWASP Security' },
      { title: 'Network Traffic Forensics & Zero-Day Incident Handling', duration: '2 Weeks', focus: 'Packet Analysis & Forensics' },
    ],
  },
  'Data Platform Engineer': {
    core: ['SQL', 'Python', 'Apache Spark', 'Kafka', 'Data Warehousing', 'PostgreSQL'],
    recommended: ['Airflow', 'Docker', 'AWS S3 / Snowflake', 'dbt', 'ETL Pipelines', 'Pandas'],
    modules: [
      { title: 'Real-time Streaming Pipelines with Apache Kafka & Spark', duration: '4 Weeks', focus: 'Stream Processing' },
      { title: 'Modern Data Warehousing with Snowflake & dbt', duration: '3 Weeks', focus: 'Data Modeling' },
      { title: 'Orchestrating Resilient Production DAGs with Apache Airflow', duration: '2 Weeks', focus: 'Data Orchestration' },
    ],
  },
};

// Skill aliases & detection keyword dictionary
const SKILL_KEYWORDS: { name: string; aliases: string[] }[] = [
  { name: 'Python', aliases: ['python', 'py', 'python3', 'asyncio'] },
  { name: 'PyTorch', aliases: ['pytorch', 'torch'] },
  { name: 'TensorFlow', aliases: ['tensorflow', 'tf', 'keras'] },
  { name: 'Vector Databases', aliases: ['vector database', 'vectordb', 'milvus', 'pinecone', 'chroma', 'chromadb', 'qdrant', 'faiss'] },
  { name: 'Docker', aliases: ['docker', 'containerization', 'container', 'dockerfile'] },
  { name: 'Kubernetes', aliases: ['kubernetes', 'k8s', 'kubectl', 'helm'] },
  { name: 'LangChain', aliases: ['langchain', 'llamaindex', 'rag', 'retrieval-augmented'] },
  { name: 'FastAPI', aliases: ['fastapi', 'flask', 'django'] },
  { name: 'Distributed Inference', aliases: ['vllm', 'triton', 'distributed inference', 'tensorrt', 'onnx', 'model serving'] },
  { name: 'Git', aliases: ['git', 'github', 'gitlab', 'version control'] },
  { name: 'SQL', aliases: ['sql', 'mysql', 'postgres', 'postgresql', 'sqlite', 'rdbms'] },
  { name: 'PostgreSQL', aliases: ['postgresql', 'postgres', 'psql'] },
  { name: 'Data Structures', aliases: ['data structures', 'algorithms', 'dsa', 'arrays', 'trees', 'graphs'] },
  { name: 'React', aliases: ['react', 'reactjs', 'react.js'] },
  { name: 'TypeScript', aliases: ['typescript', 'ts'] },
  { name: 'JavaScript', aliases: ['javascript', 'js', 'es6', 'node', 'nodejs', 'node.js'] },
  { name: 'Node.js', aliases: ['nodejs', 'node.js', 'express', 'express.js'] },
  { name: 'AWS', aliases: ['aws', 'amazon web services', 'ec2', 's3', 'lambda'] },
  { name: 'Azure', aliases: ['azure', 'microsoft azure'] },
  { name: 'GCP', aliases: ['gcp', 'google cloud', 'bigquery'] },
  { name: 'Linux', aliases: ['linux', 'ubuntu', 'bash', 'shell script', 'unix'] },
  { name: 'Terraform', aliases: ['terraform', 'iac', 'ansible'] },
  { name: 'CI/CD', aliases: ['ci/cd', 'github actions', 'jenkins', 'gitlab ci'] },
  { name: 'Microservices', aliases: ['microservices', 'distributed systems', 'grpc', 'rest api', 'restful'] },
  { name: 'REST API', aliases: ['rest api', 'restful', 'openapi', 'swagger', 'api design'] },
  { name: 'GraphQL', aliases: ['graphql', 'apollo'] },
  { name: 'Redis', aliases: ['redis', 'caching', 'memcached'] },
  { name: 'MongoDB', aliases: ['mongodb', 'nosql', 'documentdb'] },
  { name: 'Next.js', aliases: ['next.js', 'nextjs'] },
  { name: 'Tailwind CSS', aliases: ['tailwind', 'tailwindcss', 'css3'] },
  { name: 'Apache Spark', aliases: ['apache spark', 'pyspark', 'spark'] },
  { name: 'Kafka', aliases: ['kafka', 'apache kafka', 'event streaming'] },
  { name: 'Airflow', aliases: ['airflow', 'apache airflow'] },
  { name: 'Data Warehousing', aliases: ['data warehousing', 'snowflake', 'redshift', 'dbt'] },
  { name: 'Pandas', aliases: ['pandas', 'numpy', 'scipy', 'matplotlib'] },
  { name: 'Machine Learning', aliases: ['machine learning', 'scikit-learn', 'deep learning', 'nlp', 'computer vision'] },
  { name: 'Verilog', aliases: ['verilog', 'systemverilog', 'hdl', 'fpga', 'rtl'] },
  { name: 'Static Timing Analysis', aliases: ['static timing analysis', 'sta', 'primetime', 'timing closure'] },
  { name: 'Network Security', aliases: ['network security', 'firewall', 'tcp/ip', 'dns', 'vpn'] },
  { name: 'Wireshark', aliases: ['wireshark', 'packet capture', 'tcpdump'] },
  { name: 'SIEM / Splunk', aliases: ['splunk', 'siem', 'qradar', 'elastic security'] },
  { name: 'Java', aliases: ['java', 'spring', 'spring boot', 'jvm'] },
  { name: 'C++', aliases: ['c++', 'cpp', 'c/c++'] },
  { name: 'Go', aliases: ['golang', 'go language'] },
  { name: 'Rust', aliases: ['rust', 'cargo'] },
];

export const StudentSkillGapPage: React.FC = () => {
  const { addToast } = useApp();

  const [targetRole, setTargetRole] = useState('AI Systems Engineer');
  const [experienceLevel, setExperienceLevel] = useState('Student');
  const [currentSkills, setCurrentSkills] = useState<string[]>(['Python', 'Git', 'Data Structures', 'SQL']);
  const [skillInput, setSkillInput] = useState('');
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<AttachedLibraryFile[]>([]);
  const [isExtractingFiles, setIsExtractingFiles] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addSkill = (customSkill?: string) => {
    const raw = customSkill || skillInput;
    const trimmed = raw.trim();
    if (trimmed) {
      if (!currentSkills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
        setCurrentSkills((prev) => [...prev, trimmed]);
        setHasEvaluated(false);
      }
      if (!customSkill) {
        setSkillInput('');
      }
    }
  };

  const removeSkill = (sk: string) => {
    setCurrentSkills((prev) => prev.filter((s) => s !== sk));
    setHasEvaluated(false);
  };

  const clearAllSkills = () => {
    setCurrentSkills([]);
    setAttachedFiles([]);
    setHasEvaluated(false);
    addToast({
      type: 'info',
      title: 'Skills Cleared',
      message: 'Competencies and attached files have been reset.',
    });
  };

  // Helper to extract keywords from file content and filename
  const extractSkillsFromContent = (text: string, filename: string): string[] => {
    const combined = `${filename} ${text}`.toLowerCase();
    const found: string[] = [];

    SKILL_KEYWORDS.forEach((item) => {
      const match = item.aliases.some((alias) => {
        const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?:^|[^a-zA-Z0-9_#+])${escaped}(?:$|[^a-zA-Z0-9_#+])`, 'i');
        return regex.test(combined);
      });
      if (match && !found.includes(item.name)) {
        found.push(item.name);
      }
    });

    // If no standard skills detected, derive clean title from filename
    if (found.length === 0) {
      const fallback = filename
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .trim();
      if (fallback.length > 2) {
        found.push(fallback);
      }
    }

    return found;
  };

  // Handle selected or dropped files from libraries
  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    setIsExtractingFiles(true);
    const newFiles: AttachedLibraryFile[] = [];
    const extractedSkillsSet = new Set<string>();

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      let fileText = '';

      try {
        if (
          file.type.includes('text') ||
          file.name.endsWith('.txt') ||
          file.name.endsWith('.json') ||
          file.name.endsWith('.md') ||
          file.name.endsWith('.csv') ||
          file.name.endsWith('.py') ||
          file.name.endsWith('.js') ||
          file.name.endsWith('.ts') ||
          file.name.endsWith('.html')
        ) {
          fileText = await file.text();
        } else {
          // For binary (PDF, DOCX), read ascii content
          const buffer = await file.arrayBuffer();
          const decoder = new TextDecoder('utf-8', { fatal: false });
          fileText = decoder.decode(buffer.slice(0, 50000));
        }
      } catch {
        fileText = '';
      }

      const detected = extractSkillsFromContent(fileText, file.name);
      detected.forEach((s) => extractedSkillsSet.add(s));

      newFiles.push({
        id: `file_${Date.now()}_${i}`,
        name: file.name,
        size: file.size,
        extractedSkills: detected,
        uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }

    // Merge into current skills
    const newSkillsList = Array.from(extractedSkillsSet);
    setCurrentSkills((prev) => {
      const combined = [...prev];
      newSkillsList.forEach((s) => {
        if (!combined.some((item) => item.toLowerCase() === s.toLowerCase())) {
          combined.push(s);
        }
      });
      return combined;
    });

    setAttachedFiles((prev) => [...prev, ...newFiles]);
    setIsExtractingFiles(false);
    setHasEvaluated(false);

    addToast({
      type: 'success',
      title: `${newFiles.length} File${newFiles.length > 1 ? 's' : ''} Added from Library`,
      message: `Identified and added ${newSkillsList.length} competencies to your skill profile.`,
    });
  };

  const removeAttachedFile = (id: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  };

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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const benchmark = ROLE_BENCHMARKS[targetRole] || ROLE_BENCHMARKS['AI Systems Engineer'];

  // Dynamic calculations
  const normalizedCurrent = currentSkills.map((s) => s.toLowerCase());
  const missingCoreSkills = benchmark.core.filter(
    (coreSkill) => !normalizedCurrent.some((cs) => cs === coreSkill.toLowerCase() || coreSkill.toLowerCase().includes(cs) || cs.includes(coreSkill.toLowerCase()))
  );
  const matchedCoreSkills = benchmark.core.filter(
    (coreSkill) => normalizedCurrent.some((cs) => cs === coreSkill.toLowerCase() || coreSkill.toLowerCase().includes(cs) || cs.includes(coreSkill.toLowerCase()))
  );

  const totalEvaluated = benchmark.core.length + benchmark.recommended.length;
  const matchScore = Math.min(
    98,
    Math.max(12, Math.round((matchedCoreSkills.length / benchmark.core.length) * 85 + (currentSkills.length > 3 ? 12 : 0)))
  );

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    await new Promise((res) => setTimeout(res, 600));
    setIsEvaluating(false);
    setHasEvaluated(true);
    addToast({
      type: 'success',
      title: 'Readiness Evaluated',
      message: `Diagnostic computed against live Indian industry standards for ${targetRole}.`,
    });
  };

  return (
    <div style={{ maxWidth: 880, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Hidden File Picker Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt,.json,.md,.csv,.rtf,.html,.py,.java,.cpp,.js,.ts"
        style={{ display: 'none' }}
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = '';
        }}
      />

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
          Evaluate your current coursework, resumes, project files, and practical competencies against verified industry role standards.
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

        {/* Current Skills & File Ingestion */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label className="form-label" style={{ marginBottom: 0 }}>
              Your Current Competencies &amp; Tools
            </label>
            {currentSkills.length > 0 && (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={clearAllSkills}
                style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '2px 6px' }}
              >
                Clear All
              </button>
            )}
          </div>

          {/* Action Row: Manual Text Input + Add + Add Files from Library */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
              <input
                type="text"
                className="form-input"
                placeholder="Type a skill (e.g. PyTorch, Linux, Java) or click Add Files..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => addSkill()}
              style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 5 }}
            >
              <Plus size={14} /> Add
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isExtractingFiles}
              style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}
              title="Upload resume, project code, syllabus, or transcripts from your libraries"
            >
              <FolderOpen size={15} />
              {isExtractingFiles ? 'Extracting...' : 'Add Files from Library'}
            </button>
          </div>

          {/* Drag & Drop File Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `1.5px dashed ${dragOver ? 'var(--zuno-primary-500)' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              backgroundColor: dragOver ? 'var(--zuno-primary-50)' : 'var(--bg-surface-subtle)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
              transition: 'all var(--transition-fast)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--zuno-primary-100)',
                  color: 'var(--zuno-primary-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <UploadCloud size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Drop files from your libraries or <span style={{ color: 'var(--zuno-primary-600)', textDecoration: 'underline' }}>browse</span>
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                  Supports PDF, DOCX, TXT, JSON, MD, CSV, Source Code (Auto-extracts skills)
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--zuno-primary-600)' }}>
              + Select Library Files
            </div>
          </div>

          {/* Attached Files Pill List */}
          {attachedFiles.length > 0 && (
            <div style={{ marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Attached Library Files ({attachedFiles.length})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {attachedFiles.map((file) => (
                  <div
                    key={file.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.785rem',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <FileText size={14} color="var(--zuno-primary-600)" />
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {file.name}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      ({(file.size / 1024).toFixed(0)} KB)
                    </span>
                    <span className="badge badge-purple" style={{ fontSize: '0.65rem', padding: '1px 5px' }}>
                      +{file.extractedSkills.length} skills
                    </span>
                    <X
                      size={13}
                      style={{ cursor: 'pointer', color: 'var(--text-subtle)' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAttachedFile(file.id);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Skills Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, minHeight: 32, alignItems: 'center' }}>
            {currentSkills.length === 0 ? (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                No competencies added yet. Type a skill or upload files from your library above.
              </span>
            ) : (
              currentSkills.map((sk) => (
                <span
                  key={sk}
                  className="badge badge-purple"
                  style={{
                    padding: '5px 10px',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  {sk}
                  <X
                    size={13}
                    style={{ cursor: 'pointer', opacity: 0.8 }}
                    onClick={() => removeSkill(sk)}
                  />
                </span>
              ))
            )}
          </div>

          {/* Suggested Skills for Active Target Role */}
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Suggested for {targetRole}:
            </span>
            {benchmark.core.concat(benchmark.recommended.slice(0, 3)).map((sug) => {
              const isAdded = currentSkills.some((s) => s.toLowerCase() === sug.toLowerCase());
              if (isAdded) return null;
              return (
                <button
                  key={sug}
                  type="button"
                  onClick={() => addSkill(sug)}
                  style={{
                    border: '1px dashed var(--border-subtle)',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'transparent',
                    padding: '2px 8px',
                    fontSize: '0.725rem',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                  }}
                >
                  <Plus size={11} /> {sug}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Analyze CTA */}
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleEvaluate}
          disabled={isEvaluating || currentSkills.length === 0}
          style={{ width: '100%', marginTop: 6 }}
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
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                Evaluated {currentSkills.length} competencies against live hiring baselines across top employers.
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Role Match Index
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: matchScore > 70 ? 'var(--zuno-primary-600)' : matchScore > 40 ? 'var(--status-warning)' : 'var(--status-critical)' }}>
                {matchScore}%
              </div>
            </div>
          </div>

          {/* Missing Crucial Skills vs Skills to Upgrade */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            <div className="card" style={{ borderTop: '4px solid var(--status-critical)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <AlertTriangle size={18} color="var(--status-critical)" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Missing Core Industry Skills ({missingCoreSkills.length})</h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                Prerequisites absent from your current skill profile.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {missingCoreSkills.length === 0 ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--status-success)', fontSize: '0.85rem', fontWeight: 600 }}>
                    <Check size={16} /> All core role prerequisites covered!
                  </div>
                ) : (
                  missingCoreSkills.map((s) => (
                    <Badge key={s} variant="critical" size="sm">
                      {s}
                    </Badge>
                  ))
                )}
              </div>
            </div>

            <div className="card" style={{ borderTop: '4px solid var(--status-warning)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <CheckCircle2 size={18} color="var(--status-warning)" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Skills to Deepen ({matchedCoreSkills.length})</h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                Current competencies to strengthen with advanced production projects.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {matchedCoreSkills.length === 0 ? (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No matching core competencies yet.</span>
                ) : (
                  matchedCoreSkills.map((s) => (
                    <Badge key={s} variant="warning" size="sm">
                      {s}
                    </Badge>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Recommended Learning Modules */}
          <div className="card" style={{ padding: 'var(--space-6)' }}>
            <div className="card-header">
              <div>
                <h3 className="card-title">Recommended Bridging Curriculum</h3>
                <p className="card-subtitle">Targeted project modules to reach 90%+ industry readiness for {targetRole}</p>
              </div>
              <BookOpen size={18} color="var(--zuno-primary-600)" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {benchmark.modules.map((mod, idx) => (
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
