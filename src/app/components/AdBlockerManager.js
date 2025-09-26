'use client';

import { useEffect, useState, useCallback } from 'react';
import AdBlockerDetector from './AdBlockerDetector';
import AdvancedAdBlockDetector from './AdvancedAdBlockDetector';

export default function AdBlockerManager() {
  const [detectionResults, setDetectionResults] = useState({
    isDetected: false,
    methods: [],
    confidence: 0
  });

  const [userChoice, setUserChoice] = useState(null); // 'continue' or 'refresh'

  const handleDetection = useCallback((method, details = {}) => {
    setDetectionResults(prev => {
      const newMethods = [...prev.methods];
      if (!newMethods.includes(method)) {
        newMethods.push(method);
      }

      const newConfidence = Math.min(100, newMethods.length * 25);
      
      return {
        isDetected: true,
        methods: newMethods,
        confidence: newConfidence,
        lastDetection: { method, details, timestamp: Date.now() }
      };
    });
  }, []);

  useEffect(() => {
    // Listen for detection events from various sources
    const handleAdBlockerEvent = (event) => {
      handleDetection(event.detail?.method || 'unknown', event.detail);
    };

    window.addEventListener('adBlockerDetected', handleAdBlockerEvent);

    // Additional detection methods
    const runBasicDetection = () => {
      // Check if common ad blocker variables exist
      if (typeof window.uBlock !== 'undefined' || 
          typeof window.adBlock !== 'undefined' ||
          typeof window.AdBlock !== 'undefined') {
        handleDetection('global-variable-detection');
      }

      // Check for ad blocker user agent modifications
      if (navigator.userAgent.includes('uBlock') || 
          navigator.userAgent.includes('AdBlock')) {
        handleDetection('user-agent-detection');
      }

      // Check for missing expected ad elements after reasonable time
      setTimeout(() => {
        const adElements = document.querySelectorAll('.adsbygoogle');
        if (adElements.length === 0 && window.adsbygoogle) {
          // AdSense loaded but no ad elements found - might be blocked
          handleDetection('missing-ad-elements');
        }
      }, 3000);

      // Test loading an image from an ad domain (skip in development)
      if (process.env.NODE_ENV === 'production') {
        const testImg = new Image();
        testImg.onerror = () => {
          handleDetection('image-blocking-detection');
        };
        testImg.src = 'https://googleads.g.doubleclick.net/pagead/ads?' + Math.random();
      }
    };

    // Run detection after a delay
    const timer = setTimeout(runBasicDetection, 2000);

    return () => {
      window.removeEventListener('adBlockerDetected', handleAdBlockerEvent);
      clearTimeout(timer);
    };
  }, [handleDetection]);

  // Store user preference
  useEffect(() => {
    const stored = localStorage.getItem('adBlockerChoice');
    if (stored) {
      setUserChoice(stored);
    }
  }, []);

  const saveUserChoice = (choice) => {
    setUserChoice(choice);
    localStorage.setItem('adBlockerChoice', choice);
    
    // Set expiration (24 hours)
    localStorage.setItem('adBlockerChoiceExpiry', Date.now() + 24 * 60 * 60 * 1000);
  };

  // Check if user choice has expired
  const isChoiceExpired = () => {
    const expiry = localStorage.getItem('adBlockerChoiceExpiry');
    return !expiry || Date.now() > parseInt(expiry);
  };

  // Only show detector if ad blocker is detected and user hasn't made a recent choice
  const shouldShowDetector = detectionResults.isDetected && 
                            detectionResults.confidence >= 50 && 
                            (userChoice !== 'continue' || isChoiceExpired());

  // Debug info (remove in production)
  useEffect(() => {
    if (detectionResults.isDetected && process.env.NODE_ENV === 'development') {
      console.log('Ad Blocker Detection Results:', {
        confidence: detectionResults.confidence,
        methods: detectionResults.methods,
        lastDetection: detectionResults.lastDetection
      });
    }
  }, [detectionResults]);

  return (
    <>
      <AdvancedAdBlockDetector />
      {shouldShowDetector && (
        <AdBlockerDetector 
          onUserChoice={saveUserChoice}
          detectionInfo={detectionResults}
        />
      )}
    </>
  );
}