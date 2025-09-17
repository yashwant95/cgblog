"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import config from '../config';

// API URL for places
const API_URL = config.ENDPOINTS.PLACES;

// Client component containing the interactive parts
export default function PlacesListClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch places from API
  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        
        // Convert API data format to match our UI format
        const formattedPlaces = data.map((place, index) => ({
          id: place._id,
          slug: place.name.toLowerCase().replace(/\s+/g, '-'),
          title: place.name,
          excerpt: place.location || 'Explore this beautiful destination in Chhattisgarh',
          content: place.description || '<p>More details coming soon.</p>',
          image: place.image || '/placeholder-image.jpg',
          date: new Date(place.createdAt || Date.now()).toISOString().split('T')[0],
          author: "Admin",
          rating: 4.5
        }));
        
        setPlaces(formattedPlaces);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching places:', err);
        setError('Failed to load places. Please try again later.');
        setLoading(false);
      }
    }
    
    fetchPlaces();
  }, []);

  // Filter places based on search term
  const filteredPosts = places.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Chhattisgarh Places Blog</h1>
      <p className="mb-6 text-gray-700 text-lg">Discover must-visit destinations, hidden gems, and travel stories from across Chhattisgarh.</p>
      
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search destinations..."
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : (
        <div className="space-y-10">
          {filteredPosts.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">No places found matching your search.</div>
          ) : (
            filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <div className="md:flex">
                <div className="md:w-2/5 h-64 md:h-auto relative">
                  {post.image ? (
                    post.image.startsWith('http') ? (
                      // Use regular img tag for external images
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Prevent multiple error requests
                          if (!e.target.src.includes('placeholder-image.jpg')) {
                            e.target.src = '/placeholder-image.jpg';
                          }
                        }}
                      />
                    ) : (
                      // Use Next.js Image for local images with proper backend URL
                      <Image
                        src={`${config.API_BASE_URL.replace('/api', '')}${post.image}`}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    )
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
                <div className="p-6 md:w-3/5">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold text-blue-800">{post.title}</h2>
                    {post.rating && (
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-gray-600">{post.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">By {post.author} • {new Date(post.date).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</span>
                    {post.slug && (
                      <Link href={`/places/${post.slug}`} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Explore
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
          )}
        </div>
      )}
    </main>
  );
}
