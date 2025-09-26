'use client';

import { useEffect, useState } from 'react';

export default function AdBlockerDetector({ onUserChoice, detectionInfo }) {
  const [isAdBlockerDetected, setIsAdBlockerDetected] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // If detection info is passed from parent, use that
    if (detectionInfo?.isDetected) {
      setIsAdBlockerDetected(true);
      setShowOverlay(true);
      document.body.style.overflow = 'hidden';
      return;
    }

    const detectAdBlocker = async () => {
      // Method 1: Check if AdSense script is blocked
      const checkAdSenseScript = () => {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
          script.async = true;
          script.onerror = () => resolve(true); // Ad blocker detected
          script.onload = () => resolve(false); // Script loaded successfully
          
          // Clean up
          script.remove();
        });
      };

      // Method 2: Check for blocked elements
      const checkBlockedElements = () => {
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox';
        testAd.style.cssText = `
          position: absolute !important;
          left: -10000px !important;
          top: -1000px !important;
          width: 1px !important;
          height: 1px !important;
        `;
        document.body.appendChild(testAd);
        
        setTimeout(() => {
          const isBlocked = testAd.offsetHeight === 0 || 
                           testAd.offsetWidth === 0 ||
                           testAd.style.display === 'none' ||
                           testAd.style.visibility === 'hidden';
          testAd.remove();
          
          if (isBlocked) {
            setIsAdBlockerDetected(true);
          }
        }, 100);
      };

      // Method 3: Check for adsbygoogle availability
      const checkAdsByGoogle = () => {
        setTimeout(() => {
          if (typeof window.adsbygoogle === 'undefined') {
            setIsAdBlockerDetected(true);
          }
        }, 2000);
      };

      // Method 4: Fetch test
      const checkAdBlockerFetch = async () => {
        try {
          const response = await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
            method: 'HEAD',
            mode: 'no-cors'
          });
          // If we get here without error, ads are likely not blocked
        } catch (error) {
          setIsAdBlockerDetected(true);
        }
      };

      // Run all detection methods
      checkBlockedElements();
      checkAdsByGoogle();
      
      try {
        const scriptBlocked = await checkAdSenseScript();
        if (scriptBlocked) {
          setIsAdBlockerDetected(true);
        }
      } catch (error) {
        setIsAdBlockerDetected(true);
      }

      try {
        await checkAdBlockerFetch();
      } catch (error) {
        // Fetch method failed, likely ad blocker
      }
    };

    // Wait a bit for the page to load before checking
    const timer = setTimeout(() => {
      detectAdBlocker();
    }, 1500);

    return () => clearTimeout(timer);
  }, [detectionInfo]);

  useEffect(() => {
    if (isAdBlockerDetected) {
      // Show overlay after a short delay to ensure it's not a false positive
      const timer = setTimeout(() => {
        setShowOverlay(true);
        // Prevent scrolling when overlay is shown
        document.body.style.overflow = 'hidden';
      }, 500);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isAdBlockerDetected]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleContinue = () => {
    setShowOverlay(false);
    setIsAdBlockerDetected(false);
    document.body.style.overflow = 'unset';
    onUserChoice?.('continue');
  };

  if (!showOverlay) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 text-center relative">
        {/* Icon */}
        <div className="mb-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Ad Blocker Detected
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          We noticed you&rsquo;re using an ad blocker. This website is supported by advertisements, 
          which help us provide free content about Chhattisgarh tourism and culture.
        </p>

        {/* Instructions */}
        <div className="text-left mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Please disable your ad blocker:</h3>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Click on your ad blocker extension</li>
            <li>2. Select &ldquo;Disable for this site&rdquo; or similar</li>
            <li>3. Refresh the page</li>
          </ol>
        </div>

        {/* Benefits */}
        <div className="text-left mb-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">Why support us?</h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Free travel guides and tips</li>
            <li>• Latest tourism information</li>
            <li>• Cultural insights and reviews</li>
            <li>• Regular content updates</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleRefresh}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            I&rsquo;ve Disabled Ad Blocker - Refresh Page
          </button>
          
          <button
            onClick={handleContinue}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
          >
            Continue Anyway (Limited Experience)
          </button>
        </div>

        {/* Footer */}
        <p className="mt-4 text-xs text-gray-500">
          Thank you for supporting Chhattisgarh Explorer! 🙏
        </p>
      </div>
    </div>
  );
}