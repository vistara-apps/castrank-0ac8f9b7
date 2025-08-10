
'use client';

import { useMiniKit, useAddFrame, useOpenUrl, useClose } from '@coinbase/onchainkit/minikit';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet';
import { Name, Identity, Address, Avatar } from '@coinbase/onchainkit/identity';
import FrameHeader from './components/FrameHeader';
import FanList from './components/FanList';
import EngagementDashboard from './components/EngagementDashboard';
import { Plus, TrendingUp, Users } from 'lucide-react';

export default function CastRankApp() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'fans' | 'analytics'>('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  
  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const close = useClose();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
    
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    try {
      const result = await addFrame();
      setFrameAdded(Boolean(result));
      if (result) {
        console.log('Frame added:', result.url, result.token);
      }
    } catch (error) {
      console.error('Failed to add frame:', error);
    }
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <button
          onClick={handleAddFrame}
          className="bg-primary text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4 inline mr-1" />
          Save
        </button>
      );
    }
    return null;
  }, [context, handleAddFrame]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading CastRank...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <FrameHeader
        saveFrameButton={saveFrameButton}
        onClose={close}
        onOpenUrl={openUrl}
      />

      <main className="container mx-auto px-md py-lg">
        {/* Wallet Connection */}
        <div className="mb-xl">
          <Wallet className="w-full">
            <ConnectWallet className="w-full bg-primary text-white hover:bg-primary/90 transition-colors rounded-lg px-4 py-3">
              <div className="flex items-center justify-center space-x-2">
                <span>Connect to Analyze Your Fans</span>
                <Name className="text-inherit ml-2" />
              </div>
            </ConnectWallet>
            <WalletDropdown className="bg-surface border border-border rounded-lg shadow-card">
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar className="w-8 h-8" />
                <Name className="text-text-primary" />
                <Address className="text-text-secondary" />
              </Identity>
              <WalletDropdownDisconnect className="text-red-400 hover:bg-red-400/10" />
            </WalletDropdown>
          </Wallet>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-lg bg-surface rounded-lg p-1">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === 'dashboard'
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setCurrentView('fans')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === 'fans'
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Top Fans</span>
          </button>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {currentView === 'dashboard' && <EngagementDashboard />}
          {currentView === 'fans' && <FanList />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-xl py-lg text-center">
        <button
          onClick={() => openUrl('https://base.org')}
          className="text-text-secondary hover:text-primary transition-colors text-sm"
        >
          Built on Base with MiniKit
        </button>
      </footer>
    </div>
  );
}
