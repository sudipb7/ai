"use client";

import * as React from "react";
import { useChat } from "ai/react";

import { FaArrowUp } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";
import {
  BsClipboard2,
  BsCheck2Circle,
} from "react-icons/bs";

export default function Home() {
  const [isCopied, setIsCopied] = React.useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  const handleCopy = React.useCallback((message: string) => {
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }, []);

  return (
    <div className="h-full flex flex-col mx-auto w-full max-w-4xl border-x border-x-[#373737]">
      <div className="flex-1 w-full flex flex-col gap-4 p-4">
        <div className="flex-1" />
        {messages.map((m) => (
          <div
            key={m.id}
            className={`
              relative w-4/5 rounded-xl space-y-1 p-3 border border-[#373737] transition-all
              ${m.role === "user" ? "ml-auto" : "mr-auto"}
              ${m.role === "user" ? "bg-transparent" : "bg-[#292927]"}
            `}
          >
            <p className="font-medium text-sm text-[#8F8F8F] capitalize transition-all">
              {m.role === "user" ? "user" : "AI"}
            </p>
            <p className="text-zinc-200 text-wrap tracking-wide transition-all">
              {m.content}
            </p>
            {m.role === "assistant" && (
              <button
                type="button"
                aria-label="Copy message"
                onClick={() => handleCopy(m.content)}
                className="absolute bottom-0 -right-8 bg-transparent outline-none border-none w-fit p-2"
              >
                {isCopied ? (
                  <BsCheck2Circle className="h-4 w-4 text-cyan-500" />
                ) : (
                  <BsClipboard2 className="h-4 w-4 text-[#8F8F8F]" />
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative p-3 border-t border-[#373737] "
      >
        <input
          value={input}
          onChange={handleInputChange}
          type="text"
          name="prompt"
          id="prompt"
          autoComplete="off"
          placeholder="Say something..."
          className="w-full p-4 pr-12 bg-transparent text-zinc-200 rounded-full outline-none border border-[#373737] disabled:opacity-70 focus:border-transparent focus:ring-offset-0 focus:ring-1 focus:ring-cyan-500 transition"
        />
        <button
          disabled={input === ""}
          type="submit"
          aria-label="Send message"
          className="p-2 rounded-full outline-none border border-cyan-500 disabled:border-[#373737] disabled:cursor-not-allowed disabled:opacity-50 absolute top-[21.5px] right-[20px] peer bg-[#1F1F1D] z-10 transition"
        >
          {isLoading ? (
            <FiLoader className="h-5 w-5 text-cyan-500 animate-spin" />
          ) : (
            <FaArrowUp className="h-5 w-5 text-cyan-500" />
          )}
        </button>
      </form>
    </div>
  );
}
