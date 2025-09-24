"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = '',
  style = {},
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  fill = false,
  loading = 'lazy',
  quality = 70, // Reduced for better compression
  placeholder = 'blur',
  blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwIoJObjmwAAAABJRU5ErkJggg==',
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Handle images from external sources
  const isExternal = src?.startsWith('http') || src?.startsWith('https');
  
  // Determine if image is eligible for priority loading
  useEffect(() => {
    if (priority) {
      const img = new window.Image();
      img.src = src;
    }
  }, [src, priority]);

  // Error fallback
  if (error) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height, ...style }}
        role="img"
        aria-label={alt}
      >
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={style}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        quality={quality}
        loading={priority ? 'eager' : loading}
        priority={priority}
        sizes={sizes}
        fill={fill}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        unoptimized={isExternal} // Only optimize internal images
      />
      
      {/* Skeleton loader */}
      {!loaded && (
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse ${loaded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
} 