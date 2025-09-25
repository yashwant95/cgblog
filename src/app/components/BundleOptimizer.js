'use client';

import { useEffect } from 'react';

export default function BundleOptimizer() {
  useEffect(() => {
    // Performance monitoring for bundle optimization
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor long tasks
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 100) {
            console.warn('Long task detected:', entry.duration + 'ms');
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // Long task API not supported
      }

      // Monitor resource loading
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.transferSize > 100000) { // 100KB
            console.warn('Large resource loaded:', entry.name, entry.transferSize + ' bytes');
          }
        }
      });

      try {
        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (e) {
        // Resource timing not supported
      }
    }
  }, []);

  return null;
}
