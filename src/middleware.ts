import { NextRequest, NextResponse } from 'next/server';
import { supabaseTokenKey } from './config/config';

export async function middleware(request: NextRequest) {
  const supabaseToken = request.cookies.get(supabaseTokenKey)?.value;

  const { pathname } = request.nextUrl;
  const isAuthRoute = pathname.startsWith('/auth/');

  if (!supabaseToken && !isAuthRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (supabaseToken && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: 'nodejs',
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
