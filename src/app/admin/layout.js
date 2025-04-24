"use client";

import { useState, useEffect } from 'react';
import './admin.css';
import Sidebar from './sidebar';
import Header from './header';

export default function AdminLayout({ children }) {
  const [isMobileView, setIsMobileView] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if we're in a mobile view on mount and when window resizes
  useEffect(() => {
    const checkMobileView = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      
      // Auto-close sidebar on mobile, open on desktop
      setSidebarOpen(!isMobile);
    };

    // Initial check
    checkMobileView();

    // Add resize listener
    window.addEventListener('resize', checkMobileView);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-root">
      {/* Mobile sidebar backdrop */}
      {isMobileView && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20" 
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - conditionally shown on mobile */}
      <div className={`admin-sidebar ${isMobileView ? 'mobile' : ''} ${sidebarOpen ? 'open' : 'closed'}`}>
        <Sidebar closeSidebar={closeSidebar} />
      </div>

      <div className="admin-main">
        <Header toggleSidebar={toggleSidebar} isMobileView={isMobileView} />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
