'use client';

import { useEffect, useState } from 'react';

export default function AdBlockerTestPage() {
  const [adBlockerStatus, setAdBlockerStatus] = useState('checking');
  const [detectionMethods, setDetectionMethods] = useState([]);

  useEffect(() => {
    const checkAdBlocker = () => {
      const results = [];
      
      // Test 1: Check if AdSense script loads
      const testScript = document.createElement('script');
      testScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      testScript.onerror = () => {
        results.push('AdSense Script Blocked');
        updateStatus('detected', results);
      };
      testScript.onload = () => {
        results.push('AdSense Script Loaded');
        checkOtherMethods(results);
      };
      
      document.head.appendChild(testScript);
      
      // Test 2: Check for blocked elements
      const testAd = document.createElement('div');
      testAd.className = 'ads advertisement';
      testAd.style.cssText = 'position:absolute;left:-10000px;top:-1000px;width:1px;height:1px;';
      document.body.appendChild(testAd);
      
      setTimeout(() => {
        if (testAd.offsetHeight === 0) {
          results.push('Ad Elements Blocked');
        } else {
          results.push('Ad Elements Visible');
        }
        testAd.remove();
        checkOtherMethods(results);
      }, 500);
    };
    
    const checkOtherMethods = (results) => {
      // Test 3: Check window.adsbygoogle
      if (typeof window.adsbygoogle === 'undefined') {
        results.push('AdsByGoogle Object Missing');
      } else {
        results.push('AdsByGoogle Object Present');
      }
      
      updateStatus(results.some(r => r.includes('Blocked') || r.includes('Missing')) ? 'detected' : 'not-detected', results);
    };
    
    const updateStatus = (status, methods) => {
      setAdBlockerStatus(status);
      setDetectionMethods(methods);
    };
    
    checkAdBlocker();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ad Blocker Detection Test
          </h1>
          <p className="text-xl text-gray-600">
            This page tests various ad blocker detection methods
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Detection Status</h2>
          
          <div className="flex items-center justify-center mb-6">
            {adBlockerStatus === 'checking' && (
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-lg text-gray-600">Checking...</span>
              </div>
            )}
            
            {adBlockerStatus === 'detected' && (
              <div className="flex items-center space-x-3 text-red-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-lg font-semibold">Ad Blocker Detected!</span>
              </div>
            )}
            
            {adBlockerStatus === 'not-detected' && (
              <div className="flex items-center space-x-3 text-green-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg font-semibold">No Ad Blocker Detected</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Detection Results:</h3>
            <ul className="space-y-2">
              {detectionMethods.map((method, index) => (
                <li key={index} className="flex items-center space-x-2">
                  {method.includes('Blocked') || method.includes('Missing') ? (
                    <span className="text-red-500">❌</span>
                  ) : (
                    <span className="text-green-500">✅</span>
                  )}
                  <span>{method}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Test Ad Elements */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Test Ad Elements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Test Ad 1 */}
            <div className="border-2 border-dashed border-gray-300 p-4 text-center">
              <h3 className="font-semibold mb-2">Standard Ad Block</h3>
              <div className="ads advertisement bg-yellow-100 p-4 rounded">
                <p>This element has class &ldquo;ads advertisement&rdquo;</p>
                <p>Ad blockers typically hide this</p>
              </div>
            </div>

            {/* Test Ad 2 */}
            <div className="border-2 border-dashed border-gray-300 p-4 text-center">
              <h3 className="font-semibold mb-2">AdSense Block</h3>
              <div className="adsbygoogle bg-blue-100 p-4 rounded">
                <p>This element has class &ldquo;adsbygoogle&rdquo;</p>
                <p>Google AdSense related blocking</p>
              </div>
            </div>

            {/* Test Ad 3 */}
            <div className="border-2 border-dashed border-gray-300 p-4 text-center">
              <h3 className="font-semibold mb-2">Sponsored Content</h3>
              <div className="sponsored bg-green-100 p-4 rounded">
                <p>This element has class &ldquo;sponsored&rdquo;</p>
                <p>Sponsored content blocking</p>
              </div>
            </div>

            {/* Test Ad 4 */}
            <div className="border-2 border-dashed border-gray-300 p-4 text-center">
              <h3 className="font-semibold mb-2">Banner Ad</h3>
              <div className="banner-ad bg-red-100 p-4 rounded">
                <p>This element has class &ldquo;banner-ad&rdquo;</p>
                <p>Banner advertisement blocking</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• If you have an ad blocker enabled, some elements above may be hidden</li>
              <li>• Try disabling your ad blocker and refreshing to see the difference</li>
              <li>• The detection system will show an overlay if an ad blocker is detected</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}