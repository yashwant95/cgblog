import { foodPosts } from '@/app/data/foodData';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Generate metadata dynamically based on the food item
export async function generateMetadata({ params }) {
  const food = foodPosts.find(p => p.slug === params.slug);

  if (!food) {
    return {
      title: 'Food Item Not Found | Cg blog',
      description: 'The food item you are looking for could not be found.',
    };
  }

  return {
    title: `${food.title} | Cg blog Food`,
    description: food.excerpt,
    openGraph: {
      title: `${food.title} | Cg blog Food`,
      description: food.excerpt,
      images: [
        {
          url: food.image, // Use the food item's image
          width: 1200,
          height: 630,
          alt: food.title,
        },
      ],
      type: 'article',
    },
  };
}

// Define the page component
export default function FoodDetailPage({ params }) {
  const { slug } = params;
  const food = foodPosts.find(p => p.slug === params.slug);

  // If food item is not found, show a 404 page
  if (!food) {
    notFound();
  }

  // Format date for display
  const formattedDate = new Date(food.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

    // Define JSON-LD schema for Article
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://cgblog.in/food/${food.slug}`
      },
      "headline": food.title,
      "description": food.excerpt,
      "image": {
        "@type": "ImageObject",
        "url": food.image,
        "width": 1200,
        "height": 630,
        "alt": food.title
      },
      "author": {
        "@type": "Person",
        "name": food.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "CG Blog"
      },
      "datePublished": food.date
    };
  return (
    <main className="bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={food.image}
            alt={food.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
                  {/* Add JSON-LD structured data script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-800/50 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="max-w-5xl mx-auto">
            {food.rating && (
              <div className="inline-flex items-center bg-yellow-500 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {food.rating} Rating
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-md">
              {food.title}
            </h1>
            <div className="flex flex-wrap items-center text-sm md:text-base space-x-4 mb-4 text-white/90">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                By {food.author}
              </span>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Published on {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <article>
          {/* Food Excerpt - Highlighted */}
          <div className="bg-green-100 border-l-4 border-green-500 p-6 rounded-lg mb-10">
            <p className="text-xl text-green-800 italic font-medium">
              {food.excerpt}
            </p>
          </div>

          {/* Food Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-green-700 prose-a:text-green-600 hover:prose-a:text-green-800 prose-li:marker:text-green-400 prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: food.content }}
          />

          {/* Recipe Card */}
          <div className="mt-12 bg-white rounded-xl shadow-xl overflow-hidden border border-green-100">
            <div className="bg-green-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white">Dish Information</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">PREPARATION TIME</h4>
                  <p className="text-gray-800">Approximately 30-45 minutes</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">AVAILABILITY</h4>
                  <p className="text-gray-800">Available at local restaurants and street vendors</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414a1.998 1.998 0 10-2.827 2.827l4.244 4.243a8 8 0 111.414-1.414z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">REGION</h4>
                  <p className="text-gray-800">Traditional dish from Chhattisgarh</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">SHARE THIS RECIPE</h4>
                  <div className="flex space-x-2 mt-1">
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    </a>
                    <a href="#" className="text-blue-400 hover:text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a href="#" className="text-red-600 hover:text-red-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" fill-rule="evenodd" clip-rule="evenodd"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Link with Animation */}
          <div className="mt-12 text-center">
            <Link 
              href="/food" 
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition transform hover:-translate-y-1 shadow-lg text-lg font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Food
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
