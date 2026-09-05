// ==========================================
// CURRICULUM DOCTOR SERVICE
// ==========================================

import { apiClient } from './apiClient';
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
      // Local fallback representation of uploaded file metadata
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
   * Triggers deep AI Curriculum Analysis
   */
  async analyzeCurriculum(file: CurriculumFile): Promise<CurriculumAnalysisResult | null> {
    try {
      return await apiClient.post<CurriculumAnalysisResult>('/curriculum/analyze', {
        filename: file.name,
        courseTitle: file.courseTitle,
      });
    } catch {
      // When backend is not connected, returns null to show the proper unconnected/needs-setup state
      return null;
    }
  },

  /**
   * Requests actionable curriculum improvement proposals
   */
  async generateImprovedCurriculum(analysisId: string): Promise<ImprovedModuleDiff[] | null> {
    try {
      return await apiClient.post<ImprovedModuleDiff[]>('/curriculum/improve', {
        analysisId,
      });
    } catch {
      return null;
    }
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
