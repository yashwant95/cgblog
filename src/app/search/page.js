"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query);

  // Mock search data - replace with actual search implementation
  const searchData = [
    {
      title: "Chitrakote Falls",
      type: "place",
      url: "/places/chitrakote-falls",
      description: "Known as the 'Niagara of India', this spectacular waterfall in Bastar is a must-visit destination.",
      image: "/optimized/chitrakote.avif",
      tags: ["waterfall", "bastar", "nature", "photography"]
    },
    {
      title: "Bastar Dussehra",
      type: "event",
      url: "/events/bastar-dussehra",
      description: "A unique 75-day long festival celebrating tribal culture and traditions in Chhattisgarh.",
      image: "/optimized/event-bastar-dussehra.avif",
      tags: ["festival", "tribal", "culture", "celebration"]
    },
    {
      title: "Chila Recipe",
      type: "food",
      url: "/food/chila",
      description: "Traditional Chhattisgarhi breakfast made with rice flour - crispy, healthy, and delicious.",
      image: "/optimized/food-chila.avif",
      tags: ["breakfast", "traditional", "rice", "healthy"]
    },
    {
      title: "Sirpur Archaeological Site",
      type: "place",
      url: "/places/sirpur",
      description: "Ancient Buddhist archaeological site with remarkable temples and monasteries.",
      image: "/optimized/sirpur.avif",
      tags: ["archaeology", "buddhist", "historical", "heritage"]
    },
    {
      title: "Faraa Recipe",
      type: "food",
      url: "/food/faraa",
      description: "Steamed rice dumplings filled with dal - a popular traditional snack from Chhattisgarh.",
      image: "/optimized/food-faraa.avif",
      tags: ["snacks", "steamed", "dal", "traditional"]
    },
    {
      title: "Bhoramdeo Temple",
      type: "place",
      url: "/places/bhoramdeo-temple",
      description: "Often called the 'Khajuraho of Chhattisgarh' for its intricate stone carvings.",
      image: "/optimized/bhoramdeo.avif",
      tags: ["temple", "architecture", "carvings", "heritage"]
    },
    {
      title: "Rajim Kumbh Mela",
      type: "event",
      url: "/events/rajim-kumbh",
      description: "Sacred gathering at the confluence of rivers, known as 'Chhattisgarh's Prayag'.",
      image: "/optimized/event-rajim-kumbh.avif",
      tags: ["religious", "pilgrimage", "rivers", "spiritual"]
    },
    {
      title: "Muthia Recipe",
      type: "food",
      url: "/food/muthia",
      description: "Traditional steamed flour balls served with spicy chutney.",
      image: "/optimized/food-muthia.avif",
      tags: ["steamed", "flour", "chutney", "spicy"]
    }
  ];

  useEffect(() => {
    const performSearch = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        if (query.trim()) {
          const filtered = searchData.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
          );
          setResults(filtered);
        } else {
          setResults([]);
        }
        setLoading(false);
      }, 300);
    };

    performSearch();
  }, [query]);

  const getTypeColor = (type) => {
    switch (type) {
      case 'place': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'food': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'event': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'place': return '🏛️';
      case 'food': return '🍽️';
      case 'event': return '🎉';
      default: return '📄';
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery.trim())}`);
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-100">
      <Head>
        <title>{query ? `Search results for "${query}"` : 'Search'} - CG Blog</title>
        <meta name="description" content={`Search results for ${query} on CG Blog - find places, food, and events in Chhattisgarh.`} />
      </Head>
      
      <div className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {query ? (
                <>
                  Search Results for <span className="text-green-600">"{query}"</span>
                </>
              ) : (
                'Search Chhattisgarh'
              )}
            </h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search places, food, events, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm bg-white"
                />
                <svg className="w-6 h-6 text-gray-400 absolute left-4 top-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Search Results */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Searching...</p>
            </div>
          ) : query && results.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find anything matching "{query}". Try different keywords or browse our categories.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/places" className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                  Browse Places
                </Link>
                <Link href="/food" className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 transition-colors duration-200">
                  Browse Food
                </Link>
                <Link href="/events" className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors duration-200">
                  Browse Events
                </Link>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Found <span className="font-semibold text-gray-900">{results.length}</span> results
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Sort by:</span>
                  <select className="border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>Relevance</option>
                    <option>Type</option>
                    <option>Alphabetical</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                {results.map((result, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                    <Link href={result.url} className="block">
                      <div className="flex flex-col md:flex-row">
                        
                        {/* Image */}
                        <div className="md:w-48 h-48 md:h-auto bg-gray-100 flex-shrink-0">
                          <img
                            src={result.image}
                            alt={result.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = result.image.replace('/optimized/', '/').replace('.avif', '.jpg');
                            }}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{getTypeIcon(result.type)}</span>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(result.type)}`}>
                                {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-green-600 transition-colors duration-200">
                            {result.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {result.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {result.tags.slice(0, 4).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start your search</h3>
              <p className="text-gray-600 mb-6">
                Discover amazing places, delicious food, and exciting events in Chhattisgarh
              </p>
              <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors duration-200">
                  <div className="text-3xl mb-2">🏛️</div>
                  <h4 className="font-semibold text-gray-900">Places</h4>
                  <p className="text-sm text-gray-600">Tourist destinations</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors duration-200">
                  <div className="text-3xl mb-2">🍽️</div>
                  <h4 className="font-semibold text-gray-900">Food</h4>
                  <p className="text-sm text-gray-600">Local cuisine</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors duration-200">
                  <div className="text-3xl mb-2">🎉</div>
                  <h4 className="font-semibold text-gray-900">Events</h4>
                  <p className="text-sm text-gray-600">Festivals & celebrations</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Search() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading search...</p>
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}