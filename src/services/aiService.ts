// ==========================================
// ZUNO AI ENGINE FACADE (Supabase Edge Function & REST Support)
// ==========================================

import { apiClient } from './apiClient';
import { supabaseManager } from './supabaseClient';
import { CurriculumAnalysisResult } from '../types';

export const aiService = {
  /**
   * 1. Extract skills from arbitrary text or syllabus
   */
  async extractSkills(text: string): Promise<string[] | null> {
    // Try Supabase Edge Function first if connected
    if (supabaseManager.getClient()) {
      try {
        const res = await supabaseManager.invokeEdgeFunction<{ skills: string[] }>('gemini-ai', {
          action: 'extractSkills',
          text,
        });
        if (res?.skills) return res.skills;
      } catch (err) {
        console.warn('Supabase Edge function extractSkills failed, trying REST API fallback:', err);
      }
    }

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
    if (supabaseManager.getClient()) {
      try {
        const res = await supabaseManager.invokeEdgeFunction<{ normalized: Record<string, string> }>('gemini-ai', {
          action: 'normalizeSkills',
          skills,
        });
        if (res?.normalized) return res.normalized;
      } catch (err) {
        console.warn('Supabase Edge function normalizeSkills failed, trying REST fallback:', err);
      }
    }

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
    if (supabaseManager.getClient()) {
      try {
        const res = await supabaseManager.invokeEdgeFunction<CurriculumAnalysisResult>('gemini-ai', {
          action: 'analyzeCurriculum',
          syllabusText,
          targetDomain,
        });
        if (res) return res;
      } catch (err) {
        console.warn('Supabase Edge function analyzeCurriculum failed, trying REST fallback:', err);
      }
    }

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
    if (supabaseManager.getClient()) {
      try {
        const res = await supabaseManager.invokeEdgeFunction('gemini-ai', {
          action: 'recommendCurriculumImprovements',
          missingSkills,
          outdatedTopics,
        });
        if (res) return res;
      } catch (err) {
        console.warn('Supabase Edge function recommendations failed, trying REST fallback:', err);
      }
    }

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
    if (supabaseManager.getClient()) {
      try {
        const res = await supabaseManager.invokeEdgeFunction('gemini-ai', {
          action: 'generateDistrictPlan',
          district,
          state,
        });
        if (res) return res;
      } catch (err) {
        console.warn('Supabase Edge function districtPlan failed, trying REST fallback:', err);
      }
    }

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
