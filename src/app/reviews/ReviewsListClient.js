"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { reviewPosts } from '../data/reviewsData';

// Client component containing the interactive parts
export default function ReviewsListClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState(0);

  const filteredReviews = reviewPosts
    .filter(review => 
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(review => filterRating === 0 || review.rating >= filterRating);

  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4 text-yellow-700">Reviews</h1>
      <p className="mb-6 text-gray-700 text-lg">Read honest reviews of restaurants, hotels, and attractions from locals and travelers.</p>
      
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search reviews..."
          className="flex-1 p-3 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="md:w-64">
          <label htmlFor="rating-filter" className="sr-only">Filter by rating</label>
          <select 
            id="rating-filter"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={filterRating}
            onChange={(e) => setFilterRating(Number(e.target.value))}
          >
            <option value="0">All Ratings</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
            {/* Add lower ratings if needed */}
          </select>
        </div>
      </div>
      
      <div className="space-y-10">
        {filteredReviews.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">No reviews found matching your criteria.</div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <div className="md:flex">
                <div className="md:w-2/5 h-64 md:h-auto relative">
                  <Image
                    src={review.image}
                    alt={review.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                    // Consider removing priority if many images load initially
                    // priority 
                  />
                  {review.rating && (
                    <div className="absolute top-0 right-0 bg-yellow-500 text-white px-4 py-2 rounded-bl-lg font-bold">
                      {review.rating} ★
                    </div>
                  )}
                </div>
                <div className="p-6 md:w-3/5">
                  <h2 className="text-2xl font-bold text-yellow-800 mb-2">{review.title}</h2>
                  <p className="text-gray-600 mb-4">{review.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">By {review.author} • {new Date(review.date).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</span>
                    {review.slug && (
                      <Link href={`/reviews/${review.slug}`} className="inline-block bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition">
                        Read Review
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
