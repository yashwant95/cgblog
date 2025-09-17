import config from '../config';

const BASE_URL = config.API_BASE_URL;

export const PlacesApi = {
  // Get all places
  getAllPlaces: async () => {
    try {
      const response = await fetch(`${BASE_URL}/places`);
      if (!response.ok) {
        throw new Error('Failed to fetch places');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Get a single place by ID
  getPlaceById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/places/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch place');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Create a new place
  createPlace: async (placeData) => {
    try {
      const response = await fetch(`${BASE_URL}/places`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(placeData),
      });
      if (!response.ok) {
        throw new Error('Failed to create place');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Update a place
  updatePlace: async (id, placeData) => {
    try {
      const response = await fetch(`${BASE_URL}/places/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(placeData),
      });
      if (!response.ok) {
        throw new Error('Failed to update place');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Delete a place
  deletePlace: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/places/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete place');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
