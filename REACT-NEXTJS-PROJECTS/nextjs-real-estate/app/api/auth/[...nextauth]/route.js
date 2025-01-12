import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          await connectDB();
          
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required');
          }

          const lowercaseEmail = credentials.email.toLowerCase();
          console.log('Login attempt for:', lowercaseEmail);

          // Find user
          const user = await User.findOne({ email: lowercaseEmail }).select('+password');
          
          if (!user) {
            console.log('No user found with email:', lowercaseEmail);
            throw new Error('Invalid credentials');
          }

          console.log('Found user:', {
            id: user._id.toString(),
            email: user.email
          });

          // Compare passwords
          const isValid = await bcrypt.compare(
            String(credentials.password),
            String(user.password)
          );

          if (!isValid) {
            console.log('Password verification failed for:', lowercaseEmail);
            throw new Error('Invalid credentials');
          }

          console.log('Login successful for:', lowercaseEmail);

          // Return user without password
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role
          };

        } catch (error) {
          console.error('Auth error:', error.message);
          throw new Error('Invalid credentials');
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: true
});

export { handler as GET, handler as POST };
