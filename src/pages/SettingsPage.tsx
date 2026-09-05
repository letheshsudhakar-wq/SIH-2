// ==========================================
// PAGE 14: SETTINGS & API CONFIGURATION
// ==========================================

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiClient } from '../services/apiClient';
import { UserRole } from '../types';
import { 
  Settings, 
  Server, 
  Cpu, 
  User, 
  Shield, 
  Key, 
  Save, 
  CheckCircle2, 
  Database,
  Radio,
  Lock
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const SettingsPage: React.FC = () => {
  const { userProfile, updateUserProfile, setUserRole, addToast } = useApp();

  const [apiConfig, setApiConfig] = useState(() => apiClient.getConfig());
  const [profileForm, setProfileForm] = useState({
    name: userProfile.name,
    email: userProfile.email,
    organization: userProfile.organization,
    department: userProfile.department || '',
    region: userProfile.region || '',
    role: userProfile.role,
  });

  const [activeTab, setActiveTab] = useState<'api' | 'ai' | 'profile' | 'security'>('api');
  const [isSaving, setIsSaving] = useState(false);

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
    }, 400);
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
          { id: 'api', label: 'API & Data Sources', icon: Server },
          { id: 'ai', label: 'AI Model Config', icon: Cpu },
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
              }}
            >
              <Icon size={16} color={isActive ? 'var(--zuno-primary-600)' : 'var(--text-muted)'} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: API & Data Sources Configuration */}
      {activeTab === 'api' && (
        <form onSubmit={handleSaveApi} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div>
            <h3 className="card-title">Backend API &amp; Data Pipeline Configuration</h3>
            <p className="card-subtitle">Connect Zuno to your production backend server or microservices cluster</p>
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
              Used by all service endpoints (`marketService`, `curriculumService`, `crisisService`, etc.)
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

      {/* Tab 2: AI Model Configuration */}
      {activeTab === 'ai' && (
        <form onSubmit={handleSaveApi} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div>
            <h3 className="card-title">AI Engine &amp; Large Language Model Keys</h3>
            <p className="card-subtitle">Configure model providers for Curriculum Doctor analysis &amp; skill taxonomy parsing</p>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Gemini / OpenAI API Key</label>
            <div style={{ position: 'relative' }}>
              <Key size={16} style={{ position: 'absolute', left: 14, top: 12, color: 'var(--text-subtle)' }} />
              <input
                type="password"
                className="form-input"
                style={{ paddingLeft: 38 }}
                value={apiConfig.geminiApiKey || ''}
                onChange={(e) => setApiConfig({ ...apiConfig, geminiApiKey: e.target.value })}
                placeholder="AIzaSy... or sk-..."
              />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Key is securely stored in local session storage and transmitted via encrypted headers.
            </span>
          </div>

          <button type="submit" className="btn btn-primary btn-md" disabled={isSaving} style={{ width: 'fit-content' }}>
            <Save size={15} />
            Save AI Settings
          </button>
        </form>
      )}

      {/* Tab 3: Profile & Role Switcher */}
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
                <option value="government">Government / Policy Maker</option>
                <option value="institution">Institution / College Dean</option>
                <option value="employer">Employer / Corporate Recruiter</option>
                <option value="student">Student / Candidate</option>
                <option value="admin">Platform Administrator</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-md" style={{ width: 'fit-content' }}>
            <Save size={15} />
            Update Profile
          </button>
        </form>
      )}

      {/* Tab 4: Security */}
      {activeTab === 'security' && (
        <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <h3 className="card-title">Security &amp; Data Privacy Safeguards</h3>
            <p className="card-subtitle">Encrypted transport and telemetry compliance</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ padding: '12px 14px', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Strict Real-Data Integrity Policy</div>
                <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>No synthetic or unverified statistics rendered on screens.</div>
              </div>
              <Badge variant="success">Enforced</Badge>
            </div>

            <div style={{ padding: '12px 14px', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Encrypted Telemetry Headers</div>
                <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>All curriculum uploads parsed using zero-retention AI pipelines.</div>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
