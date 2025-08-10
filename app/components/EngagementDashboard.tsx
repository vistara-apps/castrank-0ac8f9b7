'use client';

import EngagementMetric from './EngagementMetric';
import UserCard from './UserCard';
import { TrendingUp, Users, MessageCircle, Repeat, Heart, Star, Send } from 'lucide-react';

// Mock data for demonstration
const topFans = [
  {
    fid: '1',
    displayName: 'Alex Chen',
    username: 'alexc',
    profilePicUrl: '',
    engagementScore: 95.2,
    totalInteractions: 247,
    lastInteraction: '2024-01-15T10:30:00Z',
    interactionBreakdown: { replies: 89, recasts: 76, likes: 82 }
  },
  {
    fid: '2',
    displayName: 'Sarah Johnson',
    username: 'sarahj',
    profilePicUrl: '',
    engagementScore: 87.8,
    totalInteractions: 198,
    lastInteraction: '2024-01-14T15:45:00Z',
    interactionBreakdown: { replies: 67, recasts: 54, likes: 77 }
  },
  {
    fid: '3',
    displayName: 'Mike Rodriguez',
    username: 'miker',
    profilePicUrl: '',
    engagementScore: 82.1,
    totalInteractions: 156,
    lastInteraction: '2024-01-13T09:15:00Z',
    interactionBreakdown: { replies: 45, recasts: 42, likes: 69 }
  }
];

export default function EngagementDashboard() {
  return (
    <div className="space-y-xl">
      {/* Overview Metrics */}
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-lg">Engagement Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <EngagementMetric
            label="Total Fans"
            value="1,247"
            change={12}
            variant="positive"
            icon={<Users className="w-5 h-5" />}
          />
          <EngagementMetric
            label="Avg Score"
            value="73.2"
            change={5}
            variant="positive"
            icon={<Star className="w-5 h-5" />}
          />
          <EngagementMetric
            label="Replies"
            value="892"
            change={8}
            variant="positive"
            icon={<MessageCircle className="w-5 h-5" />}
          />
          <EngagementMetric
            label="Recasts"
            value="634"
            change={-3}
            variant="negative"
            icon={<Repeat className="w-5 h-5" />}
          />
        </div>
      </div>

      {/* Engagement Breakdown */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-md">This Week's Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <EngagementMetric
            label="New Replies"
            value="156"
            change={24}
            variant="positive"
            icon={<MessageCircle className="w-5 h-5" />}
          />
          <EngagementMetric
            label="New Recasts"
            value="89"
            change={-12}
            variant="negative"
            icon={<Repeat className="w-5 h-5" />}
          />
          <EngagementMetric
            label="New Likes"
            value="312"
            change={18}
            variant="positive"
            icon={<Heart className="w-5 h-5" />}
          />
        </div>
      </div>

      {/* Top Performers */}
      <div>
        <div className="flex items-center justify-between mb-lg">
          <h3 className="text-lg font-semibold text-text-primary">Top Performing Fans</h3>
          <div className="flex items-center space-x-1 text-sm text-text-secondary">
            <TrendingUp className="w-4 h-4" />
            <span>Ranked by engagement score</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {topFans.map((fan, index) => (
            <UserCard key={fan.fid} user={fan} rank={index + 1} variant="compact" />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface rounded-lg border border-border p-lg">
        <h3 className="text-lg font-semibold text-text-primary mb-md">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-primary/10 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
            <Send className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="font-medium text-text-primary">Send Exclusive Cast</p>
              <p className="text-sm text-text-secondary">Reach your top fans directly</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-accent/10 rounded-lg border border-accent/20 hover:border-accent/40 transition-colors">
            <TrendingUp className="w-5 h-5 text-accent" />
            <div className="text-left">
              <p className="font-medium text-text-primary">View Analytics</p>
              <p className="text-sm text-text-secondary">Deep dive into engagement data</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
