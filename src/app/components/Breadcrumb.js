"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const linkPath = pathname.split('/');
    linkPath.shift();

    const pathArray = linkPath.map((path, i) => {
      return {
        breadcrumb: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
        href: '/' + linkPath.slice(0, i + 1).join('/')
      };
    });

    setBreadcrumbs(pathArray);
  }, [pathname]);

  // Skip rendering breadcrumbs on homepage
  if (pathname === '/') {
    return null;
  }

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <nav aria-label="Breadcrumb" className="bg-gray-100 py-2 px-4 md:px-6">
        <ol className="flex flex-wrap items-center text-sm md:text-base">
          <li className="flex items-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
          </li>
        </ol>
      </nav>
    );
  }

  // Generate structured data for breadcrumbs
  const generateBreadcrumbLD = () => {
    const itemListElement = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://cgblog.in"
      }
    ];

    breadcrumbs.forEach((breadcrumb, i) => {
      itemListElement.push({
        "@type": "ListItem",
        "position": i + 2,
        "name": breadcrumb.breadcrumb,
        "item": `https://cgblog.in${breadcrumb.href}`
      });
    });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    };
  };

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbLD())
        }}
      />

      <nav aria-label="Breadcrumb" className="bg-gray-100 py-2 px-4 md:px-6">
        <ol className="flex flex-wrap items-center text-sm md:text-base">
          <li className="flex items-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
            {breadcrumbs.length > 0 && (
              <svg className="h-5 w-5 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </li>
          
          {breadcrumbs.map((breadcrumb, i) => (
            <li key={breadcrumb.href} className="flex items-center">
              {i < breadcrumbs.length - 1 ? (
                <>
                  <Link href={breadcrumb.href} className="text-blue-600 hover:text-blue-800">
                    {breadcrumb.breadcrumb}
                  </Link>
                  <svg className="h-5 w-5 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </>
              ) : (
                <span className="text-gray-700 font-medium" aria-current="page">
                  {breadcrumb.breadcrumb}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
} 