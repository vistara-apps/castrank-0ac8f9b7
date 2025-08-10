'use client';

import { cn } from '../utils/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning' | 'accent';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel = false,
  label,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variantClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    accent: 'bg-accent',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-text-secondary">{label}</span>
          <span className="text-sm font-medium text-text-primary">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={cn(
        'w-full bg-surface rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

