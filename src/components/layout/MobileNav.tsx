// ==========================================
// ZUNO MOBILE NAVIGATION & DRAWER
// ==========================================

import React from 'react';
import { useApp, AppRoute } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Stethoscope, 
  AlertOctagon, 
  FileText, 
  Menu, 
  X,
  Sparkles,
  Compass,
  Dna,
  Map,
  Building2,
  GraduationCap,
  Landmark,
  FileSpreadsheet,
  Settings
} from 'lucide-react';
import { ZunoLogo } from '../common/ZunoLogo';

export const MobileNav: React.FC = () => {
  const { currentRoute, setCurrentRoute, mobileMenuOpen, setMobileMenuOpen, userProfile } = useApp();

  const primaryMobileTabs: { id: AppRoute; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Home', icon: LayoutDashboard },
    { id: 'labour-market', label: 'Market', icon: TrendingUp },
    { id: 'curriculum', label: 'Doctor', icon: Stethoscope },
    { id: 'crisis', label: 'Crisis', icon: AlertOctagon },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  const allDrawerLinks: { id: AppRoute; label: string; icon: React.ElementType; section?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'labour-market', label: 'Labour Market', icon: TrendingUp },
    { id: 'skills', label: 'Skill Intelligence', icon: Sparkles },
    { section: 'AI & CURRICULUM', id: 'curriculum', label: 'Curriculum Doctor', icon: Stethoscope },
    { id: 'forecast', label: 'Zuno Forecast', icon: Compass },
    { id: 'crisis', label: 'Skill Crisis Radar', icon: AlertOctagon },
    { id: 'dna', label: 'Skill DNA', icon: Dna },
    { id: 'future-jobs', label: 'Future Jobs Map', icon: Map },
    { section: 'STAKEHOLDERS', id: 'employer', label: 'Employer Pulse', icon: Building2 },
    { id: 'student', label: 'Student Skill Gap', icon: GraduationCap },
    { id: 'government', label: 'Government Dashboard', icon: Landmark },
    { id: 'district-plan', label: 'District Training Plan', icon: FileSpreadsheet },
    { section: 'SYSTEM', id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Bottom Sticky Tab Bar for Mobile */}
      <nav
        className="mobile-only"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 'var(--mobile-nav-height)',
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 100,
          boxShadow: '0 -2px 10px rgba(0,0,0,0.04)',
        }}
      >
        {primaryMobileTabs.map((tab) => {
          const isActive = currentRoute === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCurrentRoute(tab.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                flex: 1,
                height: '100%',
                color: isActive ? 'var(--zuno-primary-600)' : 'var(--text-muted)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.72rem',
                border: 'none',
                background: 'transparent',
              }}
            >
              <Icon size={19} strokeWidth={isActive ? 2.3 : 1.8} />
              <span>{tab.label}</span>
            </button>
          );
        })}

        {/* More Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            flex: 1,
            height: '100%',
            color: mobileMenuOpen ? 'var(--zuno-primary-600)' : 'var(--text-muted)',
            fontWeight: 500,
            fontSize: '0.72rem',
            border: 'none',
            background: 'transparent',
          }}
        >
          <Menu size={19} strokeWidth={1.8} />
          <span>More</span>
        </button>
      </nav>

      {/* Slide-out Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-only"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(3px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-start',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              width: '82%',
              maxWidth: 320,
              height: '100%',
              backgroundColor: 'var(--bg-surface)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-xl)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: 'var(--space-4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <ZunoLogo size="sm" showText />
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: 4 }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Links List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-3)' }}>
              {allDrawerLinks.map((item) => {
                const isActive = currentRoute === item.id;
                const Icon = item.icon;

                return (
                  <React.Fragment key={item.id}>
                    {item.section && (
                      <div
                        style={{
                          fontSize: '0.685rem',
                          fontWeight: 700,
                          color: 'var(--text-subtle)',
                          padding: '12px 10px 4px 10px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.section}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setCurrentRoute(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isActive ? 'var(--zuno-primary-50)' : 'transparent',
                        color: isActive ? 'var(--zuno-primary-700)' : 'var(--text-secondary)',
                        fontWeight: isActive ? 600 : 500,
                        fontSize: '0.9rem',
                        border: 'none',
                        textAlign: 'left',
                      }}
                    >
                      <Icon size={18} color={isActive ? 'var(--zuno-primary-600)' : 'var(--text-muted)'} />
                      <span>{item.label}</span>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Profile footer in drawer */}
            <div
              style={{
                padding: 'var(--space-4)',
                borderTop: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-surface-subtle)',
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {userProfile.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--zuno-primary-600)', textTransform: 'capitalize' }}>
                Role: {userProfile.role}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
