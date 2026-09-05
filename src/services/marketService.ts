// ==========================================
// LABOUR MARKET SERVICE
// ==========================================

import { apiClient } from './apiClient';
import { LabourMarketData, LabourMarketFilters, SkillDemandMetrics } from '../types';

export const marketService = {
  /**
   * Fetches high-level macro market overview metrics
   */
  async getMarketOverview(): Promise<SkillDemandMetrics | null> {
    try {
      return await apiClient.get<SkillDemandMetrics>('/market/overview');
    } catch {
      // Returns null when API is not connected, prompting the UI empty/awaiting state
      return null;
    }
  },

  /**
   * Fetches detailed labour market demand dataset with filters
   */
  async getLabourMarketData(filters?: LabourMarketFilters): Promise<LabourMarketData | null> {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.role) queryParams.set('role', filters.role);
      if (filters?.skill) queryParams.set('skill', filters.skill);
      if (filters?.location) queryParams.set('location', filters.location);
      if (filters?.industry) queryParams.set('industry', filters.industry);
      if (filters?.timePeriod) queryParams.set('period', filters.timePeriod);

      const qs = queryParams.toString();
      return await apiClient.get<LabourMarketData>(`/market/demand${qs ? `?${qs}` : ''}`);
    } catch {
      return null;
    }
  },

  /**
   * Fetches job demand signals by specific industry
   */
  async getIndustryTrends(industry?: string): Promise<{ industry: string; hiringMomentum?: string; topSkill?: string }[] | null> {
    try {
      return await apiClient.get(`/market/industry-trends${industry ? `?industry=${industry}` : ''}`);
    } catch {
      return null;
    }
  }
};
