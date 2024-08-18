import { NextRequest, NextResponse } from 'next/server';
import { UserTypes } from '@/types/enums';

export async function POST(req: NextRequest) {
  try {
    const { role } = await req.json();
    const response = NextResponse.json({ message: 'Logged out successfully' });

    if (role === UserTypes.ADMIN) {
      // Clear the admin accessKey cookie
      response.cookies.set('accessKey', '', {
        maxAge: -1, 
        path: '/', 
      });
    }

    // Clear the user token cookie (applies to both users and admins)
    response.cookies.set('token', '', {
      maxAge: -1,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
