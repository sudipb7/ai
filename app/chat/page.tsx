import { redirect } from "next/navigation";

import Chat from "./_components";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Chat",
  description: "Chat with the AI.",
};

export default async function ChatPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return redirect("/sign-in");
  }

  return <Chat />;
}
