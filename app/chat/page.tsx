import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import Chat from "./_components";

export const metadata = {
  title: "Chat",
  description: "Chat with the AI.",
};

export default async function ChatPage() {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/sign-in");
  }

  return <Chat />;
}
