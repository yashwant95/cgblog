import config from '../config';

// API URL for events
const API_URL = config.ENDPOINTS.EVENTS;

class EventsApi {
  // Get all events with optional filters
  static async getAllEvents(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters to query params
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const url = queryParams.toString() ? `${API_URL}?${queryParams.toString()}` : API_URL;
      
      const response = await fetch(url, {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
        cache: 'no-store' // Ensure we get fresh data
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  // Get event by slug
  static async getEventBySlug(slug) {
    try {
      const response = await fetch(`${API_URL}/slug/${slug}`, {
        next: { revalidate: 60 },
        cache: 'no-store'
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.success ? data.data : null;
    } catch (error) {
      console.error('Error fetching event by slug:', error);
      throw error;
    }
  }

  // Get event by ID
  static async getEventById(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        next: { revalidate: 60 },
        cache: 'no-store'
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.success ? data.data : null;
    } catch (error) {
      console.error('Error fetching event by ID:', error);
      throw error;
    }
  }

  // Get featured events
  static async getFeaturedEvents() {
    try {
      const response = await fetch(`${API_URL}/featured`, {
        next: { revalidate: 60 },
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching featured events:', error);
      throw error;
    }
  }

  // Get upcoming events
  static async getUpcomingEvents(limit = 10) {
    try {
      const response = await fetch(`${API_URL}?status=upcoming&sortBy=startDate&sortOrder=asc&limit=${limit}`, {
        next: { revalidate: 60 },
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      throw error;
    }
  }

  // Search events
  static async searchEvents(searchParams) {
    try {
      const queryParams = new URLSearchParams();
      
      Object.keys(searchParams).forEach(key => {
        if (searchParams[key] !== undefined && searchParams[key] !== null && searchParams[key] !== '') {
          queryParams.append(key, searchParams[key]);
        }
      });

      const url = `${API_URL}/search?${queryParams.toString()}`;
      
      const response = await fetch(url, {
        next: { revalidate: 60 },
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error searching events:', error);
      throw error;
    }
  }

  // Create event (for admin use)
  static async createEvent(eventData) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.success ? data.data : null;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  // Update event (for admin use)
  static async updateEvent(id, eventData) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.success ? data.data : null;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  // Delete event (for admin use)
  static async deleteEvent(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
}

export { EventsApi };
