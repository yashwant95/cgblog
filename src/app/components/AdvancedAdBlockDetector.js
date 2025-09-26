'use client';

import { useEffect } from 'react';

export default function AdvancedAdBlockDetector() {
  useEffect(() => {
    const runAdvancedDetection = () => {
      // Create multiple test elements with ad-like characteristics
      const createTestAd = (className, id) => {
        const ad = document.createElement('div');
        ad.className = className;
        ad.id = id;
        ad.innerHTML = '&nbsp;';
        ad.style.cssText = `
          position: absolute !important;
          left: -10000px !important;
          top: -1000px !important;
          width: 1px !important;
          height: 1px !important;
          background: transparent !important;
        `;
        document.body.appendChild(ad);
        return ad;
      };

      // Test various ad-related class names and IDs
      const testElements = [
        createTestAd('ads', 'ads-test'),
        createTestAd('ad', 'ad-test'),
        createTestAd('adsystem', 'adsystem-test'),
        createTestAd('advertisement', 'advertisement-test'),
        createTestAd('google-ads', 'google-ads-test'),
        createTestAd('adsense', 'adsense-test'),
        createTestAd('adnxs', 'adnxs-test'),
        createTestAd('adsbygoogle', 'adsbygoogle-test'),
        createTestAd('sponsored', 'sponsored-test'),
        createTestAd('banner-ad', 'banner-ad-test')
      ];

      // Check elements after a delay
      setTimeout(() => {
        let blockedCount = 0;
        
        testElements.forEach(element => {
          const computedStyle = window.getComputedStyle(element);
          const isBlocked = 
            element.offsetHeight === 0 ||
            element.offsetWidth === 0 ||
            computedStyle.display === 'none' ||
            computedStyle.visibility === 'hidden' ||
            computedStyle.opacity === '0' ||
            element.style.display === 'none';
            
          if (isBlocked) {
            blockedCount++;
          }
          
          // Clean up
          element.remove();
        });

        // If more than 3 elements are blocked, likely an ad blocker
        if (blockedCount > 3) {
          // Dispatch custom event for the main detector
          window.dispatchEvent(new CustomEvent('adBlockerDetected', {
            detail: { method: 'advanced-element-detection', blockedCount }
          }));
        }
      }, 200);

      // Additional check for fetch blocking
      const testUrls = [
        'https://googleads.g.doubleclick.net/pagead/ads',
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        'https://www.googletagservices.com/tag/js/gpt.js'
      ];

      testUrls.forEach(async (url) => {
        try {
          const response = await fetch(url, { 
            method: 'HEAD', 
            mode: 'no-cors',
            cache: 'no-cache'
          });
        } catch (error) {
          window.dispatchEvent(new CustomEvent('adBlockerDetected', {
            detail: { method: 'fetch-blocking', url }
          }));
        }
      });
    };

    // Run detection after page load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runAdvancedDetection);
    } else {
      setTimeout(runAdvancedDetection, 1000);
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', runAdvancedDetection);
    };
  }, []);

  return null;
}