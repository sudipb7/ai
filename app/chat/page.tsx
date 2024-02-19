"use client";

import * as React from "react";
import { useChat } from "ai/react";

import { ChatFeed } from "./_components/chat-feed";
import { ChatForm } from "./_components/chat-form";

export default function ChatPage() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col mx-auto w-full max-w-4xl">
      <ChatFeed
        formRef={formRef}
        messages={messages}
        isLoading={isLoading}
        handleChange={handleInputChange}
        textAreaRef={textAreaRef}
      />
      <ChatForm
        formRef={formRef}
        input={input}
        textAreaRef={textAreaRef}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </section>
  );
}