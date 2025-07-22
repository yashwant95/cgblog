import { reviewPosts } from '@/app/data/reviewsData';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Generate metadata dynamically based on the review
export async function generateMetadata({ params }) {
  const review = reviewPosts.find(p => p.slug === params.slug);

  if (!review) {
    return {
      title: 'Review Not Found | Cg blog',
      description: 'The review you are looking for could not be found.',
    };
  }

  return {
    title: `${review.title} | Cg blog Reviews`,
    description: review.excerpt,
    openGraph: {
      title: `${review.title} | Cg blog Reviews`,
      description: review.excerpt,
      images: [
        {
          url: review.image,
          width: 1200,
          height: 630,
          alt: review.title,
        },
      ],
      type: 'article',
    },
  };
}

// Define the page component
export default function ReviewDetailPage({ params }) {
  const { slug } = params;
  const review = reviewPosts.find(p => p.slug === params.slug);

  // If review is not found, show a 404 page
  if (!review) {
    notFound();
  }

  // Format date for display
  const formattedDate = new Date(review.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "datePublished": review.date,
    "reviewBody": review.content.replace(/<[^>]*>/g, ''), // Remove HTML tags for reviewBody
    "name": review.title,
    "itemReviewed": {
      "@type": "CreativeWork", // Or a more specific type like TouristAttraction, Event, FoodEstablishment
      "name": review.itemReviewed // Assuming 'itemReviewed' property exists in review data
      // You might need to add more properties like URL or sameAs if available
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5" // Assuming a 5-star rating system
    },
    "image": review.image
  };


  return (
    <main className="bg-gradient-to-b from-yellow-50 to-white">
      {/* Add JSON-LD structured data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={review.image}
            alt={review.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/80 via-yellow-800/50 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="max-w-5xl mx-auto">
            {review.rating && (
              <div className="inline-flex items-center bg-yellow-500 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {review.rating} Rating
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-md">
              {review.title}
            </h1>
            <div className="flex flex-wrap items-center text-sm md:text-base space-x-4 mb-4 text-white/90">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                By {review.author}
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
          {/* Review Excerpt - Highlighted */}
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-lg mb-10">
            <p className="text-xl text-yellow-800 italic font-medium">
              {review.excerpt}
            </p>
          </div>

          {/* Review Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-yellow-700 prose-a:text-yellow-600 hover:prose-a:text-yellow-800 prose-li:marker:text-yellow-500 prose-strong:text-yellow-900 prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: review.content }}
          />

          {/* Review Summary Card */}
          <div className="mt-12 bg-white rounded-xl shadow-xl overflow-hidden border border-yellow-100">
            <div className="bg-yellow-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white">Review Summary</h3>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="w-full md:w-1/2">
                  <h4 className="text-lg font-semibold text-yellow-800 mb-4">Highlights</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Authentic local experience</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Great value for money</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Friendly staff and service</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-1/2">
                  <h4 className="text-lg font-semibold text-yellow-800 mb-4">Areas for Improvement</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>Limited accessibility options</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>Inconsistent Wi-Fi connectivity</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Rating Breakdown */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-yellow-800 mb-4">Rating Breakdown</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <span className="w-24 text-sm text-gray-600">Service</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-full bg-yellow-500 rounded-full" style={{width: '90%'}}></div>
                    </div>
                    <span className="text-sm font-medium text-yellow-700">4.5/5</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 text-sm text-gray-600">Value</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-full bg-yellow-500 rounded-full" style={{width: '80%'}}></div>
                    </div>
                    <span className="text-sm font-medium text-yellow-700">4.0/5</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 text-sm text-gray-600">Cleanliness</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-full bg-yellow-500 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <span className="text-sm font-medium text-yellow-700">4.3/5</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 text-sm text-gray-600">Location</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-full bg-yellow-500 rounded-full" style={{width: '95%'}}></div>
                    </div>
                    <span className="text-sm font-medium text-yellow-700">4.8/5</span>
                  </div>
                </div>
              </div>
              
              {/* Share Section */}
              <div className="mt-8 flex justify-between items-center border-t border-gray-200 pt-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">SHARE THIS REVIEW</h4>
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
                  </div>
                </div>
                <div>
                  <button className="inline-flex items-center text-yellow-600 hover:text-yellow-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Add Your Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Back Link with Animation */}
          <div className="mt-12 text-center">
            <Link 
              href="/reviews" 
              className="inline-flex items-center bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition transform hover:-translate-y-1 shadow-lg text-lg font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Reviews
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}