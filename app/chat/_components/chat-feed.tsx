"use client";

import * as React from "react";
import { Message } from "ai";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";
import { useChatScroll } from "@/hooks/use-chat-scroll";

import { Markdown } from "@/components/markdown";
import { MotionDiv } from "@/components/motion";
import { CopyButton } from "@/components/copy-button";
import { ChatWelcome } from "./chat-welcome";

interface ChatFeedProps {
  isLoading: boolean;
  messages: Message[];
  formRef: React.RefObject<HTMLFormElement>;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export const ChatFeed = ({
  messages = [],
  isLoading,
  formRef,
  textAreaRef,
  handleChange,
}: ChatFeedProps) => {
  const chatRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  const initial = { opacity: 0, translateY: 40 };
  const animate = { opacity: 1, translateY: 0 };

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
      className={cn(
        "flex flex-col w-full min-h-[calc(100vh-4rem)] h-max rounded-lg px-4 pt-16",
        messages.length === 0 ? "pb-10" : "pb-20",
      )}
      ref={chatRef}
    >
      {messages.length === 0 && !isLoading ? (
        <ChatWelcome
          initial={initial}
          animate={animate}
          formRef={formRef}
          textAreaRef={textAreaRef}
          handleChange={handleChange}
        />
      ) : (
        <>
          <section className="flex flex-col gap-4 w-full p-2">
            {messages.length > 0 &&
              messages.map((message) => {
                const isAI = message.role === "assistant";
                const isIncomingResponse =
                  isLoading &&
                  message.role === "assistant" &&
                  message === messages[messages.length - 1];

                return (
                  <MotionDiv
                    key={message.id}
                    initial={initial}
                    animate={animate}
                    className="w-full space-y-1"
                  >
                    <div
                      className={cn(
                        "relative w-max max-w-[95%] md:max-w-[85%] border border-secondary rounded-lg p-3 transition-all",
                        isAI ? "mr-auto bg-zinc-900" : "ml-auto bg-transparent",
                      )}
                    >
                      <Markdown source={message?.content} />
                      {isIncomingResponse && (
                        <Loader className="h-3.5 w-3.5 mt-1 md:mt-1.5 animate-spin" />
                      )}
                    </div>
                    {isAI && !isIncomingResponse && <CopyButton content={message?.content} />}
                  </MotionDiv>
                );
              })}
          </section>
          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
};
