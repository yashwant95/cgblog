"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReviewsApi from '../coreApi/ReviewsApi';
import config from '../config';

// Client component containing the interactive parts
export default function ReviewsListClient() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState(0);
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        status: 'published',
        page: 1,
        limit: 50
      };

      if (searchTerm) {
        params.search = searchTerm;
      }
      if (filterRating > 0) {
        params.rating = filterRating;
      }
      if (filterCategory) {
        params.category = filterCategory;
      }

      const response = await ReviewsApi.getAllReviews(params);
      // Handle the API response structure: { success: true, data: [...], pagination: {...} }
      setReviews(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews. Please try again later.');
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterRating, filterCategory]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await ReviewsApi.getReviewCategories();
      // Handle the API response structure
      setCategories(response.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  // Fetch reviews on component mount
  useEffect(() => {
    const initializeData = async () => {
      await fetchCategories();
      await fetchReviews();
    };
    initializeData();
  }, [fetchCategories]);

  // Fetch reviews when filters change
  useEffect(() => {
    fetchReviews();
  }, [searchTerm, filterRating, filterCategory]);

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim(); // Remove leading/trailing spaces
  };

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
        <div className="md:w-48">
          <label htmlFor="category-filter" className="sr-only">Filter by category</label>
          <select 
            id="category-filter"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="md:w-48">
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
            <option value="3">3+ Stars</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-10">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
            <p className="mt-4 text-gray-600">Loading reviews...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 text-lg mb-4">{error}</div>
            <button 
              onClick={fetchReviews}
              className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition"
            >
              Try Again
            </button>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-12">
            No reviews found matching your criteria.
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <div className="md:flex">
                <div className="md:w-2/5 h-64 md:h-auto relative">
                  <Image
                    src={review.image.startsWith('http') ? review.image : `${config.API_BASE_URL.replace('/api', '')}${review.image}`}
                    alt={review.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                    unoptimized={true}
                  />
                  {review.rating && (
                    <div className="absolute top-0 right-0 bg-yellow-500 text-white px-4 py-2 rounded-bl-lg font-bold">
                      {review.rating} ★
                    </div>
                  )}
                  {review.category && (
                    <div className="absolute top-0 left-0 bg-blue-500 text-white px-3 py-1 rounded-br-lg text-sm font-medium">
                      {review.category.charAt(0).toUpperCase() + review.category.slice(1)}
                    </div>
                  )}
                </div>
                <div className="p-6 md:w-3/5">
                  <h2 className="text-2xl font-bold text-yellow-800 mb-2">{review.title}</h2>
                  <p className="text-gray-600 mb-4">{review.excerpt}</p>
                  
                  {/* Review metadata */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      By {review.author}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(review.visitDate).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
                    </span>
                    {review.location?.city && (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {review.location.city}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {review.likes || 0} likes
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {review.helpful || 0} helpful
                      </span>
                    </div>
                    <Link 
                      href={`/reviews/${review.slug || createSlug(review.title)}`} 
                      className="inline-block bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
                    >
                      Read Review
                    </Link>
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
