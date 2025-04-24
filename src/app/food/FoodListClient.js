"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { foodPosts } from '../data/foodData';

// This is the client component containing the interactive parts
export default function FoodListClient() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = foodPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4 text-green-700">Chhattisgarh Food Blog</h1>
      <p className="mb-6 text-gray-700 text-lg">Explore traditional recipes, street food, and culinary stories from Chhattisgarh.</p>
      
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search food posts..."
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredPosts.length === 0 ? (
           <div className="text-center text-gray-500 text-lg lg:col-span-2">No food posts found matching your search.</div>
        ) : (
          filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <div className="h-60 overflow-hidden relative">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transform hover:scale-105 transition duration-500"
                // Consider removing priority if many images are loaded initially
                // priority 
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-green-800">{post.title}</h2>
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
                  <Link href={`/food/${post.slug}`} className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                    Read More
                  </Link>
                )}
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </main>
  );
}
