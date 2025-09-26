/**
 * Simple Ad Blocker Detection Script
 * Copy and paste this script into any HTML page to test ad blocker detection
 */

(function() {
  'use strict';
  
  console.log('🚀 Ad Blocker Detection Script Loaded');
  
  let detectionResults = {
    isDetected: false,
    methods: [],
    confidence: 0
  };

  // Simple detection methods
  function detectAdBlocker() {
    let detectedMethods = [];
    
    // Method 1: Test element blocking
    const testAd = document.createElement('div');
    testAd.className = 'ads advertisement';
    testAd.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;';
    document.body.appendChild(testAd);
    
    setTimeout(() => {
      if (testAd.offsetHeight === 0) {
        detectedMethods.push('Element Blocking');
        console.log('❌ Ad elements are being blocked');
      } else {
        console.log('✅ Ad elements are visible');
      }
      testAd.remove();
      
      updateResults(detectedMethods);
    }, 100);
    
    // Method 2: Test script blocking
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.onerror = () => {
      detectedMethods.push('Script Blocking');
      console.log('❌ AdSense script is blocked');
      updateResults(detectedMethods);
    };
    script.onload = () => {
      console.log('✅ AdSense script loaded');
      updateResults(detectedMethods);
    };
    document.head.appendChild(script);
    
    // Method 3: Check for missing adsbygoogle
    setTimeout(() => {
      if (typeof window.adsbygoogle === 'undefined') {
        detectedMethods.push('Missing AdSense Object');
        console.log('❌ AdSense object is missing');
      } else {
        console.log('✅ AdSense object is present');
      }
      updateResults(detectedMethods);
    }, 2000);
  }
  
  function updateResults(methods) {
    detectionResults.methods = [...new Set([...detectionResults.methods, ...methods])];
    detectionResults.isDetected = detectionResults.methods.length > 0;
    detectionResults.confidence = Math.min(100, detectionResults.methods.length * 33);
    
    if (detectionResults.isDetected) {
      showAdBlockerMessage();
    }
  }
  
  function showAdBlockerMessage() {
    // Prevent multiple overlays
    if (document.getElementById('adblocker-overlay')) return;
    
    const overlay = document.createElement('div');
    overlay.id = 'adblocker-overlay';
    overlay.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Arial, sans-serif;
      ">
        <div style="
          background: white;
          padding: 30px;
          border-radius: 10px;
          max-width: 500px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        ">
          <div style="color: #e74c3c; font-size: 48px; margin-bottom: 20px;">⚠️</div>
          <h2 style="color: #333; margin: 0 0 15px 0;">Ad Blocker Detected!</h2>
          <p style="color: #666; margin: 0 0 20px 0; line-height: 1.5;">
            Please disable your ad blocker to support this website and view all content.
          </p>
          <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 5px; text-align: left;">
            <strong>Detection Methods:</strong>
            <ul style="margin: 10px 0 0 20px; padding: 0;">
              ${detectionResults.methods.map(method => `<li>${method}</li>`).join('')}
            </ul>
          </div>
          <button onclick="window.location.reload()" style="
            background: #3498db;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-right: 10px;
          ">
            Refresh Page
          </button>
          <button onclick="document.getElementById('adblocker-overlay').style.display='none'" style="
            background: #95a5a6;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          ">
            Continue Anyway
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    console.log('🚫 Ad blocker overlay displayed');
  }
  
  // Run detection when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', detectAdBlocker);
  } else {
    detectAdBlocker();
  }
  
  // Expose global function for manual testing
  window.testAdBlocker = () => {
    console.log('🧪 Manual ad blocker test triggered');
    detectionResults = { isDetected: false, methods: [], confidence: 0 };
    detectAdBlocker();
  };
  
  // Log results after 3 seconds
  setTimeout(() => {
    console.log('📊 Final Detection Results:', detectionResults);
  }, 3000);
  
})();

/*
HOW TO USE:
1. Copy this entire script
2. Paste it into any HTML page before the closing </body> tag
3. Open the page with an ad blocker enabled to test
4. Check browser console for detailed logs
5. Use window.testAdBlocker() to manually trigger detection

EXAMPLE HTML:
<!DOCTYPE html>
<html>
<head>
    <title>Ad Blocker Test</title>
</head>
<body>
    <h1>Test Page</h1>
    <p>Open developer console and check for ad blocker detection messages.</p>
    
    <script>
        // Paste the script here
    </script>
</body>
</html>
*/