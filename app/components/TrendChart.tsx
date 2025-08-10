'use client';

import { cn } from '../utils/cn';

interface TrendChartProps {
  data: number[];
  variant?: 'primary' | 'success' | 'warning' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function TrendChart({
  data,
  variant = 'primary',
  size = 'md',
  className,
}: TrendChartProps) {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const sizeClasses = {
    sm: 'h-8 w-16',
    md: 'h-12 w-24',
    lg: 'h-16 w-32',
  };

  const variantClasses = {
    primary: 'stroke-primary',
    success: 'stroke-success',
    warning: 'stroke-warning',
    accent: 'stroke-accent',
  };

  // Create SVG path
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  const pathD = `M ${points}`;

  return (
    <div className={cn('inline-flex items-center justify-center', sizeClasses[size], className)}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d={pathD}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn('transition-all duration-300', variantClasses[variant])}
        />
        {/* Add dots for data points */}
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((value - min) / range) * 100;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              className={cn('transition-all duration-300', variantClasses[variant])}
              fill="currentColor"
            />
          );
        })}
      </svg>
    </div>
  );
}

