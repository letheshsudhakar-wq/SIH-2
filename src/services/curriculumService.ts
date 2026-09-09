// ==========================================
// CURRICULUM DOCTOR SERVICE (Powered by Gemini AI)
// ==========================================

import { apiClient } from './apiClient';
import { geminiService } from './geminiService';
import { 
  CurriculumAnalysisResult, 
  CurriculumFile, 
  RecommendationItem,
  ImprovedModuleDiff 
} from '../types';

export const curriculumService = {
  /**
   * Uploads curriculum document to storage
   */
  async uploadCurriculum(file: File): Promise<CurriculumFile> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      return await apiClient.request<CurriculumFile>('/curriculum/upload', {
        method: 'POST',
        headers: {}, // Let browser set multipart boundary
        body: formData,
      });
    } catch {
      // Local representation of uploaded file metadata
      return {
        name: file.name,
        size: file.size,
        type: file.type || 'application/pdf',
        uploadedAt: new Date(),
        courseTitle: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      };
    }
  },

  /**
   * Triggers deep AI Curriculum Analysis using Gemini
   */
  async analyzeCurriculum(file: CurriculumFile): Promise<CurriculumAnalysisResult> {
    // 1. Try backend API if available
    try {
      const apiRes = await apiClient.post<CurriculumAnalysisResult>('/curriculum/analyze', {
        filename: file.name,
        courseTitle: file.courseTitle,
        institution: file.institutionName,
      });
      if (apiRes) return apiRes;
    } catch {
      // Fallback to direct Gemini AI
    }

    // 2. Direct Gemini AI Engine (Edge / Client LLM)
    return await geminiService.analyzeCurriculum(
      file.courseTitle || file.name.replace(/\.[^/.]+$/, ''),
      file.institutionName || 'University Faculty of Engineering'
    );
  },

  /**
   * Requests actionable curriculum improvement proposals (Before/After modern diffs)
   */
  async generateImprovedCurriculum(
    courseTitle: string,
    missingSkills: string[] = [],
    outdatedTopics: string[] = []
  ): Promise<ImprovedModuleDiff[]> {
    // 1. Try backend API if available
    try {
      const apiRes = await apiClient.post<ImprovedModuleDiff[]>('/curriculum/improve', {
        courseTitle,
        missingSkills,
        outdatedTopics,
      });
      if (apiRes && Array.isArray(apiRes) && apiRes.length > 0) return apiRes;
    } catch {
      // Fallback to direct Gemini
    }

    // 2. Direct Gemini AI
    return await geminiService.generateModernizedCurriculum(
      courseTitle,
      missingSkills,
      outdatedTopics
    );
  },

  /**
   * Fetches specific curriculum recommendation categories
   */
  async getRecommendations(analysisId: string): Promise<RecommendationItem[] | null> {
    try {
      return await apiClient.get<RecommendationItem[]>(`/curriculum/${analysisId}/recommendations`);
    } catch {
      return null;
    }
  }
};
