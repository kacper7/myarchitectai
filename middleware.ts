import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PRIVATE_URLS = [ // require authentication
  '/generate',
  '/generate-custom-architect',
  '/generate-custom-home',
  '/generate-floorplan',
  '/generate-interior',
]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const accessToken = req.cookies.get('sb.auth.token')?.value

  if (PRIVATE_URLS.includes(req.nextUrl.pathname)) {
    if (!accessToken) {
      return NextResponse.json({ error: 'Please sign in to perform this action' }, { status: 401 })
    }
  }

  if (req.nextUrl.pathname === '/signup') {
    if (accessToken) {
      return NextResponse.redirect(new URL('/dream', req.nextUrl.origin))
    }
  }

  return res
}

