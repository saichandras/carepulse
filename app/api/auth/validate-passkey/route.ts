import { NextRequest, NextResponse } from 'next/server';
import { encryptKey } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { passkey } = await req.json();

    if (passkey?.toString() === process.env.NEXT_PUBLIC_ADMIN_PASSKEY?.toString()) {
      // Encrypt the passkey before storing it
      const encryptedKey = encryptKey(passkey);

      // Set the accessKey cookie on the server side
      const response = NextResponse.json({ message: 'Passkey validated successfully' });

      response.cookies.set('accessKey', encryptedKey, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day in seconds
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return response;
    } else {
      return NextResponse.json({ message: 'Invalid passkey' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error validating passkey:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
