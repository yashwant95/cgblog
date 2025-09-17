// API Configuration
const config = {
  // Base API URL - change this to your backend URL
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  
  // Individual API endpoints
  API: {
    PLACES: "/places",
    EVENTS: "/events",
    FOOD: "/food",
    REVIEWS: "/reviews",
    HEALTH: "/health"
  },
  
  // Full API URLs - dynamically built from API_BASE_URL
  get ENDPOINTS() {
    return {
      PLACES: `${this.API_BASE_URL}/places`,
      EVENTS: `${this.API_BASE_URL}/events`,
      FOOD: `${this.API_BASE_URL}/food`,
      REVIEWS: `${this.API_BASE_URL}/reviews`,
      HEALTH: `${this.API_BASE_URL}/health`
    };
  },
  
  // Environment settings
  ENV: {
    DEVELOPMENT: process.env.NODE_ENV === 'development',
    PRODUCTION: process.env.NODE_ENV === 'production'
  },
  
  // API request settings
  REQUEST: {
    TIMEOUT: 10000, // 10 seconds
    RETRY_ATTEMPTS: 3,
    CACHE_DURATION: 60 // seconds
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${config.API_BASE_URL}${endpoint}`;
};

// Helper function to get specific endpoint URL
export const getEndpointUrl = (endpoint) => {
  return config.ENDPOINTS[endpoint.toUpperCase()] || `${config.API_BASE_URL}/${endpoint}`;
};

// Export the config object
export default config;
