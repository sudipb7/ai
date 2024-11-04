import Link from "next/link";
import Image from "next/image";

import { currentProfile } from "@/lib/current-profile";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { FeedbackModalTrigger } from "@/components/modals/feedback-modal";

export const Header = async () => {
  const profile = await currentProfile();

  return (
    <header className="sticky inset-x-0 top-0 z-20 w-full backdrop-blur-2xl">
      <nav className="mx-auto max-w-[1440px] h-16 px-4 sm:px-12 md:px-24 lg:px-28 flex items-center justify-between">
        <Link href={profile?.email ? "/chat" : "/"}>
          <Image src="/logo.svg" alt="AI logo" width={80} height={80} />
        </Link>
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 p-2">
          <FeedbackModalTrigger />
          {profile && <ProfileDropdown />}
        </div>
      </nav>
    </header>
  );
};
