// ==========================================
// GLOBAL APPLICATION CONTEXT
// ==========================================

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole } from '../types';

export type AppRoute = 
  | 'overview'
  | 'labour-market'
  | 'skills'
  | 'curriculum'
  | 'crisis'
  | 'dna'
  | 'future-jobs'
  | 'employer'
  | 'student'
  | 'government'
  | 'district-plan'
  | 'reports'
  | 'saved'
  | 'settings';

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
}

interface AppContextType {
  currentRoute: AppRoute;
  setCurrentRoute: (route: AppRoute) => void;
  userProfile: UserProfile;
  setUserRole: (role: UserRole) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  globalSearchTerm: string;
  setGlobalSearchTerm: (term: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
  selectedSkillId: string | null;
  setSelectedSkillId: (skillId: string | null) => void;
}

const defaultProfile: UserProfile = {
  id: 'usr_01',
  name: 'Dr. Rajesh Sharma',
  email: 'rajesh.sharma@niti.gov.in',
  organization: 'National Skill Development Directorate',
  role: 'government',
  department: 'Higher Education & Workforce Alignment',
  region: 'National Capital Region',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRouteState] = useState<AppRoute>(() => {
    const hash = window.location.hash.replace('#', '') as AppRoute;
    return hash || 'overview';
  });

  const [userProfile, setUserProfileState] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('zuno_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return defaultProfile;
  });

  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  const setCurrentRoute = (route: AppRoute) => {
    setCurrentRouteState(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as AppRoute;
      if (hash && hash !== currentRoute) {
        setCurrentRouteState(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentRoute]);

  const setUserRole = (role: UserRole) => {
    const updated = { ...userProfile, role };
    setUserProfileState(updated);
    localStorage.setItem('zuno_user_profile', JSON.stringify(updated));
    addToast({
      type: 'info',
      title: 'Role Switched',
      message: `Switched perspective to ${role.charAt(0).toUpperCase() + role.slice(1)}.`,
    });
  };

  const updateUserProfile = (patch: Partial<UserProfile>) => {
    const updated = { ...userProfile, ...patch };
    setUserProfileState(updated);
    localStorage.setItem('zuno_user_profile', JSON.stringify(updated));
  };

  const addToast = (toast: Omit<ToastItem, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        userProfile,
        setUserRole,
        updateUserProfile,
        globalSearchTerm,
        setGlobalSearchTerm,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileMenuOpen,
        setMobileMenuOpen,
        toasts,
        addToast,
        removeToast,
        selectedSkillId,
        setSelectedSkillId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
