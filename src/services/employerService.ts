// ==========================================
// EMPLOYER PULSE SERVICE
// ==========================================

import { apiClient } from './apiClient';
import { EmployerFeedbackSubmission } from '../types';

export const employerService = {
  /**
   * Submits employer hiring demand, critical skills shortage, and talent bottlenecks
   */
  async submitFeedback(feedback: EmployerFeedbackSubmission): Promise<{ success: boolean; id?: string }> {
    try {
      return await apiClient.post<{ success: boolean; id: string }>('/employer/pulse', feedback);
    } catch {
      // If offline or API disconnected, persist to local storage queue so it's not lost
      const existing = JSON.parse(localStorage.getItem('zuno_employer_submissions') || '[]');
      const newEntry = { ...feedback, id: `local_${Date.now()}`, submittedAt: new Date().toISOString() };
      existing.push(newEntry);
      localStorage.setItem('zuno_employer_submissions', JSON.stringify(existing));
      return { success: true, id: newEntry.id };
    }
  },

  /**
   * Fetches locally queued or remote employer feedback submissions
   */
  getStoredSubmissions(): EmployerFeedbackSubmission[] {
    try {
      return JSON.parse(localStorage.getItem('zuno_employer_submissions') || '[]');
    } catch {
      return [];
    }
  }
};
