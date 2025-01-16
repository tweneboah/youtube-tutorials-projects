import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';

// Define Property model schema
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  images: [String],
  features: [String],
  type: String,
  status: String,
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create or get the model
const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    await connectDB();

    const listings = await Property.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    // Convert _id to string and format dates
    const formattedListings = listings.map(listing => ({
      ...listing,
      _id: listing._id.toString(),
      createdAt: listing.createdAt.toISOString(),
      userId: listing.userId.toString()
    }));

    return NextResponse.json(formattedListings);
  } catch (error) {
    console.error('Get listings error:', error);
    return NextResponse.json(
      { error: 'Error fetching listings' },
      { status: 500 }
    );
  }
}
