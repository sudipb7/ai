"use client";

import * as React from "react";
import { ChatRequestOptions } from "ai";
import { Loader, ArrowUp } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ChatFormProps {
  input: string;
  isLoading: boolean;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export const ChatForm = ({
  input,
  isLoading,
  handleSubmit,
  handleInputChange,
}: ChatFormProps) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    handleSubmit(e);
  };

  React.useEffect(() => {
    const textArea = textAreaRef.current;
    if (!textArea) return;
    textArea.style.height = "55px";
    let scrollHeight = textArea.scrollHeight;
    textArea.style.height = `${scrollHeight + 1}px`;
  }, [input]);

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        if (!formRef.current) return;
        formRef.current.requestSubmit();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full bg-offwhite dark:bg-zinc-950 fixed bottom-0 inset-x-0 border border-border">
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="w-full mx-auto max-w-4xl p-3 md:p-4 border-x border-x-border z-[1]"
      >
        <div className="relative">
          <Textarea
            rows={1}
            value={input}
            ref={textAreaRef}
            onChange={handleInputChange}
            name="prompt"
            id="prompt"
            placeholder="Ask anything..."
            className="w-full max-h-[230px] p-4 pr-12 text-sm bg-secondary dark:bg-zinc-900 rounded-lg outline-none placeholder-muted-foreground border border-border resize-none transition"
          />
          <Button
            size="icon"
            disabled={input === ""}
            type="submit"
            aria-label="Send message"
            className="h-9 w-9 absolute bottom-2 right-2 z-[2] bg-primary rounded-lg transition"
          >
            {isLoading ? (
              <Loader className="h-4 w-4 text-white animate-spin" />
            ) : (
              <ArrowUp className="h-4 w-4 text-white" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
