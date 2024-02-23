import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { LogOut, Settings } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { currentProfile } from "@/lib/current-profile";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const ProfileDropdown = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return null;
  }

  const handleLogout = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    revalidatePath("/");
    return redirect("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer h-7 w-7 md:h-9 md:w-9 ml-1">
          {profile.image_url ? (
            <AvatarImage src={profile.image_url} alt="Profile avatar" />
          ) : (
            <div className="rounded-full h-full w-full bg-gradient-to-br from-pink-700 to-blue-600" />
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        className="max-sm:mr-2 mt-1.5 md:min-w-[15rem] bg-zinc-900"
      >
        <div className="space-y-1 p-2">
          <h3 className="text-sm font-medium">{profile.name}</h3>
          <p className="text-xs text-zinc-400 font-light">{profile.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/settings" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action={handleLogout}>
            <button type="submit" className="flex items-center">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
