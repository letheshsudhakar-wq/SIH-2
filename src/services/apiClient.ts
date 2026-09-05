// ==========================================
// ZUNO API CLIENT (Production Ready)
// ==========================================

import { ApiConfig } from '../types';

const DEFAULT_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

class ApiClient {
  private config: ApiConfig = {
    baseUrl: DEFAULT_BASE_URL,
    aiEndpoint: `${DEFAULT_BASE_URL}/ai`,
    isConnected: false,
    timeoutMs: 15000,
  };

  constructor() {
    const savedConfig = localStorage.getItem('zuno_api_config');
    if (savedConfig) {
      try {
        this.config = { ...this.config, ...JSON.parse(savedConfig) };
      } catch {
        // use default
      }
    }
  }

  public getConfig(): ApiConfig {
    return { ...this.config };
  }

  public updateConfig(newConfig: Partial<ApiConfig>): ApiConfig {
    this.config = { ...this.config, ...newConfig };
    localStorage.setItem('zuno_api_config', JSON.stringify(this.config));
    return this.getConfig();
  }

  public async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${this.config.baseUrl}${endpoint}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(this.config.geminiApiKey ? { 'x-ai-key': this.config.geminiApiKey } : {}),
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      const message = error instanceof Error ? error.message : 'Unknown network error';
      // If network fails (e.g. backend not connected yet), throw clear descriptive error
      throw new Error(`[Zuno API] ${message}`);
    }
  }

  public async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  public async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

export const apiClient = new ApiClient();
