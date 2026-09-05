// ==========================================
// GOVERNMENT & DISTRICT PLAN SERVICE
// ==========================================

import { apiClient } from './apiClient';
import { GovernmentMetrics, DistrictTrainingPlanRequest, DistrictTrainingPlanResponse } from '../types';

export const governmentService = {
  /**
   * Fetches state/national level macro governance metrics
   */
  async getGovernmentOverview(): Promise<GovernmentMetrics | null> {
    try {
      return await apiClient.get<GovernmentMetrics>('/government/metrics');
    } catch {
      return null;
    }
  },

  /**
   * Generates a tailored district training plan
   */
  async generateDistrictTrainingPlan(req: DistrictTrainingPlanRequest): Promise<DistrictTrainingPlanResponse | null> {
    try {
      return await apiClient.post<DistrictTrainingPlanResponse>('/government/district-plan', req);
    } catch {
      return null;
    }
  }
};
