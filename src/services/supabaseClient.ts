// ==========================================
// SUPABASE CLIENT CONFIGURATION & CLIENT
// ==========================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
}

const DEFAULT_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const DEFAULT_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

class SupabaseManager {
  private client: SupabaseClient | null = null;
  private config: SupabaseConfig = {
    url: DEFAULT_SUPABASE_URL,
    anonKey: DEFAULT_SUPABASE_ANON_KEY,
    isConnected: false,
  };

  constructor() {
    const savedConfig = localStorage.getItem('zuno_supabase_config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        this.config = { ...this.config, ...parsed };
      } catch {
        // use defaults
      }
    }
    this.initClient();
  }

  private initClient() {
    if (this.config.url && this.config.anonKey) {
      try {
        this.client = createClient(this.config.url, this.config.anonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
          },
        });
        this.config.isConnected = true;
      } catch (err) {
        console.error('Failed to initialize Supabase client:', err);
        this.client = null;
        this.config.isConnected = false;
      }
    } else {
      this.client = null;
      this.config.isConnected = false;
    }
  }

  public getClient(): SupabaseClient | null {
    return this.client;
  }

  public getConfig(): SupabaseConfig {
    return { ...this.config };
  }

  public updateConfig(newConfig: Partial<SupabaseConfig>): SupabaseConfig {
    this.config = { ...this.config, ...newConfig };
    localStorage.setItem('zuno_supabase_config', JSON.stringify({
      url: this.config.url,
      anonKey: this.config.anonKey,
    }));
    this.initClient();
    return this.getConfig();
  }

  /**
   * Test connection against Supabase
   */
  public async testConnection(): Promise<{ success: boolean; message: string }> {
    if (!this.client || !this.config.url || !this.config.anonKey) {
      return {
        success: false,
        message: 'Supabase URL and Anon Key are required.',
      };
    }

    try {
      // Test basic connectivity via health / auth session check
      const { error } = await this.client.auth.getSession();
      if (error) {
        return { success: false, message: `Auth error: ${error.message}` };
      }
      return { success: true, message: 'Successfully connected to Supabase project!' };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown connection error';
      return { success: false, message: `Connection failed: ${msg}` };
    }
  }

  /**
   * Helper to invoke Supabase Edge Functions (e.g. gemini-ai)
   */
  public async invokeEdgeFunction<T = any>(functionName: string, body?: any): Promise<T> {
    if (!this.client) {
      throw new Error('Supabase client is not connected. Please provide URL and Anon Key in Settings or .env');
    }

    const { data, error } = await this.client.functions.invoke(functionName, {
      body,
    });

    if (error) {
      throw new Error(`Edge Function [${functionName}] error: ${error.message}`);
    }

    return data as T;
  }
}

export const supabaseManager = new SupabaseManager();
export const getSupabase = () => supabaseManager.getClient();
