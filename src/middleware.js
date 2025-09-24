import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  // Add compression headers
  const acceptEncoding = request.headers.get('accept-encoding');
  
  if (acceptEncoding?.includes('gzip')) {
    response.headers.set('Content-Encoding', 'gzip');
  } else if (acceptEncoding?.includes('br')) {
    response.headers.set('Content-Encoding', 'br');
  } else if (acceptEncoding?.includes('deflate')) {
    response.headers.set('Content-Encoding', 'deflate');
  }
  
  // Add cache headers for static assets
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
