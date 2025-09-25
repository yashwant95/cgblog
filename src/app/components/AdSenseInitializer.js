'use client';

import { useEffect } from 'react';

export default function AdSenseInitializer() {
  useEffect(() => {
    // Initialize AdSense after the script loads
    const initializeAdSense = () => {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        try {
          // Check if ads are already initialized
          const existingAds = document.querySelectorAll('.adsbygoogle');
          if (existingAds.length === 0) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            console.log('AdSense initialized successfully');
          } else {
            console.log('AdSense already initialized');
          }
        } catch (error) {
          console.warn('AdSense initialization failed:', error);
        }
      }
    };

    // Wait for the AdSense script to load
    const checkAdSense = () => {
      if (window.adsbygoogle) {
        initializeAdSense();
      } else {
        // Retry after a short delay
        setTimeout(checkAdSense, 100);
      }
    };

    // Start checking after a brief delay
    setTimeout(checkAdSense, 500);
  }, []);

  return null;
}
