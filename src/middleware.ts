import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/utils/auth";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions
  );
  const redirectPath = new URL(request.url).pathname;

  if (!session.isAuthenticated) {
    return NextResponse.redirect(
      new URL(
        `/sign-in?redirect=${encodeURIComponent(redirectPath)}`,
        request.url,
      ),
    );
  }

  return response;
}

export const config = { matcher: ["/protected/:path*"] };