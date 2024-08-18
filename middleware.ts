import { NextRequest, NextResponse } from 'next/server';
import { getCookies } from 'next-client-cookies/server';

export async function middleware(req: NextRequest) {
  // const { pathname } = req.nextUrl;

  // // Access cookies using next-client-cookies
  // const cookies = getCookies();

  // // Check for tokens in cookies
  // const token = cookies.get('token');
  // const accessKey = cookies.get('accessKey');

  // // If accessKey exists, allow access to all routes
  // if (accessKey) {
  //   return NextResponse.next(); // Admin has access to all routes
  // }

  // // If no valid accessKey, check for user-specific routes
  // if (pathname.startsWith('/patients') || pathname.startsWith('/api/users') || pathname.startsWith('/api/patients') || pathname.startsWith('/api/appointments')) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL('/signin', req.url));
  //   }

  //   // Allow access to the route since the token is present
  //   return NextResponse.next();
  // }

  // // For admin routes: If no accessKey is present, redirect to signin
  // if (pathname.startsWith('/admin')) {
  //   return NextResponse.redirect(new URL('/signin', req.url));
  // }

  // // If no specific route is matched, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*', // Admin routes
    '/patients/:path*', // User-specific routes
    '/api/users/:path*', // User-specific API routes
    '/api/patients/:path*', // Patients API routes
    '/api/appointments/:path*', // Appointments API routes
  ],
};
