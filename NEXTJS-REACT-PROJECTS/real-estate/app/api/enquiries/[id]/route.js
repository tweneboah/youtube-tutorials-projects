import { connectDB } from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import Property from '@/models/Property';
import { getTokenFromHeader, verifyToken } from '@/lib/jwt';

export async function PATCH(request, { params }) {
  try {
    const token = getTokenFromHeader(request);
    
    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { id } = params;
    const { status } = await request.json();

    await connectDB();

    // Find the enquiry
    const enquiry = await Enquiry.findById(id).populate('property');

    if (!enquiry) {
      return new Response(JSON.stringify({ error: 'Enquiry not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verify that the property belongs to the current user
    const property = await Property.findById(enquiry.property._id);
    if (property.owner.toString() !== decoded.userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Update the enquiry status
    enquiry.status = status;
    await enquiry.save();

    return new Response(JSON.stringify(enquiry), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
