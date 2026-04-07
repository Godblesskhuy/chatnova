import { NextResponse, type NextRequest } from 'next/server';

// Simplified middleware - no Supabase dependency at build time
export async function updateSession(request: NextRequest) {
  try {
    const url = request.nextUrl.clone();

    // Protect dashboard routes
    if (url.pathname.startsWith('/dashboard')) {
      const authCookie = request.cookies.getAll().find(c =>
        c.name.includes('auth-token') ||
        c.name.includes('session') ||
        c.name.includes('sb-')
      );

      if (!authCookie) {
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Session update error:', error);
    return NextResponse.next();
  }
}
