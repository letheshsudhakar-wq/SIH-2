// ==========================================
// TOAST NOTIFICATIONS
// ==========================================

import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 size={18} color="var(--status-success)" />,
    error: <AlertCircle size={18} color="var(--status-critical)" />,
    warning: <AlertTriangle size={18} color="var(--status-warning)" />,
    info: <Info size={18} color="var(--zuno-primary-600)" />,
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        maxWidth: 380,
        width: '100%',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            padding: '12px 16px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            animation: 'slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div style={{ flexShrink: 0, marginTop: 2 }}>{icons[toast.type]}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {toast.title}
            </div>
            {toast.message && (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                {toast.message}
              </div>
            )}
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => removeToast(toast.id)}
            style={{ padding: 2, color: 'var(--text-muted)' }}
            aria-label="Close notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
