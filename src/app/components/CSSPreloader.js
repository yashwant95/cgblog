'use client';

import { useEffect } from 'react';

export default function CSSPreloader() {
  useEffect(() => {
    // Preload critical CSS with proper onLoad handling
    const preloadCriticalCSS = () => {
      // Skip CSS preloading in development to avoid MIME type errors
      if (process.env.NODE_ENV === 'development') {
        console.log('CSS preloading skipped in development mode');
        return;
      }

      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = '/_next/static/css/app/layout.css';
      link.as = 'style';
      
      link.onload = function() {
        this.onload = null;
        this.rel = 'stylesheet';
      };
      
      document.head.appendChild(link);
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      preloadCriticalCSS();
    }
  }, []);

  return null;
}
