import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const url = request.nextUrl.clone();

    // Protect dashboard routes
    if (url.pathname.startsWith('/dashboard')) {
      // Check for auth cookie
      const supabaseCookie = request.cookies.get('sb-access-token') ||
                             request.cookies.get('supabase-auth-token') ||
                             request.cookies.get('__Host-next-auth.session-token');

      if (!supabaseCookie) {
        // In development, allow access - auth will be handled by pages
        if (process.env.NODE_ENV === 'development') {
          return NextResponse.next();
        }
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  } catch (error) {
    // On error, just pass through
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};
