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
        {/* Header Section */}
        <div className="text-center mb-2xl">
          <h1 className="text-4xl font-extrabold text-text-primary mb-md">
            CastRank Analytics
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-xl">
            Discover and engage with your most active Farcaster fans. Track engagement metrics and build stronger community connections.
          </p>
        </div>

        {/* Wallet Connection */}
        <div className="mb-2xl">
          <Wallet className="w-full max-w-md mx-auto">
            <ConnectWallet className="w-full bg-primary text-white hover:bg-primary-hover transition-all duration-250 rounded-lg px-lg py-lg shadow-card hover:shadow-card-hover">
              <div className="flex items-center justify-center space-x-2">
                <span className="font-medium">Connect to Analyze Your Fans</span>
                <Name className="text-inherit ml-2" />
              </div>
            </ConnectWallet>
            <WalletDropdown className="bg-surface border border-border rounded-lg shadow-card-hover">
              <Identity className="px-lg pt-md pb-sm" hasCopyAddressOnClick>
                <Avatar className="w-10 h-10" />
                <Name className="text-text-primary font-medium" />
                <Address className="text-text-secondary" />
              </Identity>
              <WalletDropdownDisconnect className="text-error hover:bg-error/10 transition-colors" />
            </WalletDropdown>
          </Wallet>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-2xl bg-surface rounded-xl p-1 shadow-inner-glow max-w-md mx-auto">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex-1 flex items-center justify-center space-x-2 px-lg py-md rounded-lg text-sm font-semibold transition-all duration-250 ${
              currentView === 'dashboard'
                ? 'bg-primary text-white shadow-card'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setCurrentView('fans')}
            className={`flex-1 flex items-center justify-center space-x-2 px-lg py-md rounded-lg text-sm font-semibold transition-all duration-250 ${
              currentView === 'fans'
                ? 'bg-primary text-white shadow-card'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
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
      <footer className="border-t border-border mt-3xl py-2xl text-center">
        <div className="container mx-auto px-md">
          <button
            onClick={() => openUrl('https://base.org')}
            className="inline-flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors text-sm font-medium group"
          >
            <span>Built on Base with MiniKit</span>
            <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          <p className="text-xs text-text-muted mt-sm">
            Empowering creators to understand their community better
          </p>
        </div>
      </footer>
    </div>
  );
}
