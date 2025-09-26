import config from '../config.js';

class ReviewsApi {
  static async getAllReviews(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add all parameters to query string
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          queryParams.append(key, params[key]);
        }
      });

      const url = `${config.ENDPOINTS.REVIEWS}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
      
      const response = await fetch(url, {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching reviews:', error);
      
      // Return fallback data when API fails
      console.log('Using fallback review data due to API failure');
      return {
        success: true,
        data: [
          {
            _id: '1',
            title: 'Amazing Chitrakote Falls Experience',
            excerpt: 'One of the most beautiful waterfalls I have ever seen. The view is breathtaking and the surrounding nature is pristine.',
            image: '/review-adventure.jpg',
            rating: 4.8,
            category: 'attractions',
            author: 'Rajesh Kumar',
            visitDate: '2024-01-15',
            location: { city: 'Jagdalpur' },
            likes: 25,
            helpful: 18
          },
          {
            _id: '2',
            title: 'Delicious Local Food at Bastar',
            excerpt: 'The traditional Chhattisgarhi cuisine here is absolutely amazing. Must try the local delicacies!',
            image: '/review-bastar-food.jpg',
            rating: 4.5,
            category: 'restaurants',
            author: 'Priya Sharma',
            visitDate: '2024-02-10',
            location: { city: 'Bastar' },
            likes: 32,
            helpful: 24
          },
          {
            _id: '3',
            title: 'Spiritual Journey at Danteshwari Temple',
            excerpt: 'A very peaceful and spiritual place. The temple architecture is beautiful and the atmosphere is serene.',
            image: '/review-danteshwari.jpg',
            rating: 4.7,
            category: 'temples',
            author: 'Amit Patel',
            visitDate: '2024-01-25',
            location: { city: 'Dantewada' },
            likes: 28,
            helpful: 20
          }
        ]
      };
    }
  }

  static async getReviewById(id) {
    try {
      const response = await fetch(`${config.ENDPOINTS.REVIEWS}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching review by ID:', error);
      throw error;
    }
  }

  static async getReviewBySlug(slug) {
    try {
      const response = await fetch(`${config.ENDPOINTS.REVIEWS}/slug/${slug}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching review by slug:', error);
      throw error;
    }
  }

  static async createReview(reviewData) {
    try {
      const response = await fetch(config.ENDPOINTS.REVIEWS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  }

  static async createReviewWithImage(formData) {
    try {
      const response = await fetch(config.ENDPOINTS.REVIEWS, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating review with image:', error);
      throw error;
    }
  }

  static async updateReview(id, reviewData) {
    try {
      const response = await fetch(`${config.ENDPOINTS.REVIEWS}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  }

  static async updateReviewWithImage(id, formData) {
    try {
      const response = await fetch(`${config.ENDPOINTS.REVIEWS}/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating review with image:', error);
      throw error;
    }
  }

  static async deleteReview(id) {
    try {
      const response = await fetch(`${config.ENDPOINTS.REVIEWS}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  }

  static async getFeaturedReviews(limit = 10) {
    try {
      const response = await fetch(`${config.ENDPOINTS.REVIEWS}/featured?limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching featured reviews:', error);
      throw error;
    }
  }

  static async getReviewsByCategory(category, limit = 20) {
    try {
      const response = await fetch(`${config.ENDPOINTS.REVIEWS}/category/${category}?limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching reviews by category:', error);
      throw error;
    }
  }

  static async getReviewsByLocation(city, limit = 20) {
    try {
      const response = await fetch(`${config.ENDPOINTS.REVIEWS}/location/${city}?limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching reviews by location:', error);
      throw error;
    }
  }

  static async searchReviews(query, limit = 20) {
    try {
      const response = await fetch(`${config.ENDPOINTS.REVIEWS}/search?q=${encodeURIComponent(query)}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching reviews:', error);
      throw error;
    }
  }

  static async addHelpful(id) {
    try {
      const response = await fetch(`${config.ENDPOINTS.REVIEWS}/${id}/helpful`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding helpful vote:', error);
      throw error;
    }
  }

  static async addLike(id) {
    try {
      const response = await fetch(`${config.ENDPOINTS.REVIEWS}/${id}/like`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding like:', error);
      throw error;
    }
  }

  static async addComment(id, commentData) {
    try {
      const response = await fetch(`${config.ENDPOINTS.REVIEWS}/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  static async getReviewCategories() {
    try {
      const response = await fetch(`${config.ENDPOINTS.REVIEWS}/categories`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching review categories:', error);
      
      // Return fallback data when API fails
      console.log('Using fallback review categories due to API failure');
      return {
        success: true,
        data: ['restaurants', 'hotels', 'attractions', 'temples', 'shopping', 'entertainment', 'transportation', 'services']
      };
    }
  }

  static async getReviewLocations() {
    try {
      const response = await fetch(`${config.ENDPOINTS.REVIEWS}/locations`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching review locations:', error);
      throw error;
    }
  }
}

export default ReviewsApi;
