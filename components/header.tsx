"use client";

import Link from "next/link";
import Image from "next/image";

import { useModal } from "@/hooks/use-modal-store";

import { Button } from "@/components/ui/button";

export const Header = () => {
  const { onOpen } = useModal();

  return (
    <header className="sticky inset-x-0 top-0 z-20 w-full backdrop-blur-2xl">
      <nav className="animate_in mx-auto max-w-[1440px] h-16 px-4 sm:px-12 md:px-24 lg:px-28 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.svg" alt="AI logo" width={80} height={80} />
        </Link>
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 p-2">
          <Button
            size="sm"
            variant="ghost"
            className="bg-transparent hover:bg-transparent text-zinc-200 hover:text-white"
            onClick={() => onOpen("feedback")}
          >
            Feedback
          </Button>
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="bg-transparent hover:bg-transparent text-zinc-200 hover:text-white"
          >
            <Link href="/blogs">Blog</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};
