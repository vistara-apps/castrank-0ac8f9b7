
'use client';

import { Avatar, Name } from '@coinbase/onchainkit/identity';
import { Star, MessageCircle, Repeat, Heart } from 'lucide-react';
import { clsx } from 'clsx';

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
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-accent';
    if (score >= 40) return 'text-yellow-400';
    return 'text-text-secondary';
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
      <div className="flex items-center space-x-3 p-3 bg-surface rounded-lg border border-border hover:border-primary/50 transition-colors">
        {rank && (
          <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">#{rank}</span>
          </div>
        )}
        
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
          {user.profilePicUrl ? (
            <img src={user.profilePicUrl} alt={user.displayName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs font-semibold text-primary">
              {user.displayName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">{user.displayName}</p>
          <p className="text-xs text-text-secondary truncate">@{user.username}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-accent" />
            <span className={clsx('text-xs font-medium', getScoreColor(user.engagementScore))}>
              {formatScore(user.engagementScore)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border p-4 shadow-card hover:border-primary/50 transition-all duration-200 animate-slide-up">
      <div className="flex items-start space-x-4">
        {rank && (
          <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-primary">#{rank}</span>
          </div>
        )}
        
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
          {user.profilePicUrl ? (
            <img src={user.profilePicUrl} alt={user.displayName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg font-bold text-primary">
              {user.displayName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-base font-semibold text-text-primary truncate">{user.displayName}</h3>
            <span className="text-sm text-text-secondary">@{user.username}</span>
          </div>
          
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-accent" />
              <span className={clsx('text-sm font-medium', getScoreColor(user.engagementScore))}>
                {formatScore(user.engagementScore)} score
              </span>
            </div>
            <span className="text-sm text-text-secondary">
              {user.totalInteractions} interactions
            </span>
            <span className="text-sm text-text-secondary">
              Last: {formatTimeAgo(user.lastInteraction)}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-text-secondary">{user.interactionBreakdown.replies}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Repeat className="w-4 h-4 text-green-400" />
              <span className="text-sm text-text-secondary">{user.interactionBreakdown.recasts}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-sm text-text-secondary">{user.interactionBreakdown.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
