import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen dotted-background">
      <Header />
      <main className="pt-0"> {/* Removed padding-top since header is now absolute */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;