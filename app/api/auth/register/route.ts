import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import { SignJWT } from 'jose';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  const { name, email, phone, password } = await req.json();

  try {
    // Check if the email is already registered
    const existingEmailUser = await prisma.user.findUnique({ where: { email } });
    if (existingEmailUser) {
      return NextResponse.json(
        {
          message:
            'Email already registered. Please try to login or use a different email address.',
        },
        { status: 400 },
      );
    }

    // Check if the phone number is already registered
    const existingPhoneUser = await prisma.user.findUnique({ where: { phone } });
    if (existingPhoneUser) {
      return NextResponse.json(
        {
          message:
            'Phone number already registered. Please try to login or use a different phone number.',
        },
        { status: 400 },
      );
    }

    // Hash the user's password
    const hashedPassword = await argon2.hash(password);

    // Create the new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
      },
    });

    // Generate a JWT token
    const token = await new SignJWT({ id: user.id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .sign(new TextEncoder().encode(JWT_SECRET));

    // Create the response
    const response = NextResponse.json({ message: 'User registered successfully', token, user });

    // Set the cookie using NextResponse
    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    console.error('Error during user registration:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
