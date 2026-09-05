// ==========================================
// SKILL INTELLIGENCE SERVICE
// ==========================================

import { apiClient } from './apiClient';
import { Skill, RoleSkillDna } from '../types';

export const skillService = {
  /**
   * Fetches top demanded skills
   */
  async getTopSkills(limit: number = 20): Promise<Skill[] | null> {
    try {
      return await apiClient.get<Skill[]>(`/skills/top?limit=${limit}`);
    } catch {
      return null;
    }
  },

  /**
   * Fetches fast-growing emerging skills
   */
  async getEmergingSkills(): Promise<Skill[] | null> {
    try {
      return await apiClient.get<Skill[]>('/skills/emerging');
    } catch {
      return null;
    }
  },

  /**
   * Fetches detailed intelligence for a specific skill
   */
  async getSkillDetails(skillId: string): Promise<Skill | null> {
    try {
      return await apiClient.get<Skill>(`/skills/${encodeURIComponent(skillId)}`);
    } catch {
      return null;
    }
  },

  /**
   * Fetches Role Skill DNA blueprint
   */
  async getSkillDnaForRole(roleId: string): Promise<RoleSkillDna | null> {
    try {
      return await apiClient.get<RoleSkillDna>(`/skills/dna/${encodeURIComponent(roleId)}`);
    } catch {
      return null;
    }
  }
};
