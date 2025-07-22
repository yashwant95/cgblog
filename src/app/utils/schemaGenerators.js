/**
 * Schema Generators for SEO
 * This utility generates structured data for rich results in search engines
 */

// Organization schema for consistent branding
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CG Blog - Chhattisgarh Explorer",
    "url": "https://cgblog.in",
    "logo": "https://cgblog.in/logo.png",
    "sameAs": [
      "https://www.facebook.com/cgblogtourism",
      "https://twitter.com/cgblogtourism",
      "https://www.instagram.com/cgblogtourism"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7712832421",
      "contactType": "customer service",
      "areaServed": "IN-CG",
      "availableLanguage": ["en", "hi"]
    }
  };
};

// Tourism destination schema for place pages
export const generateTourismDestinationSchema = (place) => {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": place.name,
    "description": place.description,
    "url": `https://cgblog.in/places/${place.slug}`,
    "image": place.images && place.images.length > 0 ? place.images.map(img => `https://cgblog.in${img}`) : [`https://cgblog.in${place.mainImage}`],
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Chhattisgarh",
      "addressCountry": "IN",
      "addressLocality": place.location || "Chhattisgarh"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": place.coordinates?.lat || "21.2787",
      "longitude": place.coordinates?.lng || "81.8661"
    },
    "openingHoursSpecification": place.openingHours || {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    },
    "touristType": place.touristType || ["Nature", "Culture", "Heritage", "Adventure"],
    "isAccessibleForFree": place.isAccessibleForFree || false,
    "publicAccess": place.publicAccess || true
  };
};

// FAQ Schema generator
export const generateFAQSchema = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Recipe schema for food pages
export const generateRecipeSchema = (recipe) => {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.name,
    "image": recipe.images?.map(img => `https://cgblog.in${img}`) || [`https://cgblog.in${recipe.mainImage}`],
    "author": {
      "@type": "Person",
      "name": recipe.author || "CG Blog Team"
    },
    "datePublished": recipe.datePublished || new Date().toISOString().split('T')[0],
    "description": recipe.description,
    "prepTime": recipe.prepTime || "PT30M",
    "cookTime": recipe.cookTime || "PT1H",
    "totalTime": recipe.totalTime || "PT1H30M",
    "keywords": recipe.keywords || ["Chhattisgarh cuisine", "traditional recipe", "Indian food"],
    "recipeYield": recipe.yield || "4 servings",
    "recipeCategory": recipe.category || "Main Course",
    "recipeCuisine": recipe.cuisine || "Chhattisgarhi",
    "recipeIngredient": recipe.ingredients || [],
    "recipeInstructions": recipe.instructions?.map(step => ({
      "@type": "HowToStep",
      "text": step
    })) || [],
    "nutrition": recipe.nutrition ? {
      "@type": "NutritionInformation",
      "calories": recipe.nutrition.calories || "350 calories",
      "proteinContent": recipe.nutrition.protein || "8g"
    } : undefined
  };
};

// Event schema for events pages
export const generateEventSchema = (event) => {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "startDate": event.startDate,
    "endDate": event.endDate,
    "description": event.description,
    "image": event.image ? `https://cgblog.in${event.image}` : undefined,
    "location": {
      "@type": "Place",
      "name": event.venue,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": event.location,
        "addressRegion": "Chhattisgarh",
        "addressCountry": "IN"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": event.organizer || "Chhattisgarh Tourism Board",
      "url": event.organizerUrl || "https://cgblog.in"
    },
    "offers": event.offers ? {
      "@type": "Offer",
      "price": event.offers.price || "0",
      "priceCurrency": event.offers.currency || "INR",
      "availability": event.offers.availability || "https://schema.org/InStock",
      "validFrom": event.offers.validFrom || event.startDate
    } : undefined,
    "performer": event.performer ? {
      "@type": "PerformingGroup",
      "name": event.performer
    } : undefined
  };
};

// Review schema for review pages
export const generateReviewSchema = (review) => {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "name": review.title,
    "reviewBody": review.content,
    "datePublished": review.datePublished || new Date().toISOString().split('T')[0],
    "author": {
      "@type": "Person",
      "name": review.author || "CG Blog Reviewer"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "itemReviewed": {
      "@type": review.itemType || "TouristAttraction",
      "name": review.itemName,
      "image": review.itemImage ? `https://cgblog.in${review.itemImage}` : undefined,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": review.itemLocation,
        "addressRegion": "Chhattisgarh",
        "addressCountry": "IN"
      }
    }
  };
};

// Article schema for blog posts
export const generateArticleSchema = (article) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "image": article.image ? `https://cgblog.in${article.image}` : undefined,
    "datePublished": article.datePublished || new Date().toISOString().split('T')[0],
    "dateModified": article.dateModified || new Date().toISOString().split('T')[0],
    "author": {
      "@type": "Person",
      "name": article.author || "CG Blog Author"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CG Blog - Chhattisgarh Explorer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cgblog.in/logo.png"
      }
    },
    "description": article.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://cgblog.in/${article.slug}`
    }
  };
};

// Breadcrumb schema generator (alternative to the component version)
export const generateBreadcrumbSchema = (items) => {
  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };
};

// Video schema for video content
export const generateVideoSchema = (video) => {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.name,
    "description": video.description,
    "thumbnailUrl": video.thumbnail ? `https://cgblog.in${video.thumbnail}` : undefined,
    "uploadDate": video.uploadDate || new Date().toISOString().split('T')[0],
    "duration": video.duration || "PT1M33S",
    "contentUrl": video.contentUrl,
    "embedUrl": video.embedUrl,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "WatchAction" },
      "userInteractionCount": video.views || 0
    },
    "regionsAllowed": "IN"
  };
}; 