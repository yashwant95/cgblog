import Link from 'next/link';

export const viewport = {
  themeColor: '#4F46E5',
  colorScheme: 'light dark',
};

export const metadata = {
  title: "Page Not Found | Chhattisgarh Tourism Guide - CG Blog",
  description: "Sorry, the page you're looking for doesn't exist. Explore our guides on Chhattisgarh's tourist places, events, food, and reviews.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="text-6xl font-bold text-blue-600 mb-6">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 max-w-xl mb-8">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
      </p>
      
      <div className="bg-gray-100 rounded-lg p-6 mb-8 max-w-xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Explore Chhattisgarh Instead</h3>
        <p className="text-gray-600 mb-4">
          Discover the natural beauty, rich culture, and hidden gems of Chhattisgarh:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
          <Link href="/places" className="flex items-center p-3 bg-white rounded-md hover:bg-blue-50 transition">
            <span className="text-blue-600 mr-2">🏞️</span>
            <span className="font-medium">Tourist Places</span>
          </Link>
          <Link href="/food" className="flex items-center p-3 bg-white rounded-md hover:bg-blue-50 transition">
            <span className="text-blue-600 mr-2">🍚</span>
            <span className="font-medium">Local Cuisine</span>
          </Link>
          <Link href="/events" className="flex items-center p-3 bg-white rounded-md hover:bg-blue-50 transition">
            <span className="text-blue-600 mr-2">🎭</span>
            <span className="font-medium">Cultural Events</span>
          </Link>
          <Link href="/reviews" className="flex items-center p-3 bg-white rounded-md hover:bg-blue-50 transition">
            <span className="text-blue-600 mr-2">⭐</span>
            <span className="font-medium">Travel Reviews</span>
          </Link>
        </div>
      </div>
      
      <Link 
        href="/" 
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition transform hover:scale-105"
      >
        Return to Homepage
      </Link>
    </div>
  );
} 