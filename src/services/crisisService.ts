// ==========================================
// SKILL CRISIS RADAR SERVICE
// ==========================================

import { apiClient } from './apiClient';
import { StateCrisisData, DistrictShortage } from '../types';

export const crisisService = {
  /**
   * Fetches state-by-state skill shortage metrics for the India map
   */
  async getAllStateCrises(): Promise<StateCrisisData[] | null> {
    try {
      return await apiClient.get<StateCrisisData[]>('/crisis/states');
    } catch {
      return null;
    }
  },

  /**
   * Fetches district-level drill-down for a selected state
   */
  async getDistrictsForState(stateCode: string): Promise<DistrictShortage[] | null> {
    try {
      return await apiClient.get<DistrictShortage[]>(`/crisis/states/${stateCode}/districts`);
    } catch {
      return null;
    }
  }
};
