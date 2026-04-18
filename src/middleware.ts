import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const url = request.nextUrl.clone();
    const pathname = url.pathname;

    // Dashboard-руу хандах үед auth шалгах
    if (pathname.startsWith('/dashboard')) {
      // Supabase auth cookie-үүд шалгах
      const cookies = request.cookies.getAll();
      const hasAuth = cookies.some(c =>
        c.name.includes('auth-token') ||
        c.name.includes('supabase') ||
        c.name.includes('sb-')
      );

      // Хэрвээ auth cookie байхгүй бол login руу үSend
      if (!hasAuth) {
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // Алдаа гарсан үед хуудас үзүүлэх
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
