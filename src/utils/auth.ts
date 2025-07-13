import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  isAuthenticated: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_SECRET!,
  cookieName: "_auth",
  cookieOptions: {
    secure: process.env.NODE_ENV == "production",
  },
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  ttl: 0,
};

export async function getSession() {
  const cookieStore = await cookies();
  return await getIronSession<SessionData>(cookieStore, sessionOptions);
}