// ==========================================
// ZUNO DATA TYPES & API INTERFACES
// ==========================================

export type UserRole = 'government' | 'institution' | 'employer' | 'student' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
  region?: string;
}

export interface ApiConfig {
  baseUrl: string;
  aiEndpoint: string;
  geminiApiKey?: string;
  isConnected: boolean;
  timeoutMs: number;
}

// ------------------------------------------
// 1. SKILL INTELLIGENCE
// ------------------------------------------

export type SkillCategory = 'technical' | 'tool' | 'domain' | 'soft' | 'emerging' | 'foundational';
export type GrowthTrajectory = 'exploding' | 'growing' | 'stable' | 'declining' | 'latent';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  growthTrajectory?: GrowthTrajectory;
  growthPercentage?: number; // Nullable if no API data
  demandRank?: number;
  totalJobCount?: number;
  activePostingsCount?: number;
  description?: string;
  topIndustries?: string[];
  topRoles?: string[];
  topLocations?: string[];
  requiredProficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  relatedSkills?: string[];
  trainingRelevanceScore?: number;
  isEmerging?: boolean;
  isCrisis?: boolean;
}

export interface SkillDemandMetrics {
  totalJobsIdentified?: number;
  growthYoY?: number;
  topSkillNames?: string[];
  marketSupplyGap?: number;
  lastUpdated?: string;
}

// ------------------------------------------
// 2. LABOUR MARKET
// ------------------------------------------

export interface JobRoleDemand {
  id: string;
  title: string;
  industry: string;
  hiringVolumeScore?: number;
  avgExperienceMinYears?: number;
  avgExperienceMaxYears?: number;
  keySkills: string[];
  growthSignal?: string;
  demandTrend?: { period: string; index: number }[];
}

export interface LabourMarketFilters {
  role?: string;
  skill?: string;
  location?: string;
  industry?: string;
  experienceLevel?: string;
  timePeriod?: '1M' | '3M' | '6M' | '1Y' | 'All';
  searchQuery?: string;
}

export interface LabourMarketData {
  demandBySkill: { skill: string; postingsCount?: number; growthRate?: number }[];
  demandByRole: JobRoleDemand[];
  demandByLocation: { location: string; intensityScore?: number; count?: number }[];
  industryTrends: { industry: string; hiringMomentum?: string; topSkill?: string }[];
  salaryBand?: { role: string; minLpa?: number; maxLpa?: number; medianLpa?: number };
  lastSyncTime?: string;
}

// ------------------------------------------
// 3. CURRICULUM DOCTOR
// ------------------------------------------

export type AnalysisStage = 
  | 'idle'
  | 'uploading'
  | 'reading'
  | 'identifying_subjects'
  | 'extracting_skills'
  | 'comparing_industry'
  | 'detecting_gaps'
  | 'generating_recommendations'
  | 'completed'
  | 'error';

export interface CurriculumFile {
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  institutionName?: string;
  courseTitle?: string;
  semesterOrYear?: string;
}

export interface CurriculumTopic {
  id: string;
  title: string;
  skillsTaught: string[];
  status: 'aligned' | 'partially_aligned' | 'outdated' | 'missing';
  industryRelevanceScore?: number;
  notes?: string;
}

export interface RecommendationItem {
  id: string;
  category: 
    | 'add_new_topic'
    | 'update_existing_topic'
    | 'increase_practical_training'
    | 'add_industry_tools'
    | 'update_assessment'
    | 'remove_outdated_content'
    | 'increase_trainer_capability'
    | 'improve_lab_equipment';
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  impact: string;
  suggestedAction: string;
  estimatedHours?: number;
}

export interface ImprovedModuleDiff {
  moduleNumber: number;
  moduleName: string;
  changeType: 'modified' | 'added' | 'removed' | 'unchanged';
  currentTopics: string[];
  proposedTopics: string[];
  newTools: string[];
  practicalHours: { before: number; proposed: number };
  rationale: string;
}

export interface CurriculumAnalysisResult {
  id: string;
  courseTitle: string;
  institution: string;
  analyzedAt: string;
  alignmentScore?: number; // 0-100 when real analysis exists
  alignedSkills: string[];
  partiallyCoveredSkills: string[];
  missingSkills: string[];
  outdatedTopics: string[];
  industryRequirements: string[];
  recommendations: RecommendationItem[];
  proposedCurriculumDiff?: ImprovedModuleDiff[];
}

// ------------------------------------------
// 4. ZUNO FORECAST
// ------------------------------------------

export type ForecastHorizon = '6M' | '12M' | '18M' | '24M';

export interface ForecastItem {
  id: string;
  skillName: string;
  category: SkillCategory;
  confidenceScore?: number;
  expectedAdoptionTier: 'Mass Market' | 'Early Adopter' | 'Niche Specialist' | 'Transformative';
  growthVelocity?: number;
  keyDrivers: string[];
  impactedRoles: string[];
  actionRecommendation: string;
}

export interface TechnologySignal {
  technology: string;
  maturity: 'Emerging' | 'Accelerating' | 'Mainstream' | 'Fading';
  hiringImpact: 'High' | 'Medium' | 'Low';
  associatedSkills: string[];
  timeToPeakDemand: string;
}

export interface ForecastData {
  horizon: ForecastHorizon;
  topRisingSkills: ForecastItem[];
  emergingTechnologies: TechnologySignal[];
  industryGrowthSignals: { industry: string; trend: 'Rapid Expansion' | 'Moderate' | 'Slow'; demandIndex?: number }[];
  futureRoleDemand: { role: string; projectedDemandIndex?: number; keyShift: string }[];
  zunoInsightSummary?: string;
}

// ------------------------------------------
// 5. SKILL CRISIS RADAR & INDIA MAP
// ------------------------------------------

export type ShortageSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface DistrictShortage {
  districtName: string;
  stateName: string;
  shortageSeverity: ShortageSeverity;
  demandIndex?: number;
  talentSupplyIndex?: number;
  gapScore?: number;
  topShortageSkills: string[];
  highDemandRoles: string[];
  availableTrainingInstitutesCount?: number;
  recommendedTrainingCapacity?: number;
  timeToImpact: string;
  suggestedAction: string;
  activeEmployersInRegion?: string[];
}

export interface StateCrisisData {
  stateCode: string;
  stateName: string;
  overallSeverity: ShortageSeverity;
  criticalDistrictsCount?: number;
  totalWorkforceGapEstimate?: number;
  topCrisisSkills: string[];
  districts: DistrictShortage[];
}

// ------------------------------------------
// 6. SKILL DNA
// ------------------------------------------

export interface SkillDnaNode {
  id: string;
  name: string;
  type: 'core' | 'supporting' | 'tool' | 'knowledge';
  importanceWeight: number; // 0-100
  proficiencyNeeded: 'Beginner' | 'Intermediate' | 'Advanced' | 'Mastery';
  connectedSkillIds: string[];
}

export interface RoleSkillDna {
  roleId: string;
  roleTitle: string;
  industry: string;
  description: string;
  coreSkills: SkillDnaNode[];
  supportingSkills: SkillDnaNode[];
  tools: SkillDnaNode[];
  knowledgeAreas: SkillDnaNode[];
  userMatchPercentage?: number; // Only when user profile exists
  missingDnaNodes?: string[];
}

// ------------------------------------------
// 7. FUTURE JOBS MAP
// ------------------------------------------

export interface FutureJobCluster {
  stateName: string;
  hubName: string;
  coordinates: { x: number; y: number };
  growthRating: 'Hyper-Growth' | 'Strong' | 'Steady' | 'Transitioning';
  dominantSectors: string[];
  projectedNewRolesCount?: number;
  criticalSkillsNeeded: string[];
  institutionalReadiness: 'High' | 'Moderate' | 'Lagging';
  recommendedPolicyAction: string;
}

// ------------------------------------------
// 8. EMPLOYER PULSE
// ------------------------------------------

export interface EmployerFeedbackSubmission {
  id?: string;
  companyName: string;
  industry: string;
  companySize: '1-50' | '51-200' | '201-1000' | '1000+';
  location: string;
  targetJobRole: string;
  skillsNeeded: string[];
  skillsDifficultToFind: string[];
  requiredProficiency: 'Intermediate' | 'Advanced' | 'Expert';
  hiringDifficultyLevel: 'Moderate' | 'High' | 'Extreme';
  expectedHiringNext12Months?: number;
  willingToProvideInternships: boolean;
  notesOrBottlenecks?: string;
  submittedAt?: string;
}

// ------------------------------------------
// 9. STUDENT SKILL GAP
// ------------------------------------------

export interface StudentProfileAssessment {
  currentSkills: string[];
  targetRole: string;
  experienceLevel: 'Student' | 'Entry-Level (0-2 yrs)' | 'Mid-Level (3-5 yrs)';
  knownTools: string[];
  readinessScore?: number;
  missingCrucialSkills: string[];
  skillsToImprove: string[];
  recommendedLearningModules: {
    title: string;
    focusSkill: string;
    estimatedDuration: string;
    difficulty: 'Introductory' | 'Advanced';
  }[];
  careerPathwayAdvice?: string;
}

// ------------------------------------------
// 10. GOVERNMENT DASHBOARD & DISTRICT TRAINING PLAN
// ------------------------------------------

export interface GovernmentMetrics {
  totalMonitoredInstitutions?: number;
  totalStudentsCovered?: number;
  criticalSkillGapCount?: number;
  activeTrainingProgramsCount?: number;
  placementRateIndex?: number;
  districtShortageSummary?: { state: string; criticalCount: number }[];
  topNationalGaps?: string[];
  recommendedBudgetFocus?: string[];
}

export interface DistrictTrainingPlanRequest {
  state: string;
  district: string;
  timeHorizon: '6M' | '12M' | '24M';
  priorityFocusSector?: string;
}

export interface DistrictTrainingPlanResponse {
  id: string;
  district: string;
  state: string;
  generatedAt: string;
  prioritySkills: { skill: string; demandIntensity: string }[];
  priorityJobRoles: string[];
  requiredTrainingProgramsCount?: number;
  programsList: {
    programName: string;
    targetRole: string;
    intakeCapacitySuggested: number;
    trainerCertificationRequired: string;
    equipmentAndLabRequirements: string[];
    curriculumUpgradesNeeded: string[];
  }[];
  trainerRequirements: {
    specialization: string;
    estimatedTrainersNeeded: number;
    upskillingPlan: string;
  }[];
  labAndEquipmentChecklist: string[];
  expectedIndustryDemandImpact: string;
  actionablePolicySteps: string[];
}

// ------------------------------------------
// 11. REPORTS
// ------------------------------------------

export type ReportType = 
  | 'labour_market'
  | 'skill_gap'
  | 'curriculum_alignment'
  | 'district_skill'
  | 'future_skills'
  | 'training_plan'
  | 'placement_trends';

export interface GeneratedReport {
  id: string;
  title: string;
  type: ReportType;
  generatedAt: string;
  generatedBy: string;
  organization: string;
  status: 'ready' | 'generating' | 'failed';
  summary: string;
  metricsSnapshot?: Record<string, string | number>;
  downloadUrl?: string;
  fileSizeBytes?: number;
}
