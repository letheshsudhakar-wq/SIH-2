// ==========================================
// ZUNO ROOT APPLICATION COMPONENT
// ==========================================

import React from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { ToastContainer } from './components/common/Toast';

// Pages
import { OverviewPage } from './pages/OverviewPage';
import { LabourMarketPage } from './pages/LabourMarketPage';
import { SkillIntelligencePage } from './pages/SkillIntelligencePage';
import { CurriculumDoctorPage } from './pages/CurriculumDoctorPage';
import { ZunoForecastPage } from './pages/ZunoForecastPage';
import { SkillCrisisRadarPage } from './pages/SkillCrisisRadarPage';
import { SkillDnaPage } from './pages/SkillDnaPage';
import { FutureJobsMapPage } from './pages/FutureJobsMapPage';
import { EmployerPulsePage } from './pages/EmployerPulsePage';
import { StudentSkillGapPage } from './pages/StudentSkillGapPage';
import { GovernmentDashboardPage } from './pages/GovernmentDashboardPage';
import { DistrictTrainingPlanPage } from './pages/DistrictTrainingPlanPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  const { currentRoute, sidebarCollapsed } = useApp();

  const renderActivePage = () => {
    switch (currentRoute) {
      case 'overview':
        return <OverviewPage />;
      case 'labour-market':
        return <LabourMarketPage />;
      case 'skills':
        return <SkillIntelligencePage />;
      case 'curriculum':
        return <CurriculumDoctorPage />;
      case 'forecast':
        return <ZunoForecastPage />;
      case 'crisis':
        return <SkillCrisisRadarPage />;
      case 'dna':
        return <SkillDnaPage />;
      case 'future-jobs':
        return <FutureJobsMapPage />;
      case 'employer':
        return <EmployerPulsePage />;
      case 'student':
        return <StudentSkillGapPage />;
      case 'government':
        return <GovernmentDashboardPage />;
      case 'district-plan':
        return <DistrictTrainingPlanPage />;
      case 'reports':
        return <ReportsPage />;
      case 'saved':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className={`app-shell ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Fixed Left Sidebar (Desktop) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header />
        
        <main className="main-content">
          {renderActivePage()}
        </main>
      </div>

      {/* Bottom Navigation & Drawer (Mobile) */}
      <MobileNav />

      {/* Toast Notification Layer */}
      <ToastContainer />
    </div>
  );
};

export default App;
