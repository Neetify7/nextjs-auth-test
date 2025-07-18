import { useEffect, useState } from "react";
import { SessionData } from "./auth";
import { redirect } from "next/navigation";

export function useAuth() {
  const [session, setSession] = useState<SessionData | null>(null);
  const isAuthenticated = session && session.isAuthenticated;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch("/api/session");
        setSession(await res.json());
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSession();
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const redirectPath = window.location.pathname;

      redirect(`/sign-in?redirect=${encodeURIComponent(redirectPath)}`);
    }
  }, [isLoading, isAuthenticated]);

  return { isAuthenticated, isLoading };
}