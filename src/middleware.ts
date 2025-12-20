import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the request is for admin routes
  if (pathname.startsWith('/admin')) {
    // Get the auth cookie
    const authCookie = request.cookies.get('auth_session');
    
    // If no auth cookie, redirect to login
    if (!authCookie) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Parse and check if logged in
    try {
      const authData = JSON.parse(authCookie.value);
      if (!authData.loggedIn) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      // Invalid cookie, redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

// Configure which routes use the middleware
export const config = {
  matcher: ['/admin/:path*'],
};

