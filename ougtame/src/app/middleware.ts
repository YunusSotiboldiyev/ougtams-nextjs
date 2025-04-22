// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Just continue normally — no auth, no redirect, no errors
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all paths except static files and Next.js internals
    '/((?!_next|.*\\..*|favicon.ico).*)',
  ],
};
