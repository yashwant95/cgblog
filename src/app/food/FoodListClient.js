"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import config from '../config';

// Helper function to create slug
const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Helper function to get category color
const getCategoryColor = (category) => {
  const colors = {
    'breakfast': 'bg-yellow-100 text-yellow-800',
    'lunch': 'bg-green-100 text-green-800',
    'dinner': 'bg-blue-100 text-blue-800',
    'snacks': 'bg-purple-100 text-purple-800',
    'sweets': 'bg-pink-100 text-pink-800',
    'beverages': 'bg-cyan-100 text-cyan-800',
    'traditional': 'bg-orange-100 text-orange-800',
    'street-food': 'bg-indigo-100 text-indigo-800'
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

// Helper function to get difficulty color
const getDifficultyColor = (difficulty) => {
  const colors = {
    'easy': 'bg-green-100 text-green-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'hard': 'bg-red-100 text-red-800'
  };
  return colors[difficulty] || 'bg-gray-100 text-gray-800';
};

export default function FoodListClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [isVegetarian, setIsVegetarian] = useState('');
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Static data
  const categories = ['breakfast', 'lunch', 'dinner', 'snacks', 'sweets', 'beverages', 'traditional', 'street-food'];
  const cuisines = ['chhattisgarhi', 'north-indian', 'south-indian', 'gujarati', 'punjabi', 'bengali', 'rajasthani', 'maharashtrian'];

  // Load foods on mount - simple like admin page
  useEffect(() => {
    fetchFoods();
  }, []);

  async function fetchFoods() {
    try {
      setLoading(true);
      const response = await fetch(config.ENDPOINTS.FOOD);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.success) {
        setFoods(data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch foods');
      }
    } catch (error) {
      console.error('Error fetching foods:', error);
      setError(error.message);
      // Use fallback data
      setFoods([
        {
          _id: '1',
          name: 'Chila',
          description: 'Traditional Chhattisgarhi breakfast made with rice flour',
          shortDescription: 'Traditional rice flour breakfast',
          image: '/food-chila.jpg',
          category: 'breakfast',
          cuisine: 'chhattisgarhi',
          difficulty: 'easy',
          prepTime: 15,
          cookTime: 20,
          servings: 4,
          isVegetarian: true,
          isVegan: false,
          isSpicy: false,
          isGlutenFree: true,
          rating: 4.5
        },
        {
          _id: '2',
          name: 'Faraa',
          description: 'Steamed rice flour dumplings with spicy filling',
          shortDescription: 'Steamed rice flour dumplings',
          image: '/food-faraa.jpg',
          category: 'lunch',
          cuisine: 'chhattisgarhi',
          difficulty: 'medium',
          prepTime: 30,
          cookTime: 25,
          servings: 6,
          isVegetarian: true,
          isVegan: true,
          isSpicy: true,
          isGlutenFree: true,
          rating: 4.3
        },
        {
          _id: '3',
          name: 'Dehrori',
          description: 'Sweet rice flour balls in sugar syrup',
          shortDescription: 'Sweet rice flour balls',
          image: '/food-dehrori.jpg',
          category: 'sweets',
          cuisine: 'chhattisgarhi',
          difficulty: 'medium',
          prepTime: 20,
          cookTime: 30,
          servings: 8,
          isVegetarian: true,
          isVegan: true,
          isSpicy: false,
          isGlutenFree: true,
          rating: 4.7
        },
        {
          _id: '4',
          name: 'Muthia',
          description: 'Fried rice flour dumplings with vegetables',
          shortDescription: 'Fried rice flour dumplings',
          image: '/food-muthia.jpg',
          category: 'snacks',
          cuisine: 'chhattisgarhi',
          difficulty: 'easy',
          prepTime: 25,
          cookTime: 15,
          servings: 4,
          isVegetarian: true,
          isVegan: false,
          isSpicy: true,
          isGlutenFree: true,
          rating: 4.2
        },
        {
          _id: '5',
          name: 'Bafauri',
          description: 'Steamed lentil dumplings with aromatic spices',
          shortDescription: 'Steamed lentil dumplings',
          image: '/food-bafauri.jpg',
          category: 'dinner',
          cuisine: 'chhattisgarhi',
          difficulty: 'medium',
          prepTime: 35,
          cookTime: 20,
          servings: 6,
          isVegetarian: true,
          isVegan: true,
          isSpicy: true,
          isGlutenFree: true,
          rating: 4.4
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Filter foods
  const filteredFoods = foods.filter(food => {
    if (searchTerm && !food.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !food.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (selectedCategory && food.category !== selectedCategory) {
      return false;
    }
    if (selectedCuisine && food.cuisine !== selectedCuisine) {
      return false;
    }
    if (selectedDifficulty && food.difficulty !== selectedDifficulty) {
      return false;
    }
    if (isVegetarian === 'true' && !food.isVegetarian) {
      return false;
    }
    if (isVegetarian === 'false' && food.isVegetarian) {
      return false;
    }
    return true;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedCuisine('');
    setSelectedDifficulty('');
    setIsVegetarian('');
  };

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Chhattisgarhi Cuisine
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover the authentic flavors of Chhattisgarh. From traditional breakfast dishes to festive sweets, 
            explore the rich culinary heritage of this beautiful state.
          </p>
        </div>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </main>
    );
  }

  if (error && foods.length === 0) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="text-center text-red-500 py-10">{error}</div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Chhattisgarhi Cuisine
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Discover the authentic flavors of Chhattisgarh. From traditional breakfast dishes to festive sweets, 
          explore the rich culinary heritage of this beautiful state.
        </p>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <input
              type="text"
              placeholder="Search foods..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Cuisine */}
          <div>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
            >
              <option value="">All Cuisines</option>
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>
                  {cuisine.charAt(0).toUpperCase() + cuisine.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="">All Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Vegetarian */}
          <div>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={isVegetarian}
              onChange={(e) => setIsVegetarian(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="true">Vegetarian</option>
              <option value="false">Non-Vegetarian</option>
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        <div className="flex justify-end mt-4">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-orange-600 hover:text-orange-800 font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredFoods.length} food{filteredFoods.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {filteredFoods.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-20">
            No foods found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFoods.map((food) => (
              <Link 
                key={food._id} 
                href={`/food/${createSlug(food.name)}`}
                className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-64">
                  <Image
                    src={food.image || '/placeholder-food.jpg'}
                    alt={food.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized={food.image?.startsWith('http')}
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(food.category)}`}>
                      {food.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(food.difficulty)}`}>
                      {food.difficulty}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {food.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {food.shortDescription || food.description}
                  </p>

                  {/* Food Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {food.prepTime + food.cookTime} min
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {food.servings} servings
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {food.rating || 0}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {food.isVegetarian && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Veg</span>
                    )}
                    {food.isVegan && (
                      <span className="bg-lime-100 text-lime-800 text-xs px-2 py-1 rounded-full">Vegan</span>
                    )}
                    {food.isSpicy && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Spicy</span>
                    )}
                    {food.isGlutenFree && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Gluten-Free</span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <div className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 px-4 rounded-xl text-center font-semibold group-hover:from-orange-600 group-hover:to-red-700 transition-all duration-300">
                    View Details
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}