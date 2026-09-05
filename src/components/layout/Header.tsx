// ==========================================
// ZUNO TOP HEADER COMPONENT
// ==========================================

import React from 'react';
import { useApp, AppRoute } from '../../context/AppContext';
import { Search, Bell, Shield, Menu } from 'lucide-react';
import { ZunoLogo } from '../common/ZunoLogo';
import { UserRole } from '../../types';

const routeTitles: Record<AppRoute, { title: string; subtitle: string }> = {
  overview: {
    title: 'Good morning',
    subtitle: "Here's what's happening in the skill market.",
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
  forecast: {
    title: 'Zuno Forecast',
    subtitle: 'Forward-looking predictive signals shaping the future of work.',
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
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
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
      <div className="desktop-only" style={{ flexDirection: 'column' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          {currentInfo.title}
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {currentInfo.subtitle}
        </p>
      </div>

      {/* Center Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          maxWidth: 420,
          width: '100%',
          margin: '0 var(--space-4)',
        }}
      >
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: 14,
            color: 'var(--text-subtle)',
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
            height: 38,
            paddingLeft: 38,
            paddingRight: 14,
            fontSize: '0.875rem',
            backgroundColor: 'var(--bg-surface-subtle)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)',
            outline: 'none',
            color: 'var(--text-primary)',
            transition: 'all var(--transition-fast)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--zuno-primary-400)';
            e.target.style.backgroundColor = 'var(--bg-surface)';
            e.target.style.boxShadow = '0 0 0 3px var(--zuno-primary-100)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--border-subtle)';
            e.target.style.backgroundColor = 'var(--bg-surface-subtle)';
            e.target.style.boxShadow = 'none';
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
            backgroundColor: 'var(--bg-surface-subtle)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Shield size={14} color="var(--zuno-primary-600)" />
          <select
            value={userProfile.role}
            onChange={handleRoleChange}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="government">Role: Government</option>
            <option value="institution">Role: Institution / College</option>
            <option value="employer">Role: Employer</option>
            <option value="student">Role: Student / Candidate</option>
            <option value="admin">Role: Admin</option>
          </select>
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          style={{
            padding: 8,
            borderRadius: '50%',
            color: 'var(--text-secondary)',
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
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: 'var(--zuno-primary-600)',
            }}
          />
        </button>
      </div>
    </header>
  );
};
