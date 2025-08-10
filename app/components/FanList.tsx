
'use client';

import { useState } from 'react';
import UserCard from './UserCard';
import FilterDropdown from './FilterDropdown';
import ActionButton from './ActionButton';
import { Search, Send, Users } from 'lucide-react';

// Mock data for demonstration
const mockFans = [
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
  },
  {
    fid: '4',
    displayName: 'Emma Wilson',
    username: 'emmaw',
    profilePicUrl: '',
    engagementScore: 76.5,
    totalInteractions: 134,
    lastInteraction: '2024-01-12T18:20:00Z',
    interactionBreakdown: { replies: 38, recasts: 41, likes: 55 }
  },
  {
    fid: '5',
    displayName: 'David Kim',
    username: 'davidk',
    profilePicUrl: '',
    engagementScore: 71.3,
    totalInteractions: 112,
    lastInteraction: '2024-01-11T12:30:00Z',
    interactionBreakdown: { replies: 32, recasts: 35, likes: 45 }
  }
];

const filterOptions = [
  { label: 'All Fans', value: 'all' },
  { label: 'High Engagement (80+)', value: 'high' },
  { label: 'Medium Engagement (60-79)', value: 'medium' },
  { label: 'Recent Activity (7 days)', value: 'recent' },
  { label: 'Most Replies', value: 'replies' },
  { label: 'Most Recasts', value: 'recasts' }
];

export default function FanList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedFans, setSelectedFans] = useState<Set<string>>(new Set());

  const filteredFans = mockFans.filter(fan => {
    const matchesSearch = fan.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fan.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (filter) {
      case 'high':
        return matchesSearch && fan.engagementScore >= 80;
      case 'medium':
        return matchesSearch && fan.engagementScore >= 60 && fan.engagementScore < 80;
      case 'recent':
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return matchesSearch && new Date(fan.lastInteraction) >= weekAgo;
      case 'replies':
        return matchesSearch && fan.interactionBreakdown.replies >= 40;
      case 'recasts':
        return matchesSearch && fan.interactionBreakdown.recasts >= 40;
      default:
        return matchesSearch;
    }
  });

  const toggleFanSelection = (fid: string) => {
    const newSelected = new Set(selectedFans);
    if (newSelected.has(fid)) {
      newSelected.delete(fid);
    } else {
      newSelected.add(fid);
    }
    setSelectedFans(newSelected);
  };

  const handleSendExclusiveCast = () => {
    if (selectedFans.size === 0) return;
    
    // Mock implementation - in real app, this would integrate with Farcaster API
    console.log('Sending exclusive cast to fans:', Array.from(selectedFans));
    alert(`Exclusive cast would be sent to ${selectedFans.size} selected fan${selectedFans.size > 1 ? 's' : ''}!`);
    setSelectedFans(new Set());
  };

  return (
    <div className="space-y-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Your Top Fans</h2>
          <p className="text-text-secondary">Ranked by engagement score</p>
        </div>
        
        {selectedFans.size > 0 && (
          <ActionButton
            onClick={handleSendExclusiveCast}
            icon={<Send className="w-4 h-4" />}
          >
            Send to {selectedFans.size} fan{selectedFans.size > 1 ? 's' : ''}
          </ActionButton>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search fans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-md text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary"
          />
        </div>
        
        <div className="sm:w-48">
          <FilterDropdown
            options={filterOptions}
            value={filter}
            onChange={setFilter}
            placeholder="Filter fans"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm text-text-secondary">Total Fans</span>
          </div>
          <p className="text-2xl font-bold text-text-primary mt-1">{mockFans.length}</p>
        </div>
        
        <div className="bg-surface rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-accent" />
            <span className="text-sm text-text-secondary">High Engagement</span>
          </div>
          <p className="text-2xl font-bold text-text-primary mt-1">
            {mockFans.filter(f => f.engagementScore >= 80).length}
          </p>
        </div>
        
        <div className="bg-surface rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-green-400" />
            <span className="text-sm text-text-secondary">Selected</span>
          </div>
          <p className="text-2xl font-bold text-text-primary mt-1">{selectedFans.size}</p>
        </div>
      </div>

      {/* Fan List */}
      <div className="space-y-3">
        {filteredFans.length === 0 ? (
          <div className="text-center py-xl">
            <Users className="w-12 h-12 text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No fans found matching your criteria</p>
          </div>
        ) : (
          filteredFans.map((fan, index) => (
            <div
              key={fan.fid}
              className={`cursor-pointer transition-all duration-200 ${
                selectedFans.has(fan.fid) ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => toggleFanSelection(fan.fid)}
            >
              <UserCard user={fan} rank={index + 1} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
