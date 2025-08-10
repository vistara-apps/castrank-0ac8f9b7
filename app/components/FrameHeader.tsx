
'use client';

import { type ReactNode } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface FrameHeaderProps {
  saveFrameButton: ReactNode;
  onClose: () => void;
  onOpenUrl: (url: string) => void;
}

export default function FrameHeader({ saveFrameButton, onClose, onOpenUrl }: FrameHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-md py-sm flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CR</span>
          </div>
          <h1 className="text-lg font-semibold text-text-primary">CastRank</h1>
        </div>

        <div className="flex items-center space-x-2">
          {saveFrameButton}
          <button
            onClick={() => onOpenUrl('https://github.com/base-org/minikit')}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
            title="Learn More"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
