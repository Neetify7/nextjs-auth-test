import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Protected() {
  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect("/sign-in");
  }

  return (
    <div>
      <a href="/protected/test">test</a>
    </div>
  );
}