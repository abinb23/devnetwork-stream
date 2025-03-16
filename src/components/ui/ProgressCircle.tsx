
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressCircleProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
  backgroundColor?: string;
  showValue?: boolean;
  valueClassName?: string;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value,
  size = 80,
  strokeWidth = 4,
  className,
  color = 'rgb(14, 165, 233)',
  backgroundColor = 'rgb(226, 232, 240)',
  showValue = true,
  valueClassName,
}) => {
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Foreground Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      
      {showValue && (
        <div className={cn('absolute inset-0 flex items-center justify-center', valueClassName)}>
          <span className="text-sm font-medium">{Math.round(value)}%</span>
        </div>
      )}
    </div>
  );
};

export default ProgressCircle;
