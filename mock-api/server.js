const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5001; // Changed port to 5001

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));

// Sample data - now with sections array
let places = [
  {
    _id: '1',
    name: 'Chitrakote Falls',
    location: 'Bastar, Chhattisgarh',
    image: 'http://localhost:5000/uploads/sample-chitrakote.jpg',
    sections: [
      {
        title: 'Overview',
        description: '<p>Known as the "Niagara Falls of India", Chitrakote Falls is a horseshoe-shaped waterfall on the Indravati River. It\'s the widest waterfall in India, spanning approximately 300 meters.</p>'
      },
      {
        title: 'Best Time to Visit',
        description: '<p>The falls are at their most spectacular during the monsoon season (July to October) when the river is in full flow.</p>'
      }
    ],
    createdAt: new Date('2023-01-15')
  },
  {
    _id: '2',
    name: 'Tirathgarh Waterfall',
    location: 'Jagdalpur, Chhattisgarh',
    image: 'http://localhost:5000/uploads/sample-tirathgarh.jpg',
    sections: [
      {
        title: 'About Tirathgarh',
        description: '<p>Tirathgarh Waterfall is a beautiful cascade located in the Kanger Valley National Park. The water falls from a height of about 100 feet in multiple streams, creating a mesmerizing view.</p>'
      },
      {
        title: 'Activities',
        description: '<p>Visitors can enjoy swimming in the natural pools formed at the base of the waterfall and explore the surrounding forest area which is rich in biodiversity.</p>'
      }
    ],
    createdAt: new Date('2023-02-20')
  },
  {
    _id: '3',
    name: 'Barnawapara Wildlife Sanctuary',
    location: 'Mahasamund, Chhattisgarh',
    image: 'http://localhost:5000/uploads/sample-barnawapara.jpg',
    sections: [
      {
        title: 'Wildlife',
        description: '<p>Barnawapara Wildlife Sanctuary is home to a variety of wildlife including leopards, bears, gaur, cheetal, and numerous bird species.</p>'
      },
      {
        title: 'Safari Information',
        description: '<p>Jeep safaris are available twice daily, in the morning and evening. The sanctuary is particularly known for its population of the Indian bison (gaur).</p>'
      }
    ],
    createdAt: new Date('2023-03-10')
  }
];

// Copy sample images to uploads directory if they don't exist
const sampleImages = [
  { name: 'sample-chitrakote.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chitrakote_Falls.jpg/1200px-Chitrakote_Falls.jpg' },
  { name: 'sample-tirathgarh.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Tirathgarh_Waterfall.jpg/1200px-Tirathgarh_Waterfall.jpg' },
  { name: 'sample-barnawapara.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Barnawapara_Wildlife_Sanctuary.jpg/1200px-Barnawapara_Wildlife_Sanctuary.jpg' }
];

// Helper function to download an image
async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filepath, buffer);
    console.log(`Downloaded: ${filepath}`);
  } catch (error) {
    console.error(`Failed to download ${url}: ${error.message}`);
  }
}

// Download sample images on server start
sampleImages.forEach(image => {
  const filepath = path.join(uploadsDir, image.name);
  if (!fs.existsSync(filepath)) {
    console.log(`Downloading sample image: ${image.name}`);
    downloadImage(image.url, filepath);
  }
});

// API Routes
// GET all places
app.get('/api/places', (req, res) => {
  res.json(places);
});

// GET place by ID
app.get('/api/places/:id', (req, res) => {
  const place = places.find(p => p._id === req.params.id);
  if (!place) {
    return res.status(404).json({ message: 'Place not found' });
  }
  res.json(place);
});

// POST create new place
app.post('/api/places', upload.single('image'), (req, res) => {
  try {
    console.log('POST request received');
    console.log('Request body:', req.body);
    console.log('File:', req.file);
    
    const { name, location, sections } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    
    // Parse sections if it's a string (from form data)
    let parsedSections = sections;
    if (typeof sections === 'string') {
      try {
        parsedSections = JSON.parse(sections);
      } catch (error) {
        console.error('Error parsing sections:', error);
        parsedSections = [];
      }
    }
    
    const newPlace = {
      _id: Date.now().toString(),
      name,
      location,
      sections: parsedSections || [],
      image: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : null,
      createdAt: new Date()
    };
    
    console.log('Created new place:', newPlace);
    places.push(newPlace);
    res.status(201).json(newPlace);
  } catch (error) {
    console.error('Error creating place:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// PUT update place
app.put('/api/places/:id', upload.single('image'), (req, res) => {
  try {
    console.log('PUT request received for ID:', req.params.id);
    console.log('Request body:', req.body);
    console.log('File:', req.file);
    
    const { name, location, sections } = req.body;
    const placeIndex = places.findIndex(p => p._id === req.params.id);
    
    if (placeIndex === -1) {
      return res.status(404).json({ message: 'Place not found' });
    }
    
    // Parse sections if it's a string (from form data)
    let parsedSections = sections;
    if (typeof sections === 'string') {
      try {
        parsedSections = JSON.parse(sections);
      } catch (error) {
        console.error('Error parsing sections:', error);
        parsedSections = places[placeIndex].sections || [];
      }
    }
    
    // Update the place
    places[placeIndex] = {
      ...places[placeIndex],
      name: name || places[placeIndex].name,
      location: location || places[placeIndex].location,
      sections: parsedSections || places[placeIndex].sections,
      image: req.file 
        ? `http://localhost:${PORT}/uploads/${req.file.filename}` 
        : places[placeIndex].image
    };
    
    console.log('Updated place:', places[placeIndex]);
    res.json(places[placeIndex]);
  } catch (error) {
    console.error('Error updating place:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// DELETE place
app.delete('/api/places/:id', (req, res) => {
  const placeIndex = places.findIndex(p => p._id === req.params.id);
  
  if (placeIndex === -1) {
    return res.status(404).json({ message: 'Place not found' });
  }
  
  // If there's an image, attempt to delete it
  const place = places[placeIndex];
  if (place.image && place.image.includes('/uploads/')) {
    const imagePath = place.image.split('/uploads/')[1];
    const fullPath = path.join(uploadsDir, imagePath);
    
    // Don't delete sample images
    const isSampleImage = sampleImages.some(img => place.image.includes(img.name));
    
    if (!isSampleImage && fs.existsSync(fullPath)) {
      try {
        fs.unlinkSync(fullPath);
      } catch (error) {
        console.error(`Error deleting image ${fullPath}:`, error);
      }
    }
  }
  
  // Remove the place from the array
  places.splice(placeIndex, 1);
  
  res.json({ message: 'Place deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api/places`);
});
