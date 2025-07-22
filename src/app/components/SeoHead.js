"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { getTranslatedMeta, generateHrefLangTags, detectLanguage } from "../utils/languageUtils";
import Head from "next/head";

export default function SeoHead({
  title,
  description,
  keywords = [],
  ogImage = "/og-image.jpg",
  schema = null,
  noindex = false,
  canonicalPath = "",
  pageType = "website", // article, place, etc.
}) {
  const pathname = usePathname();
  const baseUrl = "https://cgblog.in";
  const language = detectLanguage(pathname);
  
  // Generate canonical URL
  const canonicalUrl = `${baseUrl}${canonicalPath || pathname}`;
  
  // Get language specific meta
  const meta = getTranslatedMeta(
    pathname,
    title,
    description
  );
  
  // Get hreflang links
  const hreflangTags = generateHrefLangTags(pathname, baseUrl);
  
  // Prepare title with proper formatting
  const formattedTitle = meta.title.includes("CG Blog") 
    ? meta.title 
    : `${meta.title} | CG Blog`;
  
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{formattedTitle}</title>
        <meta name="description" content={meta.description} />
        {keywords.length > 0 && (
          <meta name="keywords" content={keywords.join(", ")} />
        )}
        
        {/* Robots Meta */}
        {noindex ? (
          <meta name="robots" content="noindex, nofollow" />
        ) : (
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        )}
        
        {/* Canonical and Language tags */}
        <link rel="canonical" href={canonicalUrl} />
        {hreflangTags.map((tag, index) => (
          <link 
            key={`hreflang-${index}`}
            rel={tag.rel}
            hrefLang={tag.hrefLang}
            href={tag.href}
          />
        ))}
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content={pageType} />
        <meta property="og:image" content={`${baseUrl}${ogImage}`} />
        <meta property="og:site_name" content="CG Blog" />
        <meta property="og:locale" content={language === "hi" ? "hi_IN" : "en_IN"} />
        
        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
        <meta name="twitter:site" content="@cgblog" />
        
        {/* Geo Meta Tags */}
        <meta name="geo.region" content="IN-CG" />
        <meta name="geo.placename" content="Chhattisgarh" />
        <meta name="geo.position" content="21.2787;81.8661" />
        <meta name="ICBM" content="21.2787, 81.8661" />
      </Head>
      
      {/* Structured Data */}
      {schema && (
        <Script
          id={`structured-data-${pathname.replace(/\//g, '-')}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      )}
    </>
  );
} 