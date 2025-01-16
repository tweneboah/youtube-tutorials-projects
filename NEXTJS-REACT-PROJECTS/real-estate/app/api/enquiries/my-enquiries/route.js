import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import { getTokenFromHeader, verifyToken } from '@/lib/jwt';
import User from '@/models/user';
import Enquiry from '@/models/enquiry';

// Define the Property model
const propertySchema = new mongoose.Schema({
  title: String,
  images: [String],
  location: String,
  price: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded || !decoded.userId) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();
    
    // Find enquiries where user is recipient
    const receivedEnquiries = await Enquiry.find({ recipient: decoded.userId })
      .populate({
        path: 'sender',
        select: 'name email'
      })
      .populate({
        path: 'recipient',
        select: 'name email'
      })
      .populate({
        path: 'property',
        select: 'title images'
      })
      .sort({ createdAt: -1 });

    // Find enquiries where user is sender
    const sentEnquiries = await Enquiry.find({ sender: decoded.userId })
      .populate({
        path: 'sender',
        select: 'name email'
      })
      .populate({
        path: 'recipient',
        select: 'name email'
      })
      .populate({
        path: 'property',
        select: 'title images'
      })
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify({ received: receivedEnquiries, sent: sentEnquiries }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch enquiries' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
