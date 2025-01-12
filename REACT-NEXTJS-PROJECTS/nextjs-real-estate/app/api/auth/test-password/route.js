import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectDB();
    
    const { email, password } = await request.json();
    
    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json({ error: 'User not found' });
    }

    // Test password
    const isValid = await bcrypt.compare(password, user.password);
    
    // Create a new hash for comparison
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(password, salt);

    return NextResponse.json({
      success: true,
      email: user.email,
      storedHash: user.password,
      newHash,
      passwordMatches: isValid
    });
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({ error: error.message });
  }
}
