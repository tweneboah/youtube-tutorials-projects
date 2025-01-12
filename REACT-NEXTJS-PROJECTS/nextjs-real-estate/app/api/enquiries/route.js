import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Enquiry from '@/models/enquiry';
import { verifyToken } from '@/lib/jwt';

export async function POST(request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const data = await request.json();
    const { propertyId, recipientId, message } = data;

    if (!propertyId || !recipientId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the enquiry
    const enquiry = await Enquiry.create({
      property: propertyId,
      sender: decoded.userId,
      recipient: recipientId,
      message: message.trim(),
      status: 'pending'
    });

    // Populate the enquiry with sender and recipient details
    const populatedEnquiry = await Enquiry.findById(enquiry._id)
      .populate('sender', 'name email')
      .populate('recipient', 'name email')
      .populate('property', 'title images');

    return NextResponse.json(populatedEnquiry);
  } catch (error) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to create enquiry' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    await connectDB();

    // Find all enquiries where the user is either the sender or recipient
    const enquiries = await Enquiry.find({
      $or: [
        { sender: decoded.userId },
        { recipient: decoded.userId }
      ]
    })
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

    return NextResponse.json({ enquiries });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enquiries' },
      { status: 500 }
    );
  }
}
