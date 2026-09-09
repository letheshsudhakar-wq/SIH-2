// ==========================================
// ZUNO TOP HEADER COMPONENT
// ==========================================

import React from 'react';
import { useApp, AppRoute } from '../../context/AppContext';
import { Search, Bell, Landmark, Menu, Sun, ChevronDown } from 'lucide-react';
import { ZunoLogo } from '../common/ZunoLogo';
import { UserRole } from '../../types';

const routeTitles: Record<AppRoute, { title: string; subtitle: string; icon?: React.ElementType }> = {
  overview: {
    title: 'Good morning, Dr. Rajesh Sharma',
    subtitle: "Here's what's happening in the skill market and how Zuno is helping build a future-ready workforce.",
    icon: Sun,
  },
  'labour-market': {
    title: 'Labour Market Intelligence',
    subtitle: 'Real-time industry skill demand, hiring volume and employer velocity.',
  },
  skills: {
    title: 'Skill Intelligence',
    subtitle: 'Deep telemetry across emerging, expanding and declining skill clusters.',
  },
  curriculum: {
    title: 'Curriculum Doctor',
    subtitle: 'Align higher education syllabi directly with live industry demand.',
  },
  crisis: {
    title: 'Skill Crisis Radar',
    subtitle: 'Regional talent shortages, supply-demand imbalances and policy intervention.',
  },
  dna: {
    title: 'Skill DNA',
    subtitle: 'Deconstructed capability blueprints and role competency graphs.',
  },
  'future-jobs': {
    title: 'Future Jobs Map',
    subtitle: 'Geographic economic clusters and localized skill expansion.',
  },
  employer: {
    title: 'Employer Pulse',
    subtitle: 'Direct industry feedback channel on hiring bottlenecks and hard-to-find skills.',
  },
  student: {
    title: 'Student Skill Gap',
    subtitle: 'Self-assessment readiness diagnostics and personalized learning paths.',
  },
  government: {
    title: 'Government Dashboard',
    subtitle: 'Macro workforce development oversight and state-level allocation.',
  },
  'district-plan': {
    title: 'District Training Plan',
    subtitle: 'Actionable capacity planning for District Skill Development Officers.',
  },
  reports: {
    title: 'Intelligence Reports',
    subtitle: 'Audit-ready briefing documents, alignment reports and PDF exports.',
  },
  saved: {
    title: 'Saved Items',
    subtitle: 'Bookmarked skills, curriculum analyses and custom queries.',
  },
  settings: {
    title: 'System & API Settings',
    subtitle: 'Manage endpoints, AI models, data ingestion and role profiles.',
  },
};

export const Header: React.FC = () => {
  const {
    currentRoute,
    globalSearchTerm,
    setGlobalSearchTerm,
    userProfile,
    setUserRole,
    setMobileMenuOpen,
    setCurrentRoute,
  } = useApp();

  const currentInfo = routeTitles[currentRoute] || {
    title: 'Zuno Platform',
    subtitle: 'Labour Market & Curriculum Intelligence',
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(e.target.value as UserRole);
  };

  return (
    <header
      style={{
        height: 'var(--header-height)',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-8)',
        position: 'sticky',
        top: 0,
        zIndex: 90,
      }}
    >
      {/* Mobile brand & hamburger */}
      <div className="mobile-only" style={{ alignItems: 'center', gap: 12 }}>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => setMobileMenuOpen(true)}
          style={{ padding: 6 }}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        <div onClick={() => setCurrentRoute('overview')} style={{ cursor: 'pointer' }}>
          <ZunoLogo size="sm" showText />
        </div>
      </div>

      {/* Desktop Route Info Header */}
      <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {currentRoute === 'overview' && (
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: '#f3f0ff',
              color: '#7c3aed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Sun size={20} />
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
            {currentInfo.title}
          </h1>
          <p style={{ fontSize: '0.785rem', color: '#64748b', margin: '2px 0 0 0' }}>
            {currentInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Center Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          maxWidth: 400,
          width: '100%',
          margin: '0 var(--space-4)',
        }}
      >
        <Search
          size={15}
          style={{
            position: 'absolute',
            left: 14,
            color: '#94a3b8',
            pointerEvents: 'none',
          }}
        />
        <input
          type="text"
          value={globalSearchTerm}
          onChange={(e) => setGlobalSearchTerm(e.target.value)}
          placeholder="Search skills, roles, industries or locations..."
          style={{
            width: '100%',
            height: 36,
            paddingLeft: 38,
            paddingRight: 14,
            fontSize: '0.825rem',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 'var(--radius-full)',
            outline: 'none',
            color: '#0f172a',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            transition: 'all var(--transition-fast)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#a78bfa';
            e.target.style.boxShadow = '0 0 0 3px #ede9fe';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
          }}
        />
      </div>

      {/* Right Actions: Role Selector & System Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Role perspective selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            backgroundColor: '#ffffff',
            padding: '5px 12px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            position: 'relative',
          }}
        >
          <Landmark size={14} color="#6366f1" />
          <select
            value={userProfile.role}
            onChange={handleRoleChange}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#1e293b',
              cursor: 'pointer',
              outline: 'none',
              paddingRight: 18,
              appearance: 'none',
            }}
          >
            <option value="government">Role: Government</option>
            <option value="institution">Role: Institution</option>
            <option value="employer">Role: Employer</option>
            <option value="student">Role: Student</option>
            <option value="admin">Role: Admin</option>
          </select>
          <ChevronDown
            size={13}
            style={{
              position: 'absolute',
              right: 10,
              pointerEvents: 'none',
              color: '#64748b',
            }}
          />
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          style={{
            padding: 8,
            borderRadius: '50%',
            color: '#64748b',
            position: 'relative',
          }}
          aria-label="Notifications"
          onClick={() => setCurrentRoute('overview')}
        >
          <Bell size={18} />
          <span
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
            }}
          />
        </button>

        {/* User Avatar Circle */}
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
            cursor: 'pointer',
            flexShrink: 0,
          }}
          onClick={() => setCurrentRoute('settings')}
          title="Account Settings"
        >
          D
        </div>
      </div>
    </header>
  );
};
