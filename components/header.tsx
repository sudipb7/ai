import Link from "next/link";
import Image from "next/image";

import { FeedbackModalTrigger } from "@/components/modals/feedback-modal";
import { createClient } from "@/lib/supabase/server";
import { LogOut } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export const Header = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const handleLogout = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    revalidatePath("/");
    return redirect("/");
  };

  return (
    <header className="sticky inset-x-0 top-0 z-20 w-full backdrop-blur-2xl">
      <nav className="mx-auto max-w-[1440px] h-16 px-4 sm:px-12 md:px-24 lg:px-28 flex items-center justify-between">
        <Link href={user?.email ? "/chat" : "/"}>
          <Image src="/logo.svg" alt="AI logo" width={80} height={80} />
        </Link>
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 p-2">
          <FeedbackModalTrigger />
          {user?.email && (
            <form action={handleLogout}>
              <Button
                size="sm"
                type="submit"
                variant="ghost"
                className="bg-transparent hover:bg-transparent text-zinc-200 hover:text-white"
              >
                Logout
                <LogOut className="h-4 w-4 ml-2" />
              </Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};
