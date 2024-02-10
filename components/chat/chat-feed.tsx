"use client";

import * as React from "react";
import { Message } from "ai";

import { BsCheck2Circle, BsClipboard2 } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";

import { useChatScroll } from "@/hooks/use-chat-scroll";

interface ChatFeedProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatFeed = ({ messages = [], isLoading }: ChatFeedProps) => {
  const chatRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = React.useState(false);

  const lastMessage = React.useMemo(() => {
    if (messages.length === 0) return 0;
    return messages[messages.length - 1].content.length;
  }, [messages]);

  const handleCopy = React.useCallback((message: string) => {
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }, []);

  useChatScroll({
    isLoading,
    chatRef,
    bottomRef,
    lastMessage,
  });

  return (
    <div
      className="flex-1 w-full p-4"
      ref={chatRef}
    >
      <div className="flex-1" />
      <div className="flex flex-col gap-4 w-full">
        {messages.length > 0 &&
          messages.map((message) => {
            const isIncomingResponse =
              isLoading &&
              message.role === "assistant" &&
              message === messages[messages.length - 1];

            return (
              <div
                key={message.id}
                className={`
                  relative w-4/5 rounded-xl space-y-1 p-3 border border-[#373737] transition-all
                  ${message.role === "user" ? "ml-auto" : "mr-auto"}
                  ${message.role === "user" ? "bg-transparent" : "bg-[#292927]"}
                `}
              >
                <p className="font-medium text-sm text-[#8F8F8F] capitalize transition-all">
                  {message.role === "user" ? "user" : "AI"}
                </p>
                <p className="text-zinc-200 text-justify tracking-wide transition-all">
                  {message.content}
                  {isIncomingResponse && (
                    <GoDotFill className="h-2 w-2 bg-white rounded-full animate-ping mt-1" />
                  )}
                </p>
                {message.role === "assistant" && (
                  <button
                    type="button"
                    aria-label="Copy message"
                    onClick={() => handleCopy(message.content)}
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
            );
          })}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
