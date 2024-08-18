import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { userId: string | number } }) {
  try {
    // Retrieve the userId from the request params
    const userId = Number(params.userId);

    // Fetch the user from the database
    const user = await prisma.user.findUnique({ where: { id: userId } });

    // Check if the user exists
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
