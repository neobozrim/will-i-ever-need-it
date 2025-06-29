import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

const Layout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen dotted-background">
      <Header />
      <main className={isHomePage ? '' : 'pt-0'}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;