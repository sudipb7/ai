"use client";

import * as React from "react";
import { useChat } from "ai/react";

import { ChatFeed } from "./_components/chat-feed";
import { ChatForm } from "./_components/chat-form";

export default function ChatPage() {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  return (
    <section className="min-h-full flex flex-col mx-auto w-full max-w-4xl">
      <ChatFeed
        messages={messages}
        isLoading={isLoading}
        textAreaRef={textAreaRef}
      />
      <ChatForm
        input={input}
        textAreaRef={textAreaRef}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </section>
  );
}
