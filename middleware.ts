import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const accessToken = req.cookies.get('sb.auth.token')?.value

  if (!accessToken) {
    return NextResponse.json({ error: 'Please sign in to perform this action' }, { status: 401 })
  }

  return res
}

export const config = {
  matcher: [
    '/generate',
    '/generate-custom-architect',
    '/generate-custom-home',
    '/generate-floorplan',
    '/generate-interior',
  ]
}

