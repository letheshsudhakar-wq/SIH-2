// ==========================================
// PAGE 1: ZUNO DASHBOARD / OVERVIEW
// Exact match to reference design specification
// ==========================================

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  Briefcase, 
  Sparkles, 
  Activity, 
  FileText, 
  AlertTriangle, 
  User, 
  ArrowRight, 
  Play, 
  Clock, 
  GitFork,
  BookOpen,
  UserCheck,
  X
} from 'lucide-react';

export const OverviewPage: React.FC = () => {
  const { setCurrentRoute } = useApp();
  const [showVideoModal, setShowVideoModal] = useState(false);

  // 5 Key Metric Stats
  const kpiStats = [
    {
      title: 'Total Industries Analyzed',
      value: '2,480',
      change: '12%',
      period: 'vs last 6 months',
      icon: Building2,
      iconBg: '#f5f3ff',
      iconColor: '#7c3aed',
      sparkline: 'M0,18 Q15,15 30,12 T60,5',
    },
    {
      title: 'Demanded Skills Identified',
      value: '6,832',
      change: '18%',
      period: 'vs last 6 months',
      icon: UserCheck,
      iconBg: '#ecfeff',
      iconColor: '#06b6d4',
      sparkline: 'M0,16 Q15,16 30,9 T60,4',
    },
    {
      title: 'Institutions Mapped',
      value: '1,240',
      change: '9%',
      period: 'vs last 6 months',
      icon: GraduationCap,
      iconBg: '#f5f3ff',
      iconColor: '#7c3aed',
      sparkline: 'M0,17 Q15,14 30,11 T60,6',
    },
    {
      title: 'Students Impacted',
      value: '4.8 Lakh',
      change: '22%',
      period: 'vs last 6 months',
      icon: Users,
      iconBg: '#eef2ff',
      iconColor: '#6366f1',
      sparkline: 'M0,19 Q15,13 30,8 T60,3',
    },
    {
      title: 'Placement Opportunities',
      value: '1.2 Lakh',
      change: '16%',
      period: 'vs last 6 months',
      icon: Briefcase,
      iconBg: '#eff6ff',
      iconColor: '#3b82f6',
      sparkline: 'M0,18 Q15,16 30,10 T60,4',
    },
  ];

  // 5 Toolkit Cards
  const toolkitCards = [
    {
      title: 'Market Pulse & Hiring Velocity',
      desc: 'Real-time insights into job demand, hiring trends and future growth domains.',
      icon: Activity,
      iconBg: '#f5f3ff',
      iconColor: '#7c3aed',
      actionLabel: 'Explore →',
      route: 'labour-market' as const,
    },
    {
      title: 'Emerging Skills Radar',
      desc: 'Discover high-growth skills and technical requirements across industries.',
      icon: GitFork,
      iconBg: '#ecfdf5',
      iconColor: '#10b981',
      actionLabel: 'View Skills →',
      route: 'skills' as const,
    },
    {
      title: 'Curriculum Doctor',
      desc: 'Identify gaps in curriculum and get AI-powered recommendations for improvement.',
      icon: FileText,
      iconBg: '#eff6ff',
      iconColor: '#3b82f6',
      actionLabel: 'Open Tool →',
      route: 'curriculum' as const,
    },
    {
      title: 'Skill Crisis Radar',
      desc: 'Spot critical skill shortages and prepare for future workforce needs.',
      icon: AlertTriangle,
      iconBg: '#fffbeb',
      iconColor: '#f59e0b',
      actionLabel: 'View Radar →',
      route: 'crisis' as const,
    },
    {
      title: 'Skill DNA',
      desc: 'Map individual and regional skill profiles for better planning and guidance.',
      icon: User,
      iconBg: '#fdf2f8',
      iconColor: '#ec4899',
      actionLabel: 'Explore →',
      route: 'dna' as const,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      
      {/* 1. HERO BANNER CARD */}
      <div
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(135deg, #fbfaff 0%, #f4f0ff 40%, #ece6ff 100%)',
          border: '1px solid #e9d5ff',
          padding: '36px 40px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(124, 58, 237, 0.05), 0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(340px, 1.15fr) minmax(320px, 1fr)',
            gap: 32,
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Left Hero Content */}
          <div style={{ maxWidth: 540 }}>
            {/* Top Pill Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                backgroundColor: 'rgba(237, 233, 254, 0.9)',
                border: '1px solid #ddd6fe',
                padding: '4px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#6d28d9',
                marginBottom: 16,
              }}
            >
              <Sparkles size={13} color="#7c3aed" />
              <span>ZUNO – Skill Intelligence for a Stronger India</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: '2.15rem',
                fontWeight: 800,
                color: '#0f172a',
                lineHeight: 1.18,
                letterSpacing: '-0.03em',
                marginBottom: 14,
              }}
            >
              From Industry Needs to<br />Future-Ready Talent
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: '0.885rem',
                color: '#475569',
                lineHeight: 1.55,
                marginBottom: 24,
              }}
            >
              Zuno bridges the gap between industry demand and skill development, helping governments, institutions and employers build a skilled, employable workforce through AI-driven insights.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                type="button"
                className="btn"
                onClick={() => setCurrentRoute('skills')}
                style={{
                  backgroundColor: '#7c3aed',
                  color: '#ffffff',
                  padding: '10px 22px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 14px rgba(124, 58, 237, 0.35)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6d28d9')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#7c3aed')}
              >
                <Sparkles size={15} />
                Explore Skill Intelligence
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => setShowVideoModal(true)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  color: '#6d28d9',
                  border: '1px solid #ddd6fe',
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  backdropFilter: 'blur(4px)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#c4b5fd';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
                  e.currentTarget.style.borderColor = '#ddd6fe';
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: '#ede9fe',
                    color: '#7c3aed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Play size={10} fill="#7c3aed" />
                </div>
                Watch How Zuno Works
              </button>
            </div>
          </div>

          {/* Right Hero Interactive Diagram Flowchart */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 250,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Background India Map Silhouette & Parliament Illustration */}
            <svg
              viewBox="0 0 450 250"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                opacity: 0.22,
                pointerEvents: 'none',
              }}
            >
              {/* Parliament Building Outline & India silhouette */}
              <path
                d="M 320,190 L 320,130 Q 370,110 420,130 L 420,190 Z"
                fill="#7c3aed"
                opacity="0.25"
              />
              <path
                d="M 330,190 L 330,140 Q 370,120 410,140 L 410,190 Z"
                fill="#8b5cf6"
                opacity="0.3"
              />
              <circle cx="370" cy="115" r="18" fill="#7c3aed" opacity="0.35" />
              <line x1="370" y1="90" x2="370" y2="105" stroke="#7c3aed" strokeWidth="2.5" />
              {/* Columns */}
              <line x1="340" y1="145" x2="340" y2="190" stroke="#ffffff" strokeWidth="3" />
              <line x1="355" y1="140" x2="355" y2="190" stroke="#ffffff" strokeWidth="3" />
              <line x1="370" y1="135" x2="370" y2="190" stroke="#ffffff" strokeWidth="3" />
              <line x1="385" y1="140" x2="385" y2="190" stroke="#ffffff" strokeWidth="3" />
              <line x1="400" y1="145" x2="400" y2="190" stroke="#ffffff" strokeWidth="3" />
            </svg>

            {/* Connected Curved SVG Connector Line */}
            <svg
              viewBox="0 0 450 240"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            >
              <defs>
                <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <path
                d="M 120,40 C 230,40 220,75 255,75 C 290,75 220,118 255,118 C 290,118 220,160 250,160 C 280,160 230,200 260,200 C 310,200 360,200 395,200"
                fill="none"
                stroke="url(#flowGrad)"
                strokeWidth="2.5"
                strokeDasharray="4 3"
              />
            </svg>

            {/* Flowchart Pills */}
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {/* 1. Industry Needs */}
              <div
                style={{
                  position: 'absolute',
                  top: 24,
                  left: 20,
                  backgroundColor: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.12)',
                  border: '1px solid #ddd6fe',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#1e293b',
                }}
              >
                <Briefcase size={14} color="#7c3aed" />
                <span>Industry Needs</span>
              </div>

              {/* 2. Skills */}
              <div
                style={{
                  position: 'absolute',
                  top: 60,
                  left: 170,
                  backgroundColor: '#ffffff',
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.12)',
                  border: '1px solid #ddd6fe',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#1e293b',
                }}
              >
                <Sparkles size={14} color="#7c3aed" />
                <span>Skills</span>
              </div>

              {/* 3. Curriculum */}
              <div
                style={{
                  position: 'absolute',
                  top: 104,
                  left: 170,
                  backgroundColor: '#ffffff',
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.12)',
                  border: '1px solid #ddd6fe',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#1e293b',
                }}
              >
                <BookOpen size={14} color="#7c3aed" />
                <span>Curriculum</span>
              </div>

              {/* 4. Training */}
              <div
                style={{
                  position: 'absolute',
                  top: 148,
                  left: 170,
                  backgroundColor: '#ffffff',
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.12)',
                  border: '1px solid #ddd6fe',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#1e293b',
                }}
              >
                <GraduationCap size={14} color="#7c3aed" />
                <span>Training</span>
              </div>

              {/* 5. Placement */}
              <div
                style={{
                  position: 'absolute',
                  top: 190,
                  left: 170,
                  backgroundColor: '#ffffff',
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.12)',
                  border: '1px solid #ddd6fe',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#1e293b',
                }}
              >
                <UserCheck size={14} color="#7c3aed" />
                <span>Placement</span>
              </div>

              {/* End Point: Group Users Icon */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 8,
                  right: 30,
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 18px rgba(124, 58, 237, 0.35)',
                  border: '2px solid #ffffff',
                }}
              >
                <Users size={22} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 5 KPI STATS CARDS ROW */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        {kpiStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="card"
              style={{
                padding: '16px 18px',
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                position: 'relative',
              }}
            >
              {/* Top Icon */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: stat.iconBg,
                  color: stat.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}
              >
                <Icon size={17} />
              </div>

              {/* Title & Value */}
              <div>
                <div
                  style={{
                    fontSize: '0.785rem',
                    fontWeight: 600,
                    color: '#64748b',
                    marginBottom: 4,
                  }}
                >
                  {stat.title}
                </div>
                <div
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </div>
              </div>

              {/* Footer: Trend & Sparkline */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.74rem' }}>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>
                    ↑ {stat.change}
                  </span>
                  <span style={{ color: '#94a3b8' }}>
                    {stat.period}
                  </span>
                </div>

                {/* Mini Smooth Purple Sparkline SVG */}
                <svg width="60" height="22" viewBox="0 0 60 22" fill="none" style={{ opacity: 0.85 }}>
                  <path
                    d={stat.sparkline}
                    stroke="#8b5cf6"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. ZUNO TOOLKIT SECTION */}
      <div>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={17} color="#7c3aed" />
            <div>
              <h2
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  letterSpacing: '-0.01em',
                  margin: 0,
                }}
              >
                Zuno Toolkit
              </h2>
              <p style={{ fontSize: '0.785rem', color: '#64748b', margin: '2px 0 0 0' }}>
                Quick access to key tools and insights
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setCurrentRoute('skills')}
            style={{
              background: 'none',
              border: 'none',
              color: '#7c3aed',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            View all tools →
          </button>
        </div>

        {/* 5 Toolkit Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {toolkitCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="card card-interactive"
                onClick={() => setCurrentRoute(card.route)}
                style={{
                  padding: '18px',
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minHeight: 180,
                }}
              >
                <div>
                  {/* Icon */}
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: card.iconBg,
                      color: card.iconColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 12,
                    }}
                  >
                    <Icon size={18} />
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 800,
                      color: '#0f172a',
                      marginBottom: 6,
                      lineHeight: 1.3,
                    }}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.785rem',
                      color: '#64748b',
                      lineHeight: 1.45,
                      margin: 0,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>

                {/* Bottom Action Link */}
                <div
                  style={{
                    fontSize: '0.785rem',
                    fontWeight: 700,
                    color: '#7c3aed',
                    marginTop: 14,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {card.actionLabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. BOTTOM TICKER / STATEMENT CARD */}
      <div
        style={{
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(90deg, #f5f3ff 0%, #ede9fe 100%)',
          border: '1px solid #ddd6fe',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 14,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative', zIndex: 2 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              color: '#7c3aed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(124, 58, 237, 0.15)',
              flexShrink: 0,
            }}
          >
            <Clock size={16} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>
              Better data. Smarter decisions. A skilled India.
            </div>
            <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
              Zuno empowers governments, institutions and industries with actionable insights for a future-ready workforce.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 2 }}>
          {/* Subtle City Skyline Artwork */}
          <svg width="80" height="26" viewBox="0 0 80 26" fill="none" style={{ opacity: 0.35 }}>
            <rect x="5" y="10" width="12" height="16" fill="#7c3aed" />
            <rect x="22" y="4" width="16" height="22" fill="#7c3aed" />
            <rect x="42" y="8" width="14" height="18" fill="#7c3aed" />
            <rect x="60" y="12" width="15" height="14" fill="#7c3aed" />
          </svg>

          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setCurrentRoute('overview')}
            style={{
              backgroundColor: '#7c3aed',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.785rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Learn More →
          </button>
        </div>
      </div>

      {/* Video Modal Demo */}
      {showVideoModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            padding: 20,
          }}
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="card"
            style={{
              maxWidth: 640,
              width: '100%',
              padding: 'var(--space-6)',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setShowVideoModal(false)}
              style={{ position: 'absolute', top: 16, right: 16, padding: 6 }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#f3f0ff',
                  color: '#7c3aed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={18} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                  Zuno Platform Overview
                </h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                  AI-Powered Labour Market Intelligence &amp; Curriculum Alignment
                </p>
              </div>
            </div>

            <div
              style={{
                width: '100%',
                height: 280,
                borderRadius: 'var(--radius-lg)',
                backgroundColor: '#1e1b4b',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                gap: 12,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(8px)',
                  border: '2px solid rgba(255,255,255,0.4)',
                }}
              >
                <Play size={24} fill="#ffffff" style={{ marginLeft: 3 }} />
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                Interactive Workflow Demonstration
              </div>
              <div style={{ fontSize: '0.75rem', color: '#c4b5fd' }}>
                Industry Telemetry → Skill DNA → Curriculum Alignment → Placement
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <button
                type="button"
                className="btn btn-primary btn-md"
                onClick={() => {
                  setShowVideoModal(false);
                  setCurrentRoute('skills');
                }}
              >
                Explore Platform Modules →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
