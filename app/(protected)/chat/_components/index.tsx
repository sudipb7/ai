"use client";

import * as React from "react";
import { useChat } from "ai/react";

import { ChatFeed } from "./chat-feed";
import { ChatForm } from "./chat-form";
import { ChatWelcome } from "./chat-welcome";

export default function Chat() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <main className="min-h-[calc(100dvh-4rem)] flex flex-col mx-auto w-full max-w-4xl">
      {messages.length === 0 && !isLoading ? (
        <ChatWelcome formRef={formRef} textAreaRef={textAreaRef} handleChange={handleInputChange} />
      ) : (
        <ChatFeed messages={messages} isLoading={isLoading} />
      )}
      <ChatForm
        formRef={formRef}
        input={input}
        textAreaRef={textAreaRef}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </main>
  );
}
