"use client";

import { useEffect, useState } from 'react';

export default function PerformanceOptimizer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical images - only hero image for LCP
      const criticalImages = [
        '/optimized/hero-bg.avif'
      ];
      
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Preload critical API endpoints - disabled as APIs don't exist
    const preloadCriticalAPIs = () => {
      // APIs are not implemented yet, so we skip preloading them
      // This prevents 404 errors in the console
      console.log('API preloading skipped - endpoints not implemented');
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
        if (link.href.includes('/optimized/hero-bg.avif') || link.href.includes('/optimized/cg-map.webp')) {
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
