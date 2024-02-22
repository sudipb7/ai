"use client";

import * as React from "react";
import { ChatRequestOptions } from "ai";
import { Loader, ArrowUp } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ChatFormProps {
  input: string;
  isLoading: boolean;
  formRef: React.RefObject<HTMLFormElement>;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined,
  ) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export const ChatForm = ({
  input,
  formRef,
  isLoading,
  textAreaRef,
  handleSubmit,
  handleInputChange,
}: ChatFormProps) => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "55px";
    }
    handleSubmit(e);
  };

  React.useEffect(() => {
    const textArea = textAreaRef.current;
    if (!textArea) return;
    textArea.style.height = "55px";
    let scrollHeight = textArea.scrollHeight;
    textArea.style.height = `${scrollHeight + 1}px`;
    // eslint-disable-next-line
  }, [textAreaRef.current?.value]);

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!e.shiftKey && e.key === "Enter") {
        if (!formRef.current) return;
        formRef.current.requestSubmit();
        e.preventDefault();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [formRef]);

  return (
    <section className="animate_in bg-zinc-950 fixed bottom-0 inset-x-0">
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="mx-auto max-w-4xl w-full p-3 md:p-4"
      >
        <div className="relative w-full">
          <Textarea
            rows={1}
            value={input}
            ref={textAreaRef}
            onChange={handleInputChange}
            name="prompt"
            id="prompt"
            placeholder="Ask anything..."
            className="w-full max-h-[230px] p-4 pr-12 text-sm bg-transparent rounded-xl outline-none placeholder-muted resize-none focus-visible:ring-0 transition"
          />
          <Button
            size="icon"
            disabled={input === ""}
            type="submit"
            aria-label="Send message"
            className="h-9 w-9 absolute bottom-2 right-2 transition"
          >
            {isLoading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};
