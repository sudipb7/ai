"use client";

import * as React from "react";
import { Message } from "ai";

import { useChatScroll } from "@/hooks/use-chat-scroll";
import { ChatItem } from "./chat-item";

interface ChatFeedProps {
  messages: Message[];
  isLoading: boolean;
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
    <div
      className="bg-offwhite dark:bg-card flex flex-col w-full min-h-screen px-4 pt-20 pb-28"
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
              <ChatItem
                key={message.id}
                message={message}
                isAI={isAI}
                isIncomingResponse={isIncomingResponse}
              />
            );
          })}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
