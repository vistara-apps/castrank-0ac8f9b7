'use client';

import { cn } from '../utils/cn';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import ProgressBar from './ProgressBar';
import TrendChart from './TrendChart';

interface EngagementMetricProps {
  label: string;
  value: string | number;
  change?: number;
  variant?: 'positive' | 'neutral' | 'negative';
  icon?: React.ReactNode;
  showProgress?: boolean;
  progressValue?: number;
  progressMax?: number;
  trendData?: number[];
  className?: string;
}

export default function EngagementMetric({ 
  label, 
  value, 
  change, 
  variant = 'neutral',
  icon,
  showProgress = false,
  progressValue,
  progressMax = 100,
  trendData,
  className
}: EngagementMetricProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'positive':
        return 'bg-success/5 border-success/20 hover:border-success/30 hover:bg-success/10';
      case 'negative':
        return 'bg-error/5 border-error/20 hover:border-error/30 hover:bg-error/10';
      default:
        return 'bg-surface border-border hover:border-border-hover hover:bg-surface-hover';
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
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-text-secondary';
  };

  const getProgressVariant = () => {
    switch (variant) {
      case 'positive':
        return 'success';
      case 'negative':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const getTrendVariant = () => {
    if (change === undefined) return 'primary';
    if (change > 0) return 'success';
    if (change < 0) return 'warning';
    return 'primary';
  };

  return (
    <div className={cn(
      'group p-lg rounded-lg border transition-all duration-250 hover:shadow-card-hover hover:scale-[1.02] cursor-pointer',
      'focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40',
      getVariantStyles(),
      className
    )}>
      <div className="flex items-center justify-between mb-md">
        <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
          {label}
        </span>
        {icon && (
          <div className="text-text-secondary group-hover:text-primary transition-colors duration-250">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between mb-sm">
        <span className="text-3xl font-bold text-text-primary tabular-nums">
          {value}
        </span>
        
        {trendData && (
          <TrendChart 
            data={trendData} 
            variant={getTrendVariant()}
            size="sm"
            className="opacity-60 group-hover:opacity-100 transition-opacity"
          />
        )}
      </div>

      {showProgress && progressValue !== undefined && (
        <div className="mb-sm">
          <ProgressBar
            value={progressValue}
            max={progressMax}
            variant={getProgressVariant()}
            size="sm"
          />
        </div>
      )}
      
      {change !== undefined && (
        <div className={cn(
          'flex items-center space-x-1 text-xs font-medium',
          'px-2 py-1 rounded-md bg-opacity-10',
          getChangeColor()
        )}>
          {getChangeIcon()}
          <span>
            {change > 0 ? '+' : ''}{change}% from last period
          </span>
        </div>
      )}
    </div>
  );
}
