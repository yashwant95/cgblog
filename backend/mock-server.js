import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// In-memory storage for places
let places = [
  {
    _id: '1',
    name: 'Chitrakote Falls',
    description: '<p>Known as the "Niagara Falls of India", this horseshoe-shaped waterfall is located on the Indravati River.</p>',
    location: 'Bastar District',
    image: 'https://www.cgtourism.choice.gov.in/sites/default/files/2021-12/Chitrakote%20Waterfall.jpg',
    createdAt: new Date()
  },
  {
    _id: '2',
    name: 'Tirathgarh Waterfall',
    description: '<p>A beautiful multi-tiered waterfall located in the Kanger Valley National Park.</p>',
    location: 'Bastar District',
    image: 'https://www.cgtourism.choice.gov.in/sites/default/files/2021-12/Tirathgarh%20Waterfall.jpg',
    createdAt: new Date()
  }
];

// GET all places
app.get('/api/places', (req, res) => {
  res.json(places);
});

// GET a single place
app.get('/api/places/:id', (req, res) => {
  const place = places.find(p => p._id === req.params.id);
  if (!place) return res.status(404).json({ error: 'Place not found' });
  res.json(place);
});

// CREATE a new place
app.post('/api/places', (req, res) => {
  const newPlace = {
    _id: Date.now().toString(),
    ...req.body,
    createdAt: new Date()
  };
  places.push(newPlace);
  res.status(201).json(newPlace);
});

// UPDATE a place
app.put('/api/places/:id', (req, res) => {
  const index = places.findIndex(p => p._id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Place not found' });
  
  places[index] = {
    ...places[index],
    ...req.body
  };
  
  res.json(places[index]);
});

// DELETE a place
app.delete('/api/places/:id', (req, res) => {
  const index = places.findIndex(p => p._id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Place not found' });
  
  const deletedPlace = places[index];
  places = places.filter(p => p._id !== req.params.id);
  
  res.json({ message: 'Place deleted', deletedPlace });
});

app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`);
});
