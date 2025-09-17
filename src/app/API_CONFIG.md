# API Configuration

This project uses a centralized configuration system for API endpoints.

## Configuration File

The main configuration is located at `src/app/config.js`:

```javascript
const config = {
  // Base API URL - change this to your backend URL
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  
  // Individual API endpoints
  API: {
    PLACES: "/places",
    EVENTS: "/events",
    HEALTH: "/health"
  },
  
  // Full API URLs - dynamically built from API_BASE_URL
  get ENDPOINTS() {
    return {
      PLACES: `${this.API_BASE_URL}/places`,
      EVENTS: `${this.API_BASE_URL}/events`,
      HEALTH: `${this.API_BASE_URL}/health`
    };
  }
};
```

## Environment Variables

Create a `.env.local` file in your project root to override the default API URL:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001/api

# Environment
NODE_ENV=development
```

## Usage

### In Components
```javascript
import config from '../config';

// Use specific endpoint
const placesUrl = config.ENDPOINTS.PLACES;

// Or build URL dynamically
const eventsUrl = config.getApiUrl('/events');
```

### In API Classes
```javascript
import config from '../config';

const API_URL = config.ENDPOINTS.EVENTS;
```

## Changing API URL

### For Development
1. Update the `API_BASE_URL` in `config.js`
2. Or set `NEXT_PUBLIC_API_URL` in `.env.local`

### For Production
1. Set the `NEXT_PUBLIC_API_URL` environment variable
2. Or update the `API_BASE_URL` in `config.js`

## Files Using Config

- `src/app/coreApi/EventsApi.js`
- `src/app/coreApi/PlacesApi.js`
- `src/app/admin/places/page.js`
- `src/app/admin/events/page.js`
- `src/app/places/[slug]/page.js`

## Benefits

- ✅ Centralized configuration
- ✅ Environment-based URL switching
- ✅ Easy to maintain and update
- ✅ Consistent across all components
- ✅ Type-safe configuration
