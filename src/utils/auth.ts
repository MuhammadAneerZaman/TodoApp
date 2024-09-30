// utils/auth.js
import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Env } from '@/app/env/env';

export function verifyToken(req: NextRequest) {
  const token =  req.cookies.get('token');

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded =    jwt.verify(token.value, Env.JwtSecret);
    // return decoded.userId;
    const userId = (decoded as JwtPayload).userId;
    return userId;
  } catch (error) {
    console.log("Error while verifying token",error);
    
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}