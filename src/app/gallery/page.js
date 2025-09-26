"use client"
import Head from 'next/head';
import { useState } from 'react';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      src: "/optimized/chitrakote.avif",
      fallback: "/chitrakote.jpg",
      title: "Chitrakote Falls",
      category: "waterfalls",
      description: "The magnificent Chitrakote Falls, known as the 'Niagara of India'"
    },
    {
      src: "/optimized/bhoramdeo.avif",
      fallback: "/bhoramdeo.jpg",
      title: "Bhoramdeo Temple",
      category: "temples",
      description: "Ancient Bhoramdeo Temple with intricate stone carvings"
    },
    {
      src: "/optimized/sirpur.avif",
      fallback: "/sirpur.jpg",
      title: "Sirpur Archaeological Site",
      category: "heritage",
      description: "Historical ruins at Sirpur showcasing ancient Buddhist heritage"
    },
    {
      src: "/optimized/barnawapara.avif",
      fallback: "/barnawapara.jpg",
      title: "Barnawapara Wildlife Sanctuary",
      category: "wildlife",
      description: "Wildlife and natural beauty at Barnawapara Sanctuary"
    },
    {
      src: "/optimized/achanakmar.avif",
      fallback: "/achanakmar.jpg",
      title: "Achanakmar Tiger Reserve",
      category: "wildlife",
      description: "Dense forests of Achanakmar Tiger Reserve"
    },
    {
      src: "/optimized/udanti_sitanadi.avif",
      fallback: "/udanti_sitanadi.jpg",
      title: "Udanti-Sitanadi Tiger Reserve",
      category: "wildlife",
      description: "Natural habitat at Udanti-Sitanadi Tiger Reserve"
    },
    {
      src: "/optimized/event-bastar-dussehra.avif",
      fallback: "/event-bastar-dussehra.jpg",
      title: "Bastar Dussehra",
      category: "festivals",
      description: "The unique 75-day long Bastar Dussehra celebration"
    },
    {
      src: "/optimized/event-rajim-kumbh.avif",
      fallback: "/event-rajim-kumbh.jpg",
      title: "Rajim Kumbh",
      category: "festivals",
      description: "Spiritual gathering at Rajim Kumbh Mela"
    },
    {
      src: "/optimized/event-madai-festival.avif",
      fallback: "/event-madai-festival.jpg",
      title: "Madai Festival",
      category: "festivals",
      description: "Traditional tribal Madai festival celebrations"
    },
    {
      src: "/gallery1.jpg",
      fallback: "/gallery1.jpg",
      title: "Traditional Architecture",
      category: "heritage",
      description: "Beautiful traditional architecture of Chhattisgarh"
    },
    {
      src: "/gallery2.jpg",
      fallback: "/gallery2.jpg",
      title: "Natural Landscape",
      category: "nature",
      description: "Scenic natural landscapes of Chhattisgarh"
    },
    {
      src: "/gallery3.jpg",
      fallback: "/gallery3.jpg",
      title: "Cultural Heritage",
      category: "culture",
      description: "Rich cultural heritage and traditions"
    }
  ];

  const categories = [
    { key: 'all', label: 'All Photos', count: images.length },
    { key: 'waterfalls', label: 'Waterfalls', count: images.filter(img => img.category === 'waterfalls').length },
    { key: 'temples', label: 'Temples', count: images.filter(img => img.category === 'temples').length },
    { key: 'heritage', label: 'Heritage', count: images.filter(img => img.category === 'heritage').length },
    { key: 'wildlife', label: 'Wildlife', count: images.filter(img => img.category === 'wildlife').length },
    { key: 'festivals', label: 'Festivals', count: images.filter(img => img.category === 'festivals').length },
    { key: 'nature', label: 'Nature', count: images.filter(img => img.category === 'nature').length },
    { key: 'culture', label: 'Culture', count: images.filter(img => img.category === 'culture').length }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-100">
      <Head>
        <title>Photo Gallery - Chhattisgarh Tourism | CG Blog</title>
        <meta name="description" content="Explore stunning photography of Chhattisgarh's attractions, festivals, wildlife, and cultural heritage. Visual journey through the beauty of CG." />
        <meta name="keywords" content="Chhattisgarh photos, CG gallery, tourism photography, waterfalls, temples, wildlife, festivals, heritage sites, nature photography" />
      </Head>
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Photo <span className="text-green-600">Gallery</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the beauty of Chhattisgarh through our curated collection of stunning photographs
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.key
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-md'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = image.fallback;
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white rounded-full p-2">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{image.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{image.description}</p>
                  <div className="mt-3">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full capitalize">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No images found in this category.</p>
            </div>
          )}

          {/* Image Modal */}
          {selectedImage && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-4xl max-h-full">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300 z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  onError={(e) => {
                    e.target.src = selectedImage.fallback;
                  }}
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-6 rounded-b-lg">
                  <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-200">{selectedImage.description}</p>
                  <span className="inline-block bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded-full capitalize mt-2">
                    {selectedImage.category}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 text-center bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Share Your Chhattisgarh Experience</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Have amazing photos from your Chhattisgarh trip? We'd love to feature your photography in our gallery. 
              Share your experiences and help other travelers discover the beauty of CG.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/contact" 
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Submit Your Photos
              </a>
              <a 
                href="#" 
                className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors duration-300"
              >
                Photography Guidelines
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}