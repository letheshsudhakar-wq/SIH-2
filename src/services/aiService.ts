// ==========================================
// ZUNO AI ENGINE FACADE
// ==========================================

import { apiClient } from './apiClient';
import { CurriculumAnalysisResult } from '../types';

export const aiService = {
  /**
   * 1. Extract skills from arbitrary text or syllabus
   */
  async extractSkills(text: string): Promise<string[] | null> {
    try {
      return await apiClient.post<string[]>('/ai/extract-skills', { text });
    } catch {
      return null;
    }
  },

  /**
   * 2. Normalize and deduplicate skills
   */
  async normalizeSkillNames(skills: string[]): Promise<Record<string, string> | null> {
    try {
      return await apiClient.post<Record<string, string>>('/ai/normalize-skills', { skills });
    } catch {
      return null;
    }
  },

  /**
   * 3. Run full curriculum comparison against industry skill baseline
   */
  async compareCurriculumToIndustry(syllabusText: string, targetDomain: string): Promise<CurriculumAnalysisResult | null> {
    try {
      return await apiClient.post<CurriculumAnalysisResult>('/ai/curriculum-doctor/analyze', {
        syllabusText,
        targetDomain,
      });
    } catch {
      return null;
    }
  },

  /**
   * 4. Generate direct AI recommendations for curriculum enhancement
   */
  async generateCurriculumRecommendations(missingSkills: string[], outdatedTopics: string[]) {
    try {
      return await apiClient.post('/ai/curriculum-doctor/recommend', {
        missingSkills,
        outdatedTopics,
      });
    } catch {
      return null;
    }
  },

  /**
   * 5. Generate district skill training plan recommendations
   */
  async generateDistrictRecommendations(district: string, state: string) {
    try {
      return await apiClient.post('/ai/crisis/district-recommendations', {
        district,
        state,
      });
    } catch {
      return null;
    }
  }
};
