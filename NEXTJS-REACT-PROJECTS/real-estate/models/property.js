import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide property title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide property description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide property price']
  },
  location: {
    type: String,
    required: [true, 'Please provide property location']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  propertyType: {
    type: String,
    required: [true, 'Please provide property type'],
    enum: ['House', 'Apartment', 'Condo', 'Townhouse', 'Land', 'Commercial']
  },
  features: {
    bedrooms: Number,
    bathrooms: Number,
    area: Number, // in square feet
    parking: Boolean,
    furnished: Boolean
  },
  images: [{
    type: String,
    required: [true, 'Please provide at least one image']
  }],
  status: {
    type: String,
    enum: ['For Sale', 'For Rent', 'Sold', 'Rented'],
    default: 'For Sale'
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add index for better search performance
propertySchema.index({ location: 'text', title: 'text', description: 'text' });

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

export default Property;
