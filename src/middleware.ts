import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const cookieStore = req.cookies.get('theme');

  if (!cookieStore) {
    req.cookies.set('theme', 'dark');
  }

  if (req.nextUrl.pathname.startsWith('/auth') && req.auth) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
});
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
