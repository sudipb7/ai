"use client";

import * as React from "react";
import { Message } from "ai";
import { ArrowUp, Loader } from "lucide-react";

import { cn } from "@/lib/utils";
import { useChatScroll } from "@/hooks/use-chat-scroll";

import { Markdown } from "@/components/markdown";
import { MotionDiv, MotionH2 } from "@/components/motion";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/ui/action-tooltip";
import { CardSpotlight } from "@/components/ui/card-spotlight";

const prompts = [
  {
    title: "Prepare a roadmap",
    subtitle: "for a software developer role.",
  },
  {
    title: "Write an email",
    subtitle: "to your boss about your project.",
  },
  {
    title: "Write a text message",
    subtitle: "asking a friend to be my plus-one at a wedding.",
  },
  {
    title: "Help me dubug",
    subtitle: "a linked list problem in C++.",
  },
];

interface ChatFeedProps {
  isLoading: boolean;
  messages: Message[];
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

export const ChatFeed = ({
  messages = [],
  isLoading,
  textAreaRef,
}: ChatFeedProps) => {
  const chatRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  const initial = { opacity: 0, translateY: 40 };
  const animate = { opacity: 1, translateY: 0 };

  const lastMessage = React.useMemo(() => {
    if (messages.length === 0) return 0;
    return messages[messages.length - 1].content.length;
  }, [messages]);

  const sendPrompt = ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }) => {
    if (!textAreaRef.current) return;
    textAreaRef.current.value = `${title} ${subtitle}`;
  };

  useChatScroll({
    isLoading,
    chatRef,
    bottomRef,
    lastMessage,
  });

  return (
    <div
      className="bg-offwhite dark:bg-zinc-950 flex flex-col w-full min-h-screen rounded-lg pt-8 px-4 pb-24"
      ref={chatRef}
    >
      {messages.length === 0 && !isLoading ? (
        <section className="w-full flex-1 flex flex-col">
          <div className="flex-1 grid place-items-center">
            <MotionH2
              initial={initial}
              animate={animate}
              className="text-center text-transparent text-2xl md:text-3xl bg-gradient-to-r from-primary via-green-700 to-primary bg-clip-text font-semibold"
            >
              Hello! How can I help you?
            </MotionH2>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 p-2 gap-3 md:gap-5">
            {prompts.map((prompt, i) => (
              <CardSpotlight
                key={i}
                hoverEffect
                initial={initial}
                animate={animate}
                transition={{ delay: i * 0.1 }}
                className="col-span-1 p-0"
              >
                <div
                  onClick={() => sendPrompt(prompt)}
                  className="cursor-pointer flex items-center justify-between p-4"
                >
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium">{prompt.title}</p>
                    <p className="text-xs font-light text-zinc-600 dark:text-zinc-400">
                      {prompt.subtitle}
                    </p>
                  </div>
                  <ActionTooltip label="Use this prompt">
                    <Button
                      size="icon"
                      variant="outline"
                      className="hidden group-hover:inline-flex rounded-xl"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  </ActionTooltip>
                </div>
              </CardSpotlight>
            ))}
          </div>
        </section>
      ) : (
        <>
          <div className="flex-1" />
          <section className="flex flex-col gap-4 w-full">
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
                        isAI
                          ? "mr-auto bg-zinc-100 dark:bg-zinc-900"
                          : "ml-auto bg-transparent"
                      )}
                    >
                      <Markdown source={message?.content} />
                      {isIncomingResponse && (
                        <Loader className="h-3 w-3 mt-1 md:mt-1.5 animate-spin" />
                      )}
                    </div>
                    {isAI && !isIncomingResponse && (
                      <CopyButton content={message?.content} />
                    )}
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
