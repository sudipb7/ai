import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/sign-in");
  }

  return <>{children}</>;
}
