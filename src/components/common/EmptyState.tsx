// ==========================================
// REUSABLE EMPTY STATE COMPONENT
// ==========================================

import React, { ReactNode } from 'react';
import { LucideIcon, Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
  badgeText?: string;
  customIllustration?: ReactNode;
  compact?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
  badgeText,
  customIllustration,
  compact = false,
}) => {
  return (
    <div
      className="empty-state"
      style={{
        padding: compact ? 'var(--space-6) var(--space-4)' : 'var(--space-10) var(--space-6)',
        backgroundColor: 'var(--bg-surface)',
      }}
    >
      {badgeText && (
        <span className="badge badge-purple" style={{ marginBottom: 'var(--space-3)' }}>
          {badgeText}
        </span>
      )}

      {customIllustration ? (
        <div style={{ marginBottom: 'var(--space-4)' }}>{customIllustration}</div>
      ) : (
        <div className="empty-icon-wrap">
          <Icon size={24} strokeWidth={1.8} />
        </div>
      )}

      <h3 className="empty-title">{title}</h3>
      <p className="empty-desc">{description}</p>

      {(actionText || secondaryActionText) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
          {actionText && onAction && (
            <button type="button" className="btn btn-primary btn-sm" onClick={onAction}>
              {actionText}
            </button>
          )}
          {secondaryActionText && onSecondaryAction && (
            <button type="button" className="btn btn-secondary btn-sm" onClick={onSecondaryAction}>
              {secondaryActionText}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
