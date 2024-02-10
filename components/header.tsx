import Link from "next/link";
import { FaXTwitter, FaGithub } from "react-icons/fa6";

export const Header = () => {
  return (
    <header className="w-full fixed top-0 inset-x-0 z-[4] border-b border-b-[#373737] bg-[#1F1F1D]/10 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto flex justify-between py-2 px-4 border-x border-x-[#373737]">
        <div className="bg-gradient-to-br from-cyan-300 via-cyan-500 to-cyan-800 bg-clip-text flex items-center gap-4 p-2">
          <h1 className="text-xl md:text-2xl text-transparent">AI Labs</h1>
          <div className="h-6 w-[1px] bg-[#373737]" />
          <h2 className="text-[17px] font-extrabold font-mono uppercase tracking-wider text-transparent">
            Playground
          </h2>
        </div>
        <nav className="flex items-center gap-2">
          <Link
            href="https://github.com/sudipb7/ai-labs"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:opacity-85 transition"
          >
            <FaGithub className="h-4 w-4" />
          </Link>
          <Link
            href="https://x.com/SudipB7_"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:opacity-85 transition"
          >
            <FaXTwitter className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
};
