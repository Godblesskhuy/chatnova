import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Dashboard руу хандах үед auth шалгах (production дээр)
  if (pathname.startsWith('/dashboard')) {
    // Auth state шалгах
    const hasAuth = request.cookies.getAll().some(c =>
      c.name.includes('supabase') ||
      c.name.includes('auth-token') ||
      c.name.includes('sb-access-token')
    );

    if (!hasAuth) {
      url.pathname = '/auth/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
