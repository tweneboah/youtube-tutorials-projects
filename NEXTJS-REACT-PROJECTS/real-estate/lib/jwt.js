import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '%021830283';

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env');
}

export const signToken = (payload) => {
  try {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: '30d'
    });
  } catch (error) {
    console.error('Error signing token:', error);
    return null;
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

export const getTokenFromHeader = (req) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  } catch (error) {
    console.error('Error getting token from header:', error);
    return null;
  }
};
