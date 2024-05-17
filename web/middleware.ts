import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const protectedRoutes = ['/'];
const publicRoutes = ['/sign-in', '/sign-up'];

export default async function middleware(req: any) {
  const getCookie = headers().get('cookie');
  const token = getCookie
    ? getCookie
        .split(';')
        .find((c: string) => c.trim().startsWith('auth.token='))
        ?.split('=')[1]
    : null;

  const url = req.nextUrl.clone();

  if (protectedRoutes.includes(url.pathname)) {
    if (!token) {
      url.pathname = '/sign-in';
      return NextResponse.redirect(url);
    }
  }

  if (publicRoutes.includes(url.pathname)) {
    if (token) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
