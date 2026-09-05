// ==========================================
// ERROR STATE COMPONENT
// ==========================================

import React from 'react';
import { AlertTriangle, RefreshCw, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showConfigAction?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Service Unavailable',
  message = 'Unable to connect to the intelligence service. Ensure your data source or API endpoint is configured.',
  onRetry,
  showConfigAction = true,
}) => {
  const { setCurrentRoute } = useApp();

  return (
    <div
      className="card"
      style={{
        padding: 'var(--space-8) var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        border: '1px solid var(--status-critical-border)',
        backgroundColor: '#fffcfc',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: 'var(--status-critical-bg)',
          color: 'var(--status-critical)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--space-3)',
        }}
      >
        <AlertTriangle size={24} />
      </div>

      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: 460, marginBottom: 'var(--space-4)' }}>
        {message}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        {onRetry && (
          <button type="button" className="btn btn-secondary btn-sm" onClick={onRetry}>
            <RefreshCw size={14} />
            Try Again
          </button>
        )}
        {showConfigAction && (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setCurrentRoute('settings')}
          >
            <Settings size={14} />
            Configure API
          </button>
        )}
      </div>
    </div>
  );
};
