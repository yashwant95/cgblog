"use client";

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    const measureWebVitals = () => {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        
        // Send to analytics if needed
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Performance',
            event_label: 'LCP',
            value: Math.round(lastEntry.startTime)
          });
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
          
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Performance',
              event_label: 'FID',
              value: Math.round(entry.processingStart - entry.startTime)
            });
          }
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('CLS:', clsValue);
        
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Performance',
            event_label: 'CLS',
            value: Math.round(clsValue * 1000)
          });
        }
      }).observe({ entryTypes: ['layout-shift'] });
    };

    // Monitor resource loading performance
    const monitorResourcePerformance = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'resource') {
            const loadTime = entry.responseEnd - entry.startTime;
            
            // Log slow resources
            if (loadTime > 1000) {
              console.warn(`Slow resource: ${entry.name} took ${loadTime}ms`);
            }
            
            // Monitor image loading
            if (entry.name.includes('.jpg') || entry.name.includes('.png') || entry.name.includes('.webp')) {
              console.log(`Image loaded: ${entry.name} in ${loadTime}ms`);
            }
          }
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
    };

    // Monitor JavaScript execution time
    const monitorJSExecution = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'measure') {
            console.log(`Performance measure: ${entry.name} took ${entry.duration}ms`);
          }
        });
      });
      
      observer.observe({ entryTypes: ['measure'] });
    };

    // Monitor long tasks
    const monitorLongTasks = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration}ms`);
            
            if (window.gtag) {
              window.gtag('event', 'long_task', {
                event_category: 'Performance',
                event_label: 'Long Task',
                value: Math.round(entry.duration)
              });
            }
          }
        });
      });
      
      observer.observe({ entryTypes: ['longtask'] });
    };

    // Initialize monitoring
    const initPerformanceMonitoring = () => {
      try {
        measureWebVitals();
        monitorResourcePerformance();
        monitorJSExecution();
        monitorLongTasks();
        
        // Monitor page load performance
        window.addEventListener('load', () => {
          const navigation = performance.getEntriesByType('navigation')[0];
          if (navigation) {
            console.log('Page load time:', navigation.loadEventEnd - navigation.loadEventStart);
            console.log('DOM content loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
            console.log('Time to first byte:', navigation.responseStart - navigation.requestStart);
          }
        });
        
        console.log('✅ Performance monitoring initialized');
      } catch (error) {
        console.error('❌ Performance monitoring failed:', error);
      }
    };

    // Start monitoring after a short delay
    setTimeout(initPerformanceMonitoring, 1000);

    // Cleanup function
    return () => {
      // Cleanup any observers if needed
      console.log('🧹 Performance monitoring cleanup');
    };
  }, []);

  return null;
}
