/**
 * Language Utilities for SEO
 * Helps with multilingual support and structured data for language alternatives
 */

// Dictionary of common tourism terms in Hindi and English
export const tourismTerms = {
  'en': {
    'places': 'Tourist Places',
    'food': 'Local Cuisine',
    'events': 'Cultural Events',
    'reviews': 'Travel Reviews',
    'about': 'About Us',
    'contact': 'Contact Us',
    'home': 'Home',
    'explore': 'Explore',
    'attractions': 'Attractions',
    'waterfall': 'Waterfall',
    'temple': 'Temple',
    'wildlife': 'Wildlife',
    'sanctuary': 'Sanctuary',
    'festival': 'Festival',
    'heritage': 'Heritage',
    'tribal': 'Tribal',
    'cuisine': 'Cuisine',
    'adventure': 'Adventure',
    'history': 'History',
    'culture': 'Culture',
    'travel': 'Travel',
    'guide': 'Guide',
    'tourism': 'Tourism',
  },
  'hi': {
    'places': 'पर्यटन स्थल',
    'food': 'स्थानीय व्यंजन',
    'events': 'सांस्कृतिक आयोजन',
    'reviews': 'यात्रा समीक्षा',
    'about': 'हमारे बारे में',
    'contact': 'संपर्क करें',
    'home': 'होम',
    'explore': 'खोज',
    'attractions': 'आकर्षण',
    'waterfall': 'झरना',
    'temple': 'मंदिर',
    'wildlife': 'वन्य जीवन',
    'sanctuary': 'अभयारण्य',
    'festival': 'त्योहार',
    'heritage': 'विरासत',
    'tribal': 'आदिवासी',
    'cuisine': 'व्यंजन',
    'adventure': 'साहसिक',
    'history': 'इतिहास',
    'culture': 'संस्कृति',
    'travel': 'यात्रा',
    'guide': 'मार्गदर्शक',
    'tourism': 'पर्यटन',
  }
};

// Language detection helper
export const detectLanguage = (url) => {
  if (url.includes('/hi/')) {
    return 'hi';
  }
  return 'en';
};

// Generate alternative language URLs for href lang tags
export const getLanguageAlternates = (currentPath, baseUrl = 'https://cgblog.in') => {
  const isHindi = currentPath.startsWith('/hi');
  const pathWithoutLang = isHindi ? currentPath.replace(/^\/hi/, '') : currentPath;
  
  return {
    'en-IN': `${baseUrl}${pathWithoutLang}`,
    'hi-IN': `${baseUrl}/hi${pathWithoutLang}`,
  };
};

// Get SEO keywords in multiple languages
export const getMultilingualKeywords = (baseKeywords) => {
  if (!baseKeywords || !Array.isArray(baseKeywords)) {
    return {
      en: [],
      hi: []
    };
  }

  const result = {
    en: [...baseKeywords],
    hi: []
  };

  // Generate Hindi keywords where possible
  baseKeywords.forEach(keyword => {
    // Convert simple terms directly
    Object.keys(tourismTerms.en).forEach(term => {
      if (keyword.toLowerCase().includes(term.toLowerCase())) {
        const hindiKeyword = keyword.toLowerCase().replace(
          new RegExp(term, 'i'), 
          tourismTerms.hi[term]
        );
        result.hi.push(hindiKeyword);
      }
    });

    // Add original keyword if no translation found
    if (!result.hi.some(k => k.includes(keyword))) {
      result.hi.push(keyword);
    }
  });

  // Add Chhattisgarh-specific Hindi terms
  result.hi.push('छत्तीसगढ़ पर्यटन', 'छत्तीसगढ़ घूमने की जगह', 'छत्तीसगढ़ के दर्शनीय स्थल');

  return result;
};

// Generate translated meta title and description
export const getTranslatedMeta = (path, defaultTitle, defaultDescription) => {
  const language = detectLanguage(path);
  
  if (language === 'hi') {
    // Simple path-based translation for Hindi
    if (path.includes('/places')) {
      return {
        title: 'छत्तीसगढ़ के दर्शनीय स्थल | सीजी ब्लॉग',
        description: 'छत्तीसगढ़ के प्रमुख पर्यटन स्थलों की जानकारी - झरने, मंदिर, वन्यजीव अभयारण्य और ऐतिहासिक स्थल।'
      };
    } else if (path.includes('/food')) {
      return {
        title: 'छत्तीसगढ़ का स्वादिष्ट व्यंजन | सीजी ब्लॉग',
        description: 'छत्तीसगढ़ के पारंपरिक व्यंजनों की विस्तृत जानकारी, रेसिपी और स्वाद का अनुभव।'
      };
    } else if (path.includes('/events')) {
      return {
        title: 'छत्तीसगढ़ के प्रमुख त्योहार और सांस्कृतिक आयोजन | सीजी ब्लॉग',
        description: 'छत्तीसगढ़ के सभी महत्वपूर्ण त्योहारों, मेलों और सांस्कृतिक आयोजनों की जानकारी।'
      };
    } else if (path.includes('/reviews')) {
      return {
        title: 'छत्तीसगढ़ पर्यटन - यात्रा समीक्षा | सीजी ब्लॉग',
        description: 'पर्यटकों द्वारा छत्तीसगढ़ के विभिन्न पर्यटन स्थलों, होटल, रेस्टोरेंट की विस्तृत समीक्षा।'
      };
    } else {
      return {
        title: 'छत्तीसगढ़ पर्यटन गाइड | सीजी ब्लॉग',
        description: 'छत्तीसगढ़ के सर्वश्रेष्ठ पर्यटन स्थल, आदिवासी संस्कृति, व्यंजन और त्योहारों की जानकारी का विश्वसनीय स्रोत।'
      };
    }
  }
  
  // Default to English
  return {
    title: defaultTitle,
    description: defaultDescription
  };
};

// Generate localized schema
export const getLocalizedSchema = (schema, language = 'en') => {
  if (!schema || typeof schema !== 'object') {
    return schema;
  }
  
  // For Hindi, translate common fields
  if (language === 'hi') {
    const newSchema = { ...schema };
    
    // Translate name if it's a simple term
    if (newSchema.name) {
      Object.keys(tourismTerms.en).forEach(term => {
        if (newSchema.name.includes(term)) {
          newSchema.name = newSchema.name.replace(term, tourismTerms.hi[term]);
        }
      });
    }
    
    // Translate description with basic term replacement
    if (newSchema.description) {
      let desc = newSchema.description;
      Object.keys(tourismTerms.en).forEach(term => {
        if (desc.toLowerCase().includes(term.toLowerCase())) {
          desc = desc.replace(new RegExp(term, 'gi'), tourismTerms.hi[term]);
        }
      });
      newSchema.description = desc;
    }
    
    return newSchema;
  }
  
  // Return original schema for English
  return schema;
};

// Generate hreflang tags for page head
export const generateHrefLangTags = (currentPath, baseUrl = 'https://cgblog.in') => {
  const alternates = getLanguageAlternates(currentPath, baseUrl);
  
  return [
    { rel: 'alternate', hrefLang: 'en-IN', href: alternates['en-IN'] },
    { rel: 'alternate', hrefLang: 'hi-IN', href: alternates['hi-IN'] },
    { rel: 'alternate', hrefLang: 'x-default', href: alternates['en-IN'] }
  ];
}; 