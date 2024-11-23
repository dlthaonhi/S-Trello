import jwt from 'jsonwebtoken';
import {Request } from 'express';


const JWT_SECRET = process.env.JWT_SECRET || 'default';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'; // Default expiration time set to 1 hour

export const generateJwt = (payload: any, expiresIn: any = "1h") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn });
};

export const verifyJwt = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};

export function extractToken(req: Request): string | null {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
  }
return null;
}