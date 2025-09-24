"use client";

import { useEffect, useState } from 'react';

export default function PerformanceOptimizer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical images
      const criticalImages = [
        '/hero-bg.png',
        '/cg-map.png'
      ];
      
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Preload critical API endpoints
    const preloadCriticalAPIs = () => {
      const criticalAPIs = [
        '/api/places?featured=true&limit=3',
        '/api/reviews?featured=true&limit=3',
        '/api/events?upcoming=true&limit=3',
        '/api/food?featured=true&limit=3'
      ];
      
      criticalAPIs.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
      });
    };

    // Optimize third-party scripts loading
    const optimizeThirdPartyScripts = () => {
      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[src*="googletagmanager"]');
      scripts.forEach(script => {
        if (!script.hasAttribute('defer')) {
          script.setAttribute('defer', '');
        }
      });
    };

    // Run optimizations after a short delay to not block initial render
    setTimeout(() => {
      preloadCriticalResources();
      preloadCriticalAPIs();
      optimizeThirdPartyScripts();
    }, 100);

    // Cleanup function
    return () => {
      // Remove any dynamically added preload links
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach(link => {
        if (link.href.includes('/hero-bg.png') || link.href.includes('/cg-map.png')) {
          link.remove();
        }
      });
    };
  }, []);

  // Don't render anything on server side
  if (!isClient) {
    return null;
  }

  return null;
}
