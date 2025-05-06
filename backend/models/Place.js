import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: String,
  image: String,
  sections: [
    {
      title: String,
      description: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Place', placeSchema);
