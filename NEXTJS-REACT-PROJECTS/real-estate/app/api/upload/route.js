import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { verifyToken } from '@/lib/jwt';
import User from '@/models/user';

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

export async function POST(request) {
  try {
    const auth = await verifyAuth(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'real-estate',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Error uploading file' },
      { status: 500 }
    );
  }
}
