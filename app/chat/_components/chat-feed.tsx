"use client";

import * as React from "react";
import { Message } from "ai";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";
import { useChatScroll } from "@/hooks/use-chat-scroll";

import { Markdown } from "@/components/markdown";
import { CopyButton } from "@/components/copy-button";

interface ChatFeedProps {
  isLoading: boolean;
  messages: Message[];
}

export const ChatFeed = ({ messages = [], isLoading }: ChatFeedProps) => {
  const chatRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  const lastMessage = React.useMemo(() => {
    if (messages.length === 0) return 0;
    return messages[messages.length - 1].content.length;
  }, [messages]);

  useChatScroll({
    isLoading,
    chatRef,
    bottomRef,
    lastMessage,
  });

  return (
    <div className="animate_in flex flex-col h-max w-full rounded-lg px-4 pb-20" ref={chatRef}>
      <section className="flex flex-col w-full gap-4 p-2">
        {messages.length > 0 &&
          messages.map((message) => {
            const isAI = message.role === "assistant";
            const isIncomingResponse =
              isLoading &&
              message.role === "assistant" &&
              message === messages[messages.length - 1];

            return (
              <React.Fragment key={message.id}>
                <div
                  className={cn(
                    "relative max-w-[95%] md:max-w-[85%] border border-secondary rounded-lg p-3 transition-all",
                    isAI ? "mr-auto bg-zinc-900" : "ml-auto bg-transparent",
                  )}
                >
                  <Markdown source={message?.content} />
                  {isIncomingResponse && (
                    <Loader className="h-3.5 w-3.5 mt-1 md:mt-1.5 animate-spin" />
                  )}
                </div>
                {isAI && !isIncomingResponse && (
                  <CopyButton className="-mt-2" content={message?.content} />
                )}
              </React.Fragment>
            );
          })}
      </section>
      <div ref={bottomRef} />
    </div>
  );
};
