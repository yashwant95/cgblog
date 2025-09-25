"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FoodApi from '../coreApi/FoodApi';

// Helper function to create slug
const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim(); // Remove leading/trailing spaces
};

// Helper function to get difficulty color
const getDifficultyColor = (difficulty) => {
  const colors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };
  return colors[difficulty] || 'bg-gray-100 text-gray-800';
};

// Helper function to get category color
const getCategoryColor = (category) => {
  const colors = {
    breakfast: 'bg-orange-100 text-orange-800',
    lunch: 'bg-blue-100 text-blue-800',
    dinner: 'bg-purple-100 text-purple-800',
    snacks: 'bg-pink-100 text-pink-800',
    sweets: 'bg-red-100 text-red-800',
    beverages: 'bg-cyan-100 text-cyan-800',
    traditional: 'bg-amber-100 text-amber-800',
    'street-food': 'bg-indigo-100 text-indigo-800'
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

// Client component containing the interactive parts
export default function FoodListClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [isVegetarian, setIsVegetarian] = useState('');
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const [categoriesData, cuisinesData] = await Promise.all([
        FoodApi.getFoodCategories(),
        FoodApi.getFoodCuisines()
      ]);
      
      setCategories(categoriesData.data || []);
      setCuisines(cuisinesData.data || []);
    } catch (err) {
      console.error('Error fetching initial data:', err);
      setError('Failed to load food data. Please try again later.');
      setLoading(false);
    }
  };

  const fetchFoods = async () => {
    try {
      setLoading(true);
      
      const params = {
        status: 'published',
        limit: 50
      };

      // Add filters
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory) params.category = selectedCategory;
      if (selectedCuisine) params.cuisine = selectedCuisine;
      if (selectedDifficulty) params.difficulty = selectedDifficulty;
      if (isVegetarian) params.isVegetarian = isVegetarian;

      const response = await FoodApi.getAllFoods(params);
      
      if (response.success) {
        setFoods(response.data || []);
      } else {
        throw new Error(response.message || 'Failed to fetch foods');
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching foods:', err);
      setError('Failed to load foods. Please try again later.');
      setLoading(false);
    }
  };

  // Fetch initial data
  useEffect(() => {
    const initializeData = async () => {
      await fetchData();
      await fetchFoods();
    };
    initializeData();
  }, [fetchFoods]);

  // Fetch foods when filters change
  useEffect(() => {
    fetchFoods();
  }, [fetchFoods, searchTerm, selectedCategory, selectedCuisine, selectedDifficulty, isVegetarian]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedCuisine('');
    setSelectedDifficulty('');
    setIsVegetarian('');
  };

  if (error) {
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
              <option value="">Any Difficulty</option>
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
              <option value="">All Foods</option>
              <option value="true">Vegetarian</option>
              <option value="false">Non-Vegetarian</option>
            </select>
          </div>
        </div>
        
        {/* Clear Filters */}
        <div className="mt-4 text-center">
          <button
            onClick={clearFilters}
            className="text-orange-600 hover:text-orange-800 font-medium"
          >
            Clear All Filters
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {foods.length} food{foods.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {foods.length === 0 ? (
            <div className="text-center text-gray-500 text-lg py-20">
              No foods found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {foods.map((food) => (
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

                    {/* View Recipe Button */}
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl group-hover:from-orange-700 group-hover:to-red-700 transition-colors font-medium">
                      View Recipe
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}