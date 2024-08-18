import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import { SignJWT } from 'jose';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await argon2.verify(user.password, password))) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const token = await new SignJWT({ id: user.id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .sign(new TextEncoder().encode(JWT_SECRET));

    const response = NextResponse.json({ message: 'Login successful', token, user });

    // Set the cookie using NextResponse
    response.cookies.set('token', token, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
