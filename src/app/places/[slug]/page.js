import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import config from '../../config';

// API URL for places
const API_URL = config.ENDPOINTS.PLACES;

// Function to create URL-friendly slug from place name
const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim(); // Remove leading/trailing spaces
};

// Helper function to fetch all places
async function fetchAllPlaces() {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 60 },
      cache: 'no-store' // Ensure we get fresh data
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const places = await response.json();
    return places.map(place => ({
      id: place._id,
      slug: createSlug(place.name),
      title: place.name,
      location: place.location,
      excerpt: place.location || 'Explore this beautiful destination in Chhattisgarh',
      // Handle both old format (description) and new format (sections)
      content: place.description || '<p>More details coming soon.</p>',
      sections: place.sections || [],
      image: place.image || '/placeholder-image.jpg',
      date: new Date(place.createdAt || Date.now()).toISOString().split('T')[0],
      author: place.author || "Admin",
      rating: place.rating || 4.5,
      visitingHours: place.visitingHours || "8:00 AM to 6:00 PM, all days",
      entryFee: place.entryFee || "₹20 for Indians, ₹100 for foreigners",
      bestTimeToVisit: place.bestTimeToVisit || "October to March (Post-monsoon to winter)"
    }));
  } catch (error) {
    console.error('Error fetching places:', error);
    return [];
  }
}

// Helper function to fetch a single place by slug
async function fetchPlaceBySlug(slug) {
  const places = await fetchAllPlaces();
  return places.find(p => p.slug === slug);
}

// Generate metadata dynamically based on the place
export async function generateMetadata({ params }) {
  const place = await fetchPlaceBySlug(params.slug);

  if (!place) {
    return {
      title: 'Place Not Found | Chhattisgarh Tourism',
      description: 'The place you are looking for could not be found.',
    };
  }

  return {
    title: `${place.title} | Chhattisgarh Tourism`,
    description: place.excerpt,
    openGraph: {
      title: `${place.title} | Chhattisgarh Tourism`,
      description: place.excerpt,
      images: [
        {
          url: place.image,
          width: 1200,
          height: 630,
          alt: place.title,
        },
      ],
      type: 'article',
    },
  };
}

// Define the page component
export default async function PlaceDetailPage({ params }) {
  const { slug } = params;
  const place = await fetchPlaceBySlug(slug);

  // If place is not found, show a 404 page
  if (!place) {
    notFound();
  }

  // Format date for display
  const formattedDate = new Date(place.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": place.title,
    "description": place.excerpt,
    "image": place.image,
    "address": {
      "@type": "PostalAddress",
      "name": place.location // Assuming location field can be used as address name
      // Add more address properties if available (e.g., streetAddress, addressLocality, addressRegion)
    },
    "geo": {
        "@type": "GeoCoordinates",
        // Replace with actual latitude and longitude if available in place object
        "latitude": 0,
        "longitude": 0
    },
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ],
        "opens": place.visitingHours.split(' to ')[0].split(' ')[0], // Extract opening time
        "closes": place.visitingHours.split(' to ')[1].split(' ')[0]  // Extract closing time
    }
    // Add more properties like aggregateRating, review if available
  };


  return (
    <main className="bg-gradient-to-b from-blue-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={place.image}
            alt={place.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/50 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="max-w-5xl mx-auto">
            {place.rating && (
              <div className="inline-flex items-center bg-yellow-500 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {place.rating} Rating
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-md">
              {place.title}
            </h1>
            <div className="flex flex-wrap items-center text-sm md:text-base space-x-4 mb-4 text-white/90">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                By {place.author}
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
          {/* Place Excerpt - Highlighted */}
          <div className="bg-blue-100 border-l-4 border-blue-500 p-6 rounded-lg mb-10">
            <p className="text-xl text-blue-800 italic font-medium">
              {place.excerpt}
            </p>
          </div>

          {/* Place Content - Sections */}
          <div className="space-y-10">
            {place.sections && place.sections.length > 0 ? (
              // New format with sections
              place.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-bold text-blue-700 mb-4">{section.title}</h2>
                  <div
                    className="prose prose-lg max-w-none prose-headings:text-blue-700 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-li:marker:text-blue-400 prose-img:rounded-xl prose-img:shadow-lg"
                    dangerouslySetInnerHTML={{ __html: section.description }}
                  />
                </div>
              ))
            ) : (
              // Legacy format with single description
              <div
                className="prose prose-lg max-w-none prose-headings:text-blue-700 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-li:marker:text-blue-400 prose-img:rounded-xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: place.content }}
              />
            )}
          </div>

          {/* Place Details Card */}
          <div className="mt-12 bg-white rounded-xl shadow-xl overflow-hidden border border-blue-100">
            <div className="bg-blue-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white">Visitor Information</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">BEST TIME TO VISIT</h4>
                  <p className="text-gray-800">{place.bestTimeToVisit}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">ENTRY FEE</h4>
                  <p className="text-gray-800">{place.entryFee}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">VISITING HOURS</h4>
                  <p className="text-gray-800">{place.visitingHours}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">SHARE THIS PLACE</h4>
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
                    <a href="#" className="text-pink-600 hover:text-pink-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Location Map</h3>
            <div className="bg-gray-200 h-80 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
              <div className="text-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 12.414a1.998 1.998 0 10-2.827 2.827l4.244 4.243a8 8 0 111.414-1.414z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-600">Interactive map loading...</p>
                <p className="text-sm text-gray-500 mt-2">Click to view full map</p>
              </div>
            </div>
          </div>

          {/* Back Link with Animation */}
          <div className="mt-12 text-center">
            <Link
              href="/places"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition transform hover:-translate-y-1 shadow-lg text-lg font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Places
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}