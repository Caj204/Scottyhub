import React from 'react';
import {
  Lock,
  Menu,
  MessageSquare,
  Scan,
  Sparkles,
  LayoutGrid,
  Heart,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import welcomeLogo from '../assets/images/scottyhub_welcome_logo.jpg';

import { AuthGate } from './AuthGate';
import { BiometricModal } from './BiometricModal';
import { CodeViewerModal } from './CodeViewerModal';
import { PushNotificationToast } from './PushNotificationToast';
import { ScottyDrawer } from './ScottyDrawer';
import { ToolModals } from './ToolModals';

import { ConnectTab } from './tabs/ConnectTab';
import { GrowTab } from './tabs/GrowTab';
import { HomeTab } from './tabs/HomeTab';
import { LearnTab } from './tabs/LearnTab';
import { SettingsTab } from './tabs/SettingsTab';

export const MobileDeviceFrame: React.FC = () => {
  const {
    platform,
    activeTab,
    setActiveTab,
    isLocked,
    openBiometricAuth,
    toggleDrawer,
    setActiveToolModal,
    isAuthenticated,
  } = useApp();



  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'connect':
        return <ConnectTab />;
      case 'learn':
        return <LearnTab />;
      case 'grow':
        return <GrowTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-sleek-radial font-sans overflow-x-hidden relative">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Site Wrapper (no device bezel) */}
      <div className="relative min-h-screen w-full bg-slate-950 flex flex-col">
        {/* In-App Push Notification Banner Overlay */}
        <PushNotificationToast />

        {/* Main Content Area or Biometric Privacy Lock Screen */}
        <div className="relative flex-1 w-full max-w-6xl mx-auto overflow-y-auto overflow-x-hidden bg-slate-950">
          {isLocked ? (
            /* Locked Screen Overlay */
            <div className="absolute inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center text-white space-y-6">
              <div className="relative">
                <img
                  src={welcomeLogo}
                  alt="ScottHub Logo"
                  referrerPolicy="no-referrer"
                  className="w-44 h-28 object-contain drop-shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-2xl shadow-lg border border-indigo-400/40">
                  <Lock className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 font-bold block mb-1">
                  SENTINEL PRIVACY SHIELD
                </span>
                <h2 className="text-xl font-bold tracking-tight text-white">Biometric Scan Required</h2>
                <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                  Authentication required to decrypt cached offline data & secure user communications.
                </p>
              </div>

              <button
                onClick={openBiometricAuth}
                className="w-full max-w-xs py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-500/30 transition flex items-center justify-center gap-2 border border-indigo-400/30 active:scale-[0.98]"
              >
                <Scan className="w-5 h-5" />
                <span>Verify {platform === 'ios' ? 'Face ID' : 'Fingerprint'}</span>
              </button>
            </div>
          ) : !isAuthenticated ? (
            <AuthGate />
          ) : (
            renderActiveTab()
          )}
        </div>

        {/* ScottyHub Bottom Navigation Bar with Center Elevated AI Button (only once logged in) */}
        {isAuthenticated && (
        <div className="sticky bottom-0 left-0 right-0 z-30 w-full bg-slate-950/95 border-t border-white/10 backdrop-blur-2xl px-3 sm:px-8 py-1.5 flex items-center justify-center sm:justify-center gap-6 sm:gap-12 text-slate-400">
          {/* 1. Home */}
          <button
            onClick={() => {
              setActiveTab('home');
              setActiveToolModal(null);
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 ${
              activeTab === 'home' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="text-[9px] mt-0.5 tracking-wider">Home</span>
          </button>

          {/* 2. Earn */}
          <button
            onClick={() => setActiveToolModal('earn-referrals')}
            className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-white"
          >
            <Heart className="w-5 h-5 text-rose-400" />
            <span className="text-[9px] mt-0.5 tracking-wider">Earn</span>
          </button>

          {/* 3. ScottyAI Center Glowing Button */}
          <button
            onClick={() => setActiveToolModal('ai-chat')}
            aria-label="Open ScottyAI"
            className="-mt-5 p-3.5 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-400 text-slate-950 shadow-lg shadow-cyan-500/40 border-2 border-white/20 hover:scale-105 active:scale-95 transition"
          >
            <Sparkles className="w-6 h-6 fill-slate-950 animate-pulse" />
          </button>

          {/* 4. Community Feed */}
          <button
            onClick={() => {
              setActiveTab('connect');
              setActiveToolModal(null);
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 ${
              activeTab === 'connect' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[9px] mt-0.5 tracking-wider">Feed</span>
          </button>

          {/* 5. More / Menu */}
          <button
            onClick={toggleDrawer}
            className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[9px] mt-0.5 tracking-wider">More</span>
          </button>
        </div>
        )}

        {/* Left Slide-out Drawer (only once logged in) */}
        {isAuthenticated && <ScottyDrawer />}

        {/* Tool Modals (only once logged in) */}
        {isAuthenticated && <ToolModals />}
      </div>

      {/* Security & Code Modals */}
      <BiometricModal />
      <CodeViewerModal />
    </div>
  );
};
