import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const profile = await currentProfile();

  if (profile) {
    return redirect("/");
  }

  return (
    <main className="min-h-[calc(100dvh-4rem)] flex items-center justify-center">{children}</main>
  );
}
