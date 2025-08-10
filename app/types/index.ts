
export interface Creator {
  farcasterId: string;
  displayName: string;
  profilePicUrl?: string;
}

export interface FanEngagementRecord {
  farcasterId: string;
  creatorId: string;
  totalCastInteractions: number;
  lastInteractionTimestamp: string;
  engagementScore: number;
  interactionBreakdown: {
    replies: number;
    recasts: number;
    likes: number;
  };
}

export interface User {
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
}
