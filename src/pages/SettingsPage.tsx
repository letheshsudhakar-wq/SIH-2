// ==========================================
// PAGE 14: SETTINGS, SUPABASE & AI CONFIGURATION
// ==========================================

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiClient } from '../services/apiClient';
import { supabaseManager } from '../services/supabaseClient';
import { geminiService } from '../services/geminiService';
import { UserRole } from '../types';
import { 
  Server, 
  Cpu, 
  User, 
  Key, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  Database,
  Lock,
  ExternalLink,
  Sparkles,
  Bot
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const SettingsPage: React.FC = () => {
  const { userProfile, updateUserProfile, setUserRole, addToast } = useApp();

  const [apiConfig, setApiConfig] = useState(() => apiClient.getConfig());
  const [supabaseConfig, setSupabaseConfig] = useState(() => supabaseManager.getConfig());
  const [testingSupabase, setTestingSupabase] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem('zuno_gemini_api_key') || apiConfig.geminiApiKey || '';
  });
  const [testingGemini, setTestingGemini] = useState(false);
  const [geminiStatus, setGeminiStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const [profileForm, setProfileForm] = useState({
    name: userProfile.name,
    email: userProfile.email,
    organization: userProfile.organization,
    department: userProfile.department || '',
    region: userProfile.region || '',
    role: userProfile.role,
  });

  const [activeTab, setActiveTab] = useState<'ai' | 'supabase' | 'api' | 'profile' | 'security'>('ai');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveGemini = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    geminiService.setApiKey(geminiApiKey);
    apiClient.updateConfig({ geminiApiKey });
    setTimeout(() => {
      setIsSaving(false);
      addToast({
        type: 'success',
        title: 'Gemini AI Configured',
        message: 'Google Gemini API key has been saved and is active across all AI modules.',
      });
    }, 300);
  };

  const handleTestGemini = async () => {
    setTestingGemini(true);
    setGeminiStatus(null);
    geminiService.setApiKey(geminiApiKey);
    try {
      const response = await geminiService.generateContent(
        'Respond with: "Zuno AI is active and ready to modernize curricula!" in 1 sentence.'
      );
      setTestingGemini(false);
      setGeminiStatus({
        success: true,
        message: `Live Gemini Response: "${response.trim()}"`,
      });
      addToast({
        type: 'success',
        title: 'Gemini AI Connected!',
        message: 'Successfully tested live Google Gemini API.',
      });
    } catch (err: any) {
      setTestingGemini(false);
      setGeminiStatus({
        success: false,
        message: err?.message || 'Failed to connect to Google Gemini API.',
      });
      addToast({
        type: 'error',
        title: 'Gemini Test Failed',
        message: err?.message || 'Check your API key.',
      });
    }
  };

  const handleSaveSupabase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    supabaseManager.updateConfig(supabaseConfig);
    setTimeout(() => {
      setIsSaving(false);
      addToast({
        type: 'success',
        title: 'Supabase Settings Saved',
        message: 'Supabase project credentials have been configured.',
      });
    }, 300);
  };

  const handleTestSupabase = async () => {
    setTestingSupabase(true);
    setSupabaseStatus(null);
    supabaseManager.updateConfig(supabaseConfig);
    const result = await supabaseManager.testConnection();
    setTestingSupabase(false);
    setSupabaseStatus(result);
    if (result.success) {
      addToast({
        type: 'success',
        title: 'Connection Successful',
        message: result.message,
      });
    } else {
      addToast({
        type: 'error',
        title: 'Connection Failed',
        message: result.message,
      });
    }
  };

  const handleSaveApi = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    apiClient.updateConfig(apiConfig);
    setTimeout(() => {
      setIsSaving(false);
      addToast({
        type: 'success',
        title: 'Settings Saved',
        message: 'API & AI endpoint configurations have been updated.',
      });
    }, 300);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(profileForm);
    setUserRole(profileForm.role);
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your user profile details have been saved.',
    });
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Settings Navigation Tabs */}
      <div
        className="card"
        style={{
          padding: 'var(--space-2) var(--space-4)',
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
        }}
      >
        {[
          { id: 'ai', label: 'Google Gemini AI', icon: Sparkles },
          { id: 'supabase', label: 'Supabase Backend', icon: Database },
          { id: 'api', label: 'REST API Endpoints', icon: Server },
          { id: 'profile', label: 'Profile & Role', icon: User },
          { id: 'security', label: 'Security & Access', icon: Lock },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--zuno-primary-50)' : 'transparent',
                color: isActive ? 'var(--zuno-primary-700)' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.85rem',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon size={16} color={isActive ? 'var(--zuno-primary-600)' : 'var(--text-muted)'} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Google Gemini AI Configuration */}
      {activeTab === 'ai' && (
        <form onSubmit={handleSaveGemini} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Bot size={18} style={{ color: '#7c3aed' }} />
                Google Gemini AI Model Engine
              </h3>
              <p className="card-subtitle">Powers live Curriculum Doctor syllabus analysis, skill gap extraction, and modernization proposals</p>
            </div>
            {geminiApiKey ? (
              <Badge variant="purple" size="sm">Gemini Active</Badge>
            ) : (
              <Badge variant="neutral" size="sm">Awaiting Key</Badge>
            )}
          </div>

          {/* Connection Test Status Alert */}
          {geminiStatus && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: geminiStatus.success ? '#ecfdf5' : '#fef2f2',
                border: `1px solid ${geminiStatus.success ? '#a7f3d0' : '#fecaca'}`,
                color: geminiStatus.success ? '#065f46' : '#991b1b',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              {geminiStatus.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span>{geminiStatus.message}</span>
            </div>
          )}

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Google Gemini API Key (VITE_GEMINI_API_KEY)</label>
            <div style={{ position: 'relative' }}>
              <Key size={16} style={{ position: 'absolute', left: 14, top: 12, color: 'var(--text-subtle)' }} />
              <input
                type="password"
                className="form-input"
                style={{ paddingLeft: 38 }}
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                placeholder="AIzaSy..."
                required
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, flexWrap: 'wrap', gap: 6 }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Get your free API key instantly from Google AI Studio.
              </span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7c3aed', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                Get Free Gemini Key <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* AI Features Checklist */}
          <div
            style={{
              backgroundColor: '#f5f3ff',
              border: '1px solid #ddd6fe',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#6d28d9', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={14} />
              Enabled AI Capabilities:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8, fontSize: '0.8rem', color: '#4338ca' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={14} color="#10b981" />
                <span>Curriculum Doctor Gap Analysis</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={14} color="#10b981" />
                <span>Automatic Syllabus Diff Generation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={14} color="#10b981" />
                <span>Student Skill Gap Personalized Roadmap</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={14} color="#10b981" />
                <span>District Training Plan Recommendations</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <button type="submit" className="btn btn-primary btn-md" disabled={isSaving}>
              <Save size={15} />
              {isSaving ? 'Saving...' : 'Save Gemini Key'}
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-md"
              disabled={testingGemini || !geminiApiKey}
              onClick={handleTestGemini}
            >
              <Sparkles size={15} />
              {testingGemini ? 'Testing Gemini AI...' : 'Test Gemini AI Handshake'}
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Supabase Backend Configuration */}
      {activeTab === 'supabase' && (
        <form onSubmit={handleSaveSupabase} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Database size={18} style={{ color: '#10b981' }} />
                Supabase Backend &amp; Edge Functions
              </h3>
              <p className="card-subtitle">Connect your Supabase project for database storage, auth, and Gemini AI Edge Functions</p>
            </div>
            {supabaseConfig.url && supabaseConfig.anonKey ? (
              <Badge variant="success" size="sm">Configured</Badge>
            ) : (
              <Badge variant="warning" size="sm">Setup Required</Badge>
            )}
          </div>

          {/* Connection Test Status Alert */}
          {supabaseStatus && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: supabaseStatus.success ? '#ecfdf5' : '#fef2f2',
                border: `1px solid ${supabaseStatus.success ? '#a7f3d0' : '#fecaca'}`,
                color: supabaseStatus.success ? '#065f46' : '#991b1b',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              {supabaseStatus.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span>{supabaseStatus.message}</span>
            </div>
          )}

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Supabase Project URL (VITE_SUPABASE_URL)</label>
            <input
              type="url"
              className="form-input"
              value={supabaseConfig.url}
              onChange={(e) => setSupabaseConfig({ ...supabaseConfig, url: e.target.value })}
              placeholder="https://xyzprojectid.supabase.co"
              required
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Found under your Supabase Dashboard &gt; <strong>Project Settings &gt; API &gt; Project URL</strong>
            </span>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Supabase Anon / Public API Key (VITE_SUPABASE_ANON_KEY)</label>
            <div style={{ position: 'relative' }}>
              <Key size={16} style={{ position: 'absolute', left: 14, top: 12, color: 'var(--text-subtle)' }} />
              <input
                type="password"
                className="form-input"
                style={{ paddingLeft: 38 }}
                value={supabaseConfig.anonKey}
                onChange={(e) => setSupabaseConfig({ ...supabaseConfig, anonKey: e.target.value })}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                required
              />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
              The client-safe <code>anon</code> / <code>public</code> key for client queries and edge functions.
            </span>
          </div>

          {/* Quick info box on Supabase Edge Function: gemini-ai */}
          <div
            style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#166534', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={14} />
              Edge Functions Integration (gemini-ai)
            </div>
            <p style={{ fontSize: '0.8rem', color: '#14532d', margin: 0, lineHeight: 1.45 }}>
              Once connected, AI operations (Curriculum Doctor analysis, skill taxonomy normalization, district training recommendations) automatically invoke the <code>gemini-ai</code> Supabase Edge Function!
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <button type="submit" className="btn btn-primary btn-md" disabled={isSaving}>
              <Save size={15} />
              {isSaving ? 'Saving...' : 'Save Supabase Credentials'}
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-md"
              disabled={testingSupabase || !supabaseConfig.url || !supabaseConfig.anonKey}
              onClick={handleTestSupabase}
            >
              <CheckCircle2 size={15} />
              {testingSupabase ? 'Testing Connection...' : 'Test Supabase Connection'}
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: REST API & Data Sources Configuration */}
      {activeTab === 'api' && (
        <form onSubmit={handleSaveApi} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div>
            <h3 className="card-title">REST API &amp; Data Pipeline Configuration</h3>
            <p className="card-subtitle">Connect Zuno to an optional local or cloud REST API server (FastAPI/Express)</p>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Zuno API Base URL (VITE_API_BASE_URL)</label>
            <input
              type="url"
              className="form-input"
              value={apiConfig.baseUrl}
              onChange={(e) => setApiConfig({ ...apiConfig, baseUrl: e.target.value })}
              placeholder="http://localhost:8000/api/v1 or https://api.zuno.gov.in"
              required
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Used by service endpoints (`marketService`, `curriculumService`, `crisisService`, etc.)
            </span>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">AI Processing Microservice Endpoint</label>
            <input
              type="url"
              className="form-input"
              value={apiConfig.aiEndpoint}
              onChange={(e) => setApiConfig({ ...apiConfig, aiEndpoint: e.target.value })}
              placeholder="http://localhost:8000/api/v1/ai"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Request Timeout (Milliseconds)</label>
            <input
              type="number"
              className="form-input"
              value={apiConfig.timeoutMs}
              onChange={(e) => setApiConfig({ ...apiConfig, timeoutMs: Number(e.target.value) })}
              min={1000}
              max={60000}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-md" disabled={isSaving} style={{ width: 'fit-content' }}>
            <Save size={15} />
            {isSaving ? 'Saving Configurations...' : 'Save API Settings'}
          </button>
        </form>
      )}

      {/* Tab 4: Profile & Role Switcher */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div>
            <h3 className="card-title">User Profile &amp; Role Perspective</h3>
            <p className="card-subtitle">Switch active persona to test specialized user interfaces</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Organization Name</label>
              <input
                type="text"
                className="form-input"
                value={profileForm.organization}
                onChange={(e) => setProfileForm({ ...profileForm, organization: e.target.value })}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">User Role</label>
              <select
                className="form-select"
                value={profileForm.role}
                onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value as UserRole })}
              >
                <option value="admin">Platform Administrator</option>
                <option value="government">Government / Policy Maker</option>
                <option value="institution">Institution / College Dean</option>
                <option value="employer">Employer / Corporate Recruiter</option>
                <option value="student">Student / Candidate</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-md" style={{ width: 'fit-content' }}>
            <Save size={15} />
            Save Profile
          </button>
        </form>
      )}

      {/* Tab 5: Security & Access */}
      {activeTab === 'security' && (
        <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <h3 className="card-title">Security &amp; Data Governance</h3>
            <p className="card-subtitle">Encrypted transport, zero data retention for student syllabi, and audit telemetry</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={16} color="var(--status-success)" />
              <span>Client-side AES-GCM credential persistence</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={16} color="var(--status-success)" />
              <span>Supabase Row-Level Security (RLS) enabled</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={16} color="var(--status-success)" />
              <span>Zero LLM training data retention policy</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
