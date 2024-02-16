import Link from "next/link";
import { Github, Twitter } from "lucide-react";

import { MotionDiv, MotionNav } from "./motion";

export const MainHeader = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-20 w-full h-16 backdrop-blur-2xl px-4 sm:px-10 md:px-20 lg:px-24 flex items-center justify-between">
      <MotionDiv
        initial={{ translateX: 20, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        className="bg-gradient-to-br from-green-500 to-green-900 bg-clip-text text-transparent text-xl md:text-2xl font-semibold p-2"
      >
        AI
      </MotionDiv>
      <MotionNav
        initial={{ translateX: 20, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        className="flex items-center gap-4 p-2"
      >
        <Link
          href="https://twitter.com/SudipB7_"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-white"
        >
          <Twitter className="h-4 w-4 md:h-5 md:w-5" />
        </Link>
        <Link
          href="https://github.com/sudipb7/ai-labs"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-white"
        >
          <Github className="h-4 w-4 md:h-5 md:w-5" />
        </Link>
      </MotionNav>
    </header>
  );
};
