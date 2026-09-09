// ==========================================
// ZUNO MAIN SIDEBAR NAVIGATION
// ==========================================

import React from 'react';
import { useApp, AppRoute } from '../../context/AppContext';
import { ZunoLogo } from '../common/ZunoLogo';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Sparkles, 
  Stethoscope, 
  AlertOctagon, 
  Dna, 
  Map, 
  Building2, 
  GraduationCap, 
  Landmark, 
  FileSpreadsheet, 
  FileText, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface NavItem {
  id: AppRoute;
  label: string;
  icon: React.ElementType;
  badge?: string;
  section?: string;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'labour-market', label: 'Labour Market', icon: TrendingUp },
  { id: 'skills', label: 'Skill Intelligence', icon: Sparkles },
  
  { section: 'CURRICULUM & AI', id: 'curriculum', label: 'Curriculum Doctor', icon: Stethoscope, badge: 'AI' },
  { id: 'crisis', label: 'Skill Crisis Radar', icon: AlertOctagon, badge: 'India' },
  { id: 'dna', label: 'Skill DNA', icon: Dna },
  { id: 'future-jobs', label: 'Future Jobs Map', icon: Map },
  
  { section: 'STAKEHOLDERS', id: 'employer', label: 'Employer Pulse', icon: Building2 },
  { id: 'student', label: 'Student Skill Gap', icon: GraduationCap },
  { id: 'government', label: 'Government Dash', icon: Landmark },
  { id: 'district-plan', label: 'District Training Plan', icon: FileSpreadsheet },
  
  { section: 'SYSTEM', id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { currentRoute, setCurrentRoute, sidebarCollapsed, setSidebarCollapsed, userProfile } = useApp();

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        transition: 'width var(--transition-smooth)',
        userSelect: 'none',
      }}
      className="desktop-only"
    >
      {/* Brand Header */}
      <div
        style={{
          height: 'var(--header-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarCollapsed ? 'center' : 'space-between',
          padding: sidebarCollapsed ? '0 var(--space-2)' : '0 var(--space-5)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div
          onClick={() => setCurrentRoute('overview')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <ZunoLogo size="sm" showText={!sidebarCollapsed} />
        </div>

        <button
          type="button"
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          className="btn btn-ghost btn-sm"
          style={{
            padding: 4,
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-muted)',
            display: sidebarCollapsed ? 'none' : 'flex',
          }}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav List */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: 'var(--space-3) var(--space-2)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {navItems.map((item, idx) => {
          const isActive = currentRoute === item.id;
          const Icon = item.icon;

          return (
            <React.Fragment key={item.id}>
              {item.section && !sidebarCollapsed && (
                <div
                  style={{
                    fontSize: '0.685rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    color: 'var(--text-subtle)',
                    padding: `${idx === 0 ? '4px' : '14px'} 12px 6px 12px`,
                    textTransform: 'uppercase',
                  }}
                >
                  {item.section}
                </div>
              )}

              <button
                type="button"
                onClick={() => setCurrentRoute(item.id)}
                title={sidebarCollapsed ? item.label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: sidebarCollapsed ? '10px 0' : '8px 12px',
                  justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--zuno-primary-50)' : 'transparent',
                  color: isActive ? 'var(--zuno-primary-700)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.875rem',
                  transition: 'all var(--transition-fast)',
                  border: 'none',
                  textAlign: 'left',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-surface-subtle)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '18%',
                      bottom: '18%',
                      width: 3,
                      borderRadius: '0 3px 3px 0',
                      backgroundColor: 'var(--zuno-primary-600)',
                    }}
                  />
                )}

                <Icon
                  size={18}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  style={{
                    color: isActive ? 'var(--zuno-primary-600)' : 'var(--text-muted)',
                    flexShrink: 0,
                  }}
                />

                {!sidebarCollapsed && (
                  <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.label}
                  </span>
                )}

                {!sidebarCollapsed && item.badge && (
                  <span
                    className={`badge ${item.badge === 'AI' ? 'badge-purple' : 'badge-neutral'}`}
                    style={{ fontSize: '0.675rem', padding: '1px 5px', fontWeight: 700 }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom User Info */}
      <div
        style={{
          padding: sidebarCollapsed ? 'var(--space-3) var(--space-1)' : 'var(--space-3) var(--space-4)',
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-surface)',
        }}
      >
        <div
          onClick={() => setCurrentRoute('settings')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            padding: '6px 8px',
            borderRadius: 'var(--radius-md)',
            transition: 'background-color var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-subtle)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              backgroundColor: 'var(--zuno-primary-600)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
              flexShrink: 0,
            }}
          >
            {userProfile.name.charAt(0)}
          </div>

          {!sidebarCollapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {userProfile.name}
              </div>
              <div
                style={{
                  fontSize: '0.725rem',
                  color: 'var(--zuno-primary-600)',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <ShieldCheck size={11} />
                {userProfile.role}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
