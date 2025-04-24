// src/app/sitemap.js

const URL = 'https://cgblog.in'; // Your production domain

export default async function sitemap() {
  // Define static routes
  const routes = ['/', '/events', '/food', '/places', '/reviews'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly', // Adjust frequency as needed (e.g., 'daily', 'monthly')
    priority: route === '/' ? 1.0 : 0.8, // Homepage highest priority
  }));

  // Add dynamic routes here if you have them (e.g., individual blog posts)
  // const posts = await fetchPosts(); // Example: Fetch dynamic content
  // const postRoutes = posts.map((post) => ({
  //   url: `${URL}/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt).toISOString(),
  //   changeFrequency: 'monthly',
  //   priority: 0.6,
  // }));

  return [
    ...routes,
    // ...postRoutes, // Uncomment if you have dynamic routes
  ];
}
