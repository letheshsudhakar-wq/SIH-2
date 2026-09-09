// ==========================================
// ZUNO MAIN SIDEBAR NAVIGATION
// ==========================================

import React from 'react';
import { useApp, AppRoute } from '../../context/AppContext';
import { ZunoLogo } from '../common/ZunoLogo';
import { 
  Home,
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
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';

interface NavItem {
  id: AppRoute;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeType?: 'ai' | 'new' | 'neutral';
  section?: string;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'labour-market', label: 'Labour Market', icon: TrendingUp },
  { id: 'skills', label: 'Skill Intelligence', icon: Sparkles },
  
  { section: 'CURRICULUM & AI', id: 'curriculum', label: 'Curriculum Doctor', icon: Stethoscope, badge: 'AI', badgeType: 'ai' },
  { id: 'crisis', label: 'Skill Crisis Radar', icon: AlertOctagon, badge: 'New', badgeType: 'new' },
  { id: 'dna', label: 'Skill DNA', icon: Dna },
  { id: 'future-jobs', label: 'Future Jobs Map', icon: Map },
  
  { section: 'STAKEHOLDERS', id: 'employer', label: 'Employer Pulse', icon: Building2 },
  { id: 'student', label: 'Student Skill Gap', icon: GraduationCap },
  { id: 'government', label: 'Government Dash', icon: Landmark },
  { id: 'district-plan', label: 'District Training Plan', icon: FileSpreadsheet },
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
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
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
          borderBottom: '1px solid #f1f5f9',
        }}
      >
        <div
          onClick={() => setCurrentRoute('overview')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <ZunoLogo size="sm" showText={!sidebarCollapsed} showSubtitle={!sidebarCollapsed} />
        </div>

        <button
          type="button"
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          className="btn btn-ghost btn-sm"
          style={{
            padding: 4,
            borderRadius: 'var(--radius-sm)',
            color: '#94a3b8',
            display: sidebarCollapsed ? 'none' : 'flex',
          }}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <SlidersHorizontal size={14} />
        </button>
      </div>

      {/* Nav List */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: 'var(--space-3) var(--space-3)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
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
                    fontSize: '0.675rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    color: '#94a3b8',
                    padding: `${idx === 0 ? '4px' : '16px'} 10px 6px 10px`,
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
                  padding: sidebarCollapsed ? '10px 0' : '9px 12px',
                  justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: isActive ? '#f3f0ff' : 'transparent',
                  color: isActive ? '#6d28d9' : '#475569',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.85rem',
                  transition: 'all var(--transition-fast)',
                  border: 'none',
                  textAlign: 'left',
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.color = '#0f172a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#475569';
                  }
                }}
              >
                <Icon
                  size={17}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  style={{
                    color: isActive ? '#7c3aed' : '#64748b',
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
                    style={{
                      fontSize: '0.675rem',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: item.badgeType === 'ai' ? '#ede9fe' : '#e0e7ff',
                      color: item.badgeType === 'ai' ? '#6d28d9' : '#4338ca',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom User Info Card */}
      <div
        style={{
          padding: sidebarCollapsed ? 'var(--space-3) var(--space-1)' : 'var(--space-3) var(--space-3)',
          borderTop: '1px solid #f1f5f9',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          style={{
            fontSize: '0.675rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: '#94a3b8',
            padding: '2px 8px 8px 8px',
            textTransform: 'uppercase',
            display: sidebarCollapsed ? 'none' : 'block',
          }}
        >
          SYSTEM
        </div>
        <div
          onClick={() => setCurrentRoute('settings')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            padding: '6px 8px',
            borderRadius: 'var(--radius-lg)',
            transition: 'background-color var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: '#7c3aed',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
              flexShrink: 0,
            }}
          >
            {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'A'}
          </div>

          {!sidebarCollapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {userProfile.name || 'Admin'}
              </div>
              <div
                style={{
                  fontSize: '0.725rem',
                  color: '#7c3aed',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                }}
              >
                {userProfile.role || 'Admin'}
              </div>
            </div>
          )}

          {!sidebarCollapsed && (
            <ChevronRight size={15} style={{ color: '#94a3b8' }} />
          )}
        </div>
      </div>
    </aside>
  );
};
