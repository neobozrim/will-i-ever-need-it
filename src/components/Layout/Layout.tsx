import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import VoiceAIAgent from '../Concept/VoiceAIAgent';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen dotted-background">
      <Header />
      <main className="pt-0">
        <Outlet />
      </main>
      {/* Global Voice AI Agent - Available on all pages */}
      <VoiceAIAgent />
    </div>
  );
};

export default Layout;