// Ad Blocker Detection Utility Script
// This script can be used for testing and manual detection

class AdBlockerDetectionUtils {
  constructor() {
    this.detectionMethods = [];
    this.isDetected = false;
    this.callbacks = [];
  }

  // Add callback for detection events
  onDetected(callback) {
    this.callbacks.push(callback);
  }

  // Trigger all callbacks
  triggerCallbacks(method, details = {}) {
    this.detectionMethods.push({ method, details, timestamp: Date.now() });
    this.isDetected = true;
    
    this.callbacks.forEach(callback => {
      try {
        callback({ method, details, allMethods: this.detectionMethods });
      } catch (error) {
        console.error('Error in ad blocker detection callback:', error);
      }
    });

    // Dispatch global event
    window.dispatchEvent(new CustomEvent('adBlockerDetected', {
      detail: { method, details, allMethods: this.detectionMethods }
    }));
  }

  // Method 1: Script Loading Detection
  async detectScriptBlocking() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?v=' + Math.random();
      script.async = true;
      
      script.onerror = () => {
        this.triggerCallbacks('script-blocking', { url: script.src });
        resolve(true);
      };
      
      script.onload = () => {
        resolve(false);
      };
      
      // Timeout fallback
      setTimeout(() => {
        script.remove();
        resolve(false);
      }, 5000);
      
      document.head.appendChild(script);
    });
  }

  // Method 2: Element Visibility Detection
  detectElementBlocking() {
    const testElements = [
      { class: 'ads', id: 'test-ads' },
      { class: 'advertisement', id: 'test-advertisement' },
      { class: 'adsbygoogle', id: 'test-adsbygoogle' },
      { class: 'sponsored', id: 'test-sponsored' },
      { class: 'banner-ad', id: 'test-banner' },
      { class: 'google-ad', id: 'test-google-ad' }
    ];

    testElements.forEach((config, index) => {
      const element = document.createElement('div');
      element.className = config.class;
      element.id = config.id;
      element.innerHTML = '&nbsp;';
      element.style.cssText = `
        position: absolute !important;
        left: -10000px !important;
        top: -1000px !important;
        width: 1px !important;
        height: 1px !important;
      `;
      
      document.body.appendChild(element);
      
      setTimeout(() => {
        const computedStyle = window.getComputedStyle(element);
        const isBlocked = 
          element.offsetHeight === 0 ||
          element.offsetWidth === 0 ||
          computedStyle.display === 'none' ||
          computedStyle.visibility === 'hidden' ||
          computedStyle.opacity === '0';
          
        if (isBlocked) {
          this.triggerCallbacks('element-blocking', {
            className: config.class,
            elementId: config.id
          });
        }
        
        element.remove();
      }, 100 + (index * 50));
    });
  }

  // Method 3: Fetch Request Detection
  async detectFetchBlocking() {
    const testUrls = [
      'https://googleads.g.doubleclick.net/pagead/ads',
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      'https://www.googletagservices.com/tag/js/gpt.js'
    ];

    for (const url of testUrls) {
      try {
        await fetch(url, { 
          method: 'HEAD', 
          mode: 'no-cors',
          cache: 'no-cache'
        });
      } catch (error) {
        this.triggerCallbacks('fetch-blocking', { url, error: error.message });
      }
    }
  }

  // Method 4: Global Variable Detection
  detectGlobalVariables() {
    const adBlockerVariables = [
      'uBlock',
      'adBlock',
      'AdBlock',
      'adblockEnabled',
      'blockAdBlock'
    ];

    adBlockerVariables.forEach(variable => {
      if (typeof window[variable] !== 'undefined') {
        this.triggerCallbacks('global-variable', { variable });
      }
    });

    // Check for missing expected variables
    setTimeout(() => {
      if (typeof window.adsbygoogle === 'undefined') {
        this.triggerCallbacks('missing-adsense', { variable: 'adsbygoogle' });
      }
    }, 2000);
  }

  // Method 5: Image Loading Detection
  detectImageBlocking() {
    const testImages = [
      'https://googleads.g.doubleclick.net/pagead/ads/pixel.gif',
      'https://pagead2.googlesyndication.com/pagead/pixel.gif'
    ];

    testImages.forEach(url => {
      const img = new Image();
      img.onerror = () => {
        this.triggerCallbacks('image-blocking', { url });
      };
      img.src = url + '?t=' + Math.random();
    });
  }

  // Method 6: CSS Injection Detection
  detectCSSBlocking() {
    const testDiv = document.createElement('div');
    testDiv.className = 'ads-detection-test';
    testDiv.style.cssText = `
      position: absolute;
      left: -10000px;
      top: -1000px;
      width: 100px;
      height: 100px;
      background-color: red;
    `;
    
    // Add CSS that ad blockers might inject
    const style = document.createElement('style');
    style.textContent = `.ads-detection-test { display: none !important; }`;
    document.head.appendChild(style);
    document.body.appendChild(testDiv);
    
    setTimeout(() => {
      const computedStyle = window.getComputedStyle(testDiv);
      if (computedStyle.display === 'none') {
        this.triggerCallbacks('css-blocking', { method: 'injected-css' });
      }
      
      testDiv.remove();
      style.remove();
    }, 100);
  }

  // Run all detection methods
  async runAllDetections() {
    console.log('🔍 Starting comprehensive ad blocker detection...');
    
    // Run synchronous detections immediately
    this.detectElementBlocking();
    this.detectGlobalVariables();
    this.detectImageBlocking();
    this.detectCSSBlocking();
    
    // Run asynchronous detections
    await this.detectScriptBlocking();
    await this.detectFetchBlocking();
    
    // Return results after a delay to allow all detections to complete
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          isDetected: this.isDetected,
          methods: this.detectionMethods,
          confidence: this.getConfidence()
        });
      }, 3000);
    });
  }

  // Calculate detection confidence
  getConfidence() {
    if (this.detectionMethods.length === 0) return 0;
    
    // Weight different detection methods
    const weights = {
      'script-blocking': 30,
      'element-blocking': 25,
      'fetch-blocking': 20,
      'global-variable': 15,
      'missing-adsense': 20,
      'image-blocking': 15,
      'css-blocking': 10
    };
    
    let totalWeight = 0;
    this.detectionMethods.forEach(method => {
      totalWeight += weights[method.method] || 10;
    });
    
    return Math.min(100, totalWeight);
  }

  // Manual trigger for testing
  triggerTestDetection() {
    this.triggerCallbacks('manual-test', { 
      message: 'Manually triggered for testing',
      userAgent: navigator.userAgent
    });
  }

  // Get detection report
  getReport() {
    return {
      isDetected: this.isDetected,
      confidence: this.getConfidence(),
      methods: this.detectionMethods,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
  }

  // Reset detection state
  reset() {
    this.detectionMethods = [];
    this.isDetected = false;
    this.callbacks = [];
  }
}

// Create global instance
if (typeof window !== 'undefined') {
  window.AdBlockerDetectionUtils = new AdBlockerDetectionUtils();
  
  // Auto-run detection when script loads
  document.addEventListener('DOMContentLoaded', () => {
    // Delay to allow page to settle
    setTimeout(() => {
      window.AdBlockerDetectionUtils.runAllDetections().then(result => {
        console.log('🔍 Ad Blocker Detection Complete:', result);
      });
    }, 1000);
  });
}

export default AdBlockerDetectionUtils;