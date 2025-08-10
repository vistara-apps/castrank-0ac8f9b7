'use client';

import { Avatar, Name } from '@coinbase/onchainkit/identity';
import { Star, MessageCircle, Repeat, Heart, TrendingUp } from 'lucide-react';
import { cn } from '../utils/cn';
import ProgressBar from './ProgressBar';

interface UserCardProps {
  user: {
    fid: string;
    displayName: string;
    username: string;
    profilePicUrl?: string;
    engagementScore: number;
    totalInteractions: number;
    lastInteraction: string;
    interactionBreakdown: {
      replies: number;
      recasts: number;
      likes: number;
    };
  };
  variant?: 'compact' | 'detailed';
  rank?: number;
}

export default function UserCard({ user, variant = 'detailed', rank }: UserCardProps) {
  const formatScore = (score: number) => {
    return Math.round(score * 100) / 100;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-accent';
    if (score >= 40) return 'text-warning';
    return 'text-text-secondary';
  };

  const getScoreVariant = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'accent';
    if (score >= 40) return 'warning';
    return 'primary';
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
    return `${Math.floor(diffInDays / 30)}mo ago`;
  };

  if (variant === 'compact') {
    return (
      <div className={cn(
        'group flex items-center space-x-3 p-md bg-surface rounded-lg border border-border',
        'hover:border-primary/50 hover:bg-surface-hover hover:shadow-card transition-all duration-250',
        'cursor-pointer focus-within:ring-2 focus-within:ring-primary/20'
      )}>
        {rank && (
          <div className={cn(
            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors',
            rank <= 3 ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'
          )}>
            <span className="text-sm font-semibold">#{rank}</span>
          </div>
        )}
        
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
          {user.profilePicUrl ? (
            <img src={user.profilePicUrl} alt={user.displayName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs font-semibold text-primary">
              {user.displayName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary truncate group-hover:text-primary transition-colors">
            {user.displayName}
          </p>
          <p className="text-xs text-text-secondary truncate">@{user.username}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-accent" />
            <span className={cn('text-xs font-medium tabular-nums', getScoreColor(user.engagementScore))}>
              {formatScore(user.engagementScore)}
            </span>
          </div>
          <TrendingUp className="w-3 h-3 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'group bg-surface rounded-lg border border-border p-lg shadow-card',
      'hover:border-primary/50 hover:shadow-card-hover hover:bg-surface-hover',
      'transition-all duration-250 animate-slide-up cursor-pointer',
      'focus-within:ring-2 focus-within:ring-primary/20'
    )}>
      <div className="flex items-start space-x-lg">
        {rank && (
          <div className={cn(
            'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-250',
            rank <= 3 ? 'bg-accent/20 text-accent ring-2 ring-accent/20' : 'bg-primary/20 text-primary'
          )}>
            <span className="text-sm font-bold">#{rank}</span>
          </div>
        )}
        
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden ring-2 ring-transparent group-hover:ring-primary/30 transition-all duration-250">
          {user.profilePicUrl ? (
            <img src={user.profilePicUrl} alt={user.displayName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg font-bold text-primary">
              {user.displayName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-sm">
            <h3 className="text-lg font-semibold text-text-primary truncate group-hover:text-primary transition-colors">
              {user.displayName}
            </h3>
            <span className="text-sm text-text-secondary">@{user.username}</span>
          </div>
          
          <div className="flex items-center space-x-lg mb-md">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-accent" />
              <span className={cn('text-sm font-semibold tabular-nums', getScoreColor(user.engagementScore))}>
                {formatScore(user.engagementScore)}
              </span>
              <span className="text-xs text-text-muted">score</span>
            </div>
            <span className="text-sm text-text-secondary">
              <span className="font-medium tabular-nums">{user.totalInteractions}</span> interactions
            </span>
            <span className="text-sm text-text-secondary">
              Last: <span className="font-medium">{formatTimeAgo(user.lastInteraction)}</span>
            </span>
          </div>

          {/* Engagement Score Progress Bar */}
          <div className="mb-md">
            <ProgressBar
              value={user.engagementScore}
              max={100}
              variant={getScoreVariant(user.engagementScore)}
              size="sm"
              showLabel={false}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-lg">
            <div className="flex items-center space-x-2 p-2 rounded-md bg-primary/5 border border-primary/10">
              <MessageCircle className="w-4 h-4 text-primary" />
              <div>
                <span className="text-sm font-semibold text-text-primary tabular-nums">
                  {user.interactionBreakdown.replies}
                </span>
                <p className="text-xs text-text-muted">replies</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-md bg-success/5 border border-success/10">
              <Repeat className="w-4 h-4 text-success" />
              <div>
                <span className="text-sm font-semibold text-text-primary tabular-nums">
                  {user.interactionBreakdown.recasts}
                </span>
                <p className="text-xs text-text-muted">recasts</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-md bg-error/5 border border-error/10">
              <Heart className="w-4 h-4 text-error" />
              <div>
                <span className="text-sm font-semibold text-text-primary tabular-nums">
                  {user.interactionBreakdown.likes}
                </span>
                <p className="text-xs text-text-muted">likes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
