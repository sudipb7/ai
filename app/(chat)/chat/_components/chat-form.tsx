"use client";

import * as React from "react";
import { ChatRequestOptions } from "ai";
import { Loader, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ChatFormProps {
  input: string;
  isLoading: boolean;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
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
  textAreaRef,
  handleSubmit,
  handleInputChange,
}: ChatFormProps) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    handleSubmit(e);
  };

  React.useEffect(() => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = "55px";
    let scrollHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = `${scrollHeight + 1}px`;
  }, [input, textAreaRef]);

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
    <div className="w-full bg-offwhite dark:bg-zinc-950 fixed bottom-0 inset-x-0">
      <motion.form
        initial={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 0.4 }}
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="w-full mx-auto max-w-4xl p-3 md:p-4 z-[1]"
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
            className="w-full max-h-[230px] p-4 pr-12 text-sm bg-transparent rounded-lg outline-none placeholder-muted-foreground resize-none transition"
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
      </motion.form>
    </div>
  );
};
