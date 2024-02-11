"use client";

import { useChat } from "ai/react";

import { ChatFeed } from "./chat-feed";
import { ChatForm } from "./chat-form";

export const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  return (
    <section className="h-full flex flex-col mx-auto w-full max-w-4xl border-x border-x-secondary relative">
      <ChatFeed
        messages={messages}
        isLoading={isLoading}
      />
      <ChatForm
        input={input}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </section>
  );
};
