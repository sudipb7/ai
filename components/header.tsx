"use client";

import Link from "next/link";

import { useModal } from "@/hooks/use-modal-store";

import { MotionNav, MotionLink } from "./motion";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { onOpen } = useModal();

  return (
    <header className="sticky inset-x-0 top-0 z-20 w-full h-16 backdrop-blur-2xl px-4 sm:px-10 md:px-20 lg:px-24 flex items-center justify-between">
      <MotionLink
        href="/"
        initial={{ translateX: -20, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        className="bg-gradient-to-br from-green-500 to-green-900 bg-clip-text text-transparent text-xl md:text-2xl font-semibold p-2"
      >
        AI
      </MotionLink>
      <MotionNav
        initial={{ translateX: 20, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        className="flex items-center gap-2 md:gap-4 p-2"
      >
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
      </MotionNav>
    </header>
  );
};
