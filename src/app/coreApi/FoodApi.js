import config from '../config';

class FoodApi {
  static baseUrl = 'https://backend.cgblog.in/api/food'; // Use only this API URL
  static requestCache = new Map();
  static cacheTime = 5 * 60 * 1000; // 5 minutes

  // Create cache key
  static createCacheKey(url, params = {}) {
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((acc, key) => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          acc[key] = params[key];
        }
        return acc;
      }, {});
    
    return `${url}?${JSON.stringify(sortedParams)}`;
  }

  // Main fetch method with caching
  static async fetchWithCache(url, params = {}) {
    const cacheKey = this.createCacheKey(url, params);
    
    // Check cache
    const cached = this.requestCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp) < this.cacheTime) {
      return cached.data;
    }
    
    // Make API call
    try {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          searchParams.append(key, params[key]);
        }
      });

      const fullUrl = `${url}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Cache the response
      this.requestCache.set(cacheKey, {
        data: data,
        timestamp: Date.now()
      });
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      // Return fallback data for specific endpoints
      return this.getFallbackData(url, params);
    }
  }

  // Fallback data when API fails
  static getFallbackData(url, params) {
    if (url.includes('/categories')) {
      return {
        success: true,
        data: ['breakfast', 'lunch', 'dinner', 'snacks', 'sweets', 'beverages', 'traditional', 'street-food']
      };
    }
    
    if (url.includes('/cuisines')) {
      return {
        success: true,
        data: ['chhattisgarhi', 'north-indian', 'south-indian', 'gujarati', 'punjabi', 'bengali', 'rajasthani', 'maharashtrian']
      };
    }
    
    // Fallback food data
    return {
      success: true,
      data: [
        {
          _id: '1',
          name: 'Chila',
          description: 'Traditional Chhattisgarhi breakfast made with rice flour',
          shortDescription: 'Traditional rice flour breakfast',
          image: '/optimized/food-chila.avif',
          fallbackImage: '/food-chila.jpg',
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
          rating: 4.5,
          featured: true
        },
        {
          _id: '2',
          name: 'Faraa',
          description: 'Steamed rice dumplings filled with dal, a popular Chhattisgarhi snack',
          shortDescription: 'Steamed rice dumplings with dal filling',
          image: '/optimized/food-faraa.avif',
          fallbackImage: '/food-faraa.jpg',
          category: 'snacks',
          cuisine: 'chhattisgarhi',
          difficulty: 'medium',
          prepTime: 30,
          cookTime: 25,
          servings: 4,
          isVegetarian: true,
          isVegan: true,
          isSpicy: false,
          isGlutenFree: true,
          rating: 4.3,
          featured: true
        },
        {
          _id: '3',
          name: 'Muthia',
          description: 'Traditional Chhattisgarhi steamed flour balls served with spicy chutney',
          shortDescription: 'Steamed flour balls with chutney',
          image: '/optimized/food-muthia.avif',
          fallbackImage: '/food-muthia.jpg',
          category: 'snacks',
          cuisine: 'chhattisgarhi',
          difficulty: 'easy',
          prepTime: 20,
          cookTime: 15,
          servings: 4,
          isVegetarian: true,
          isVegan: true,
          isSpicy: true,
          isGlutenFree: false,
          rating: 4.2,
          featured: true
        }
      ]
    };
  }

  // Get all foods
  static async getAllFoods(params = {}) {
    return await this.fetchWithCache(this.baseUrl, params);
  }

  // Get food categories
  static async getFoodCategories() {
    return await this.fetchWithCache(`${this.baseUrl}/categories`);
  }

  // Get food cuisines
  static async getFoodCuisines() {
    return await this.fetchWithCache(`${this.baseUrl}/cuisines`);
  }

  // Get featured foods (limit specified number)
  static async getFeaturedFoods(limit = 3) {
    try {
      const params = { featured: true, limit };
      const result = await this.fetchWithCache(this.baseUrl, params);
      
      // If the result has data array, apply limit if needed
      if (result && result.data && Array.isArray(result.data)) {
        return {
          ...result,
          data: result.data.filter(item => item.featured).slice(0, limit)
        };
      }
      
      return result;
    } catch (error) {
      console.error('Error fetching featured foods:', error);
      // Return fallback featured foods
      const fallbackData = this.getFallbackData(this.baseUrl, { featured: true });
      return {
        ...fallbackData,
        data: fallbackData.data.filter(item => item.featured).slice(0, limit)
      };
    }
  }

  // Clear cache
  static clearCache() {
    this.requestCache.clear();
  }
}

export default FoodApi;