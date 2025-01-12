import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Property from '@/models/property';
import User from '@/models/user';
import { verifyToken } from '@/lib/jwt';

// Helper function to verify auth
async function verifyAuth(request) {
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    return { error: 'Please login to access this resource', status: 401 };
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return { error: 'Invalid or expired token', status: 401 };
    }

    // Check if we have userId or id in the token
    const userId = decoded.userId || decoded.id;
    if (!userId) {
      return { error: 'Invalid token format', status: 401 };
    }

    // Verify the user exists
    const user = await User.findById(userId).select('_id');
    if (!user) {
      return { error: 'User not found', status: 401 };
    }

    return { userId: user._id.toString() };
  } catch (error) {
    console.error('Auth verification error:', error);
    return { error: 'Authentication failed', status: 401 };
  }
}

export async function GET(request) {
  try {
    const auth = await verifyAuth(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    await connectDB();
    
    console.log('Fetching properties for user:', auth.userId);
    
    const properties = await Property.find({ owner: auth.userId })
      .populate('owner', 'name email phone')
      .sort({ createdAt: -1 })
      .lean();
    
    console.log('Found properties:', properties);
    
    return NextResponse.json({ properties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Error fetching properties' },
      { status: 500 }
    );
  }
}
