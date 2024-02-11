"use client";

import * as React from "react";
import { Message } from "ai";

import { GoDotFill } from "react-icons/go";
import { Check, Copy } from "lucide-react";

import { useChatScroll } from "@/hooks/use-chat-scroll";
import { cn } from "@/lib/utils";

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
      className="flex flex-col flex-1 w-full px-4 pt-20 pb-28 bg-offwhite dark:bg-card"
      ref={chatRef}
    >
      <div className="flex-1" />
      <div className="flex flex-col gap-4 w-full">
        {messages.length > 0 &&
          messages.map((message) => {
            const isAI = message.role === "assistant";
            const isIncomingResponse =
              isLoading &&
              message.role === "assistant" &&
              message === messages[messages.length - 1];

            return (
              <div
                key={message.id}
                className={cn(
                  "relative max-w-[90%] md:max-w-[80%] rounded-lg p-3 transition-all",
                  isAI ? "mr-auto" : "ml-auto",
                  isAI
                    ? "bg-gradient-to-br from-muted via-secondary to-background dark:to-card border border-secondary"
                    : "bg-gradient-to-br from-primary via-green-600 to-green-800"
                )}
              >
                <p
                  className={cn(
                    "text-sm md:text-base text-justify tracking-wide transition-all",
                    isAI ? "dark:text-zinc-200" : "text-white"
                  )}
                >
                  {message.content}
                  {isIncomingResponse && (
                    <GoDotFill className="h-1 w-1 bg-white rounded-full animate-ping mt-1" />
                  )}
                </p>
                {isAI && (
                  <button
                    type="button"
                    aria-label="Copy message"
                    onClick={() => handleCopy(message.content)}
                    className="absolute bottom-0 -right-8 bg-transparent outline-none border-none w-fit p-2"
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4 text-cyan-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-[#8F8F8F]" />
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
