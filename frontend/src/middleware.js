import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req) {

  const path = req.nextUrl.pathname
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (session && path.startsWith('/login')) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }

  if (!session && path.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

}
