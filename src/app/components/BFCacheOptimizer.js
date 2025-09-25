'use client';

import { useEffect } from 'react';

export default function BFCacheOptimizer() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Optimize for back/forward cache
    const optimizeBFCache = () => {
      // Remove event listeners that might prevent bfcache
      const cleanup = () => {
        // Remove any global event listeners that might interfere
        window.removeEventListener('beforeunload', () => {});
        window.removeEventListener('unload', () => {});
      };

      // Add page visibility change handler
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          // Page is being hidden, prepare for bfcache
          cleanup();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      // Add page show handler for bfcache restoration
      const handlePageShow = (event) => {
        if (event.persisted) {
          // Page was restored from bfcache
          console.log('Page restored from bfcache');
          
          // Reinitialize any necessary components
          if (window.adsbygoogle) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        }
      };

      window.addEventListener('pageshow', handlePageShow);

      // Cleanup function
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('pageshow', handlePageShow);
      };
    };

    const cleanup = optimizeBFCache();

    return cleanup;
  }, []);

  return null;
}
