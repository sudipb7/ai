import Link from "next/link";
import { Twitter, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "../mode-toggle";

export const ChatHeader = () => {
  return (
    <header className="w-full fixed top-0 inset-x-0 z-[4] border-b border-b-border bg-offwhite/10 dark:dark:bg-zinc-950/10 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto flex justify-between py-2 px-4 border-x border-x-border">
        <div className="bg-gradient-to-br from-green-200 via-green-500 to-green-900 bg-clip-text flex items-center gap-4 p-2">
          <h1 className="text-xl md:text-2xl font-extrabold font-mono uppercase tracking-wider text-transparent">
            AI Playground
          </h1>
        </div>
        <nav className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="opacity-80 hover:opacity-100"
          >
            <Link
              href="https://github.com/sudipb7/ai-labs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="opacity-80 hover:opacity-100"
          >
            <Link
              href="https://twitter.com/SudipB7_"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};
