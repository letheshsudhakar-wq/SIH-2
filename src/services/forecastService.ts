// ==========================================
// ZUNO FORECAST SERVICE
// ==========================================

import { apiClient } from './apiClient';
import { ForecastData, ForecastHorizon } from '../types';

export const forecastService = {
  /**
   * Fetches forward-looking skill forecast for a given time horizon (6M, 12M, 18M, 24M)
   */
  async getForecast(horizon: ForecastHorizon = '12M'): Promise<ForecastData | null> {
    try {
      return await apiClient.get<ForecastData>(`/forecast?horizon=${horizon}`);
    } catch {
      return null;
    }
  }
};
