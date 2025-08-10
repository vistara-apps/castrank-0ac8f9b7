'use client';

import { cn } from '../utils/cn';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-2xl px-lg text-center',
      className
    )}>
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-lg">
          <Icon className="w-8 h-8 text-text-muted" />
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-text-primary mb-sm">
        {title}
      </h3>
      
      <p className="text-text-secondary max-w-md mb-lg">
        {description}
      </p>
      
      {action && (
        <button
          onClick={action.onClick}
          className={cn(
            'px-lg py-md bg-primary text-white rounded-lg font-medium',
            'hover:bg-primary-hover transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-bg'
          )}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

