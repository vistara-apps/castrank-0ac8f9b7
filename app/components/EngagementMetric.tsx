
'use client';

import { clsx } from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface EngagementMetricProps {
  label: string;
  value: string | number;
  change?: number;
  variant?: 'positive' | 'neutral' | 'negative';
  icon?: React.ReactNode;
}

export default function EngagementMetric({ 
  label, 
  value, 
  change, 
  variant = 'neutral',
  icon 
}: EngagementMetricProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'positive':
        return 'bg-green-500/10 border-green-500/20 text-green-400';
      case 'negative':
        return 'bg-red-500/10 border-red-500/20 text-red-400';
      default:
        return 'bg-surface border-border text-text-primary';
    }
  };

  const getChangeIcon = () => {
    if (change === undefined) return null;
    if (change > 0) return <TrendingUp className="w-3 h-3" />;
    if (change < 0) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getChangeColor = () => {
    if (change === undefined) return '';
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-text-secondary';
  };

  return (
    <div className={clsx(
      'p-4 rounded-lg border transition-all duration-200 hover:scale-105',
      getVariantStyles()
    )}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-text-secondary">{label}</span>
        {icon && <div className="text-text-secondary">{icon}</div>}
      </div>
      
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold">{value}</span>
        
        {change !== undefined && (
          <div className={clsx('flex items-center space-x-1 text-xs', getChangeColor())}>
            {getChangeIcon()}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
