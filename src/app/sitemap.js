export default async function sitemap() {
    const baseUrl = 'https://cgblog.in';
    
    // Static pages
    const staticRoutes = [
      { url: baseUrl, lastModified: new Date() },
      { url: `${baseUrl}/places`, lastModified: new Date() },
      { url: `${baseUrl}/food`, lastModified: new Date() },
      { url: `${baseUrl}/events`, lastModified: new Date() },
      { url: `${baseUrl}/reviews`, lastModified: new Date() },
      { url: `${baseUrl}/about`, lastModified: new Date('2024-01-01') },
      { url: `${baseUrl}/contact`, lastModified: new Date('2024-01-01') },
    ].map(route => ({
      ...route,
      changeFrequency: 'weekly',
      priority: route.url === baseUrl ? 1.0 : 0.8,
    }));
  
    // Hardcoded sample dynamic routes instead of fetching from API
    // You can replace this with actual data fetching when your API is ready
    const placesRoutes = [
      { slug: 'chitrakote-falls', title: 'Chitrakote Falls' },
      { slug: 'danteshwari-temple', title: 'Danteshwari Temple' },
      { slug: 'barnawapara-wildlife-sanctuary', title: 'Barnawapara Wildlife Sanctuary' }
    ].map(item => ({
      url: `${baseUrl}/places/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  
    const foodRoutes = [
      { slug: 'chila', title: 'Chila' },
      { slug: 'faraa', title: 'Faraa' },
      { slug: 'muthia', title: 'Muthia' }
    ].map(item => ({
      url: `${baseUrl}/food/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  
    const eventsRoutes = [
      { slug: 'bastar-dussehra', title: 'Bastar Dussehra Festival' },
      { slug: 'champaran-mela', title: 'Champaran Mela' },
      { slug: 'madai-festival', title: 'Madai Festival' }
    ].map(item => ({
      url: `${baseUrl}/events/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  
    const reviewsRoutes = [
      { slug: 'chitrakote-falls-review', title: 'Magnificent Chitrakote Falls' },
      { slug: 'danteshwari-temple-review', title: 'Divine Experience at Danteshwari Temple' },
      { slug: 'bastar-lounge-review', title: 'Authentic Tribal Cuisine at Bastar Lounge' }
    ].map(item => ({
      url: `${baseUrl}/reviews/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  
    return [
      ...staticRoutes,
      ...placesRoutes,
      ...foodRoutes,
      ...eventsRoutes,
      ...reviewsRoutes
    ];
  }