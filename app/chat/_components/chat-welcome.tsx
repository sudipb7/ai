"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";

import { MotionH2 } from "@/components/motion";
import { ActionTooltip } from "@/components/ui/action-tooltip";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "@/components/ui/card-spotlight";

const prompts = [
  {
    title: "Write an email",
    subtitle: "to your boss about your project.",
  },
  {
    title: "Help me dubug",
    subtitle: "a linked list problem in C++.",
  },
  {
    title: "Prepare a roadmap",
    subtitle: "for a software developer role.",
  },
  {
    title: "Write a text message",
    subtitle: "asking a friend to be my plus-one at a wedding.",
  },
];

type MotionProps = { opacity: number; translateY: number };

interface ChatWelcomeProps {
  initial: MotionProps;
  animate: MotionProps;
  formRef: React.RefObject<HTMLFormElement>;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export const ChatWelcome = ({
  initial,
  animate,
  formRef,
  handleChange,
  textAreaRef,
}: ChatWelcomeProps) => {
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

  const sendPrompt = React.useCallback(
    ({ title, subtitle }: (typeof prompts)[0]) => {
      if (!textAreaRef.current) return;
      const textArea = textAreaRef.current;
      textArea.value = `${title} ${subtitle}`;
      handleChange({ target: { value: textArea.value } } as any);
      setTimeout(() => formRef.current?.requestSubmit(), 0);
    },
    [formRef, handleChange, textAreaRef],
  );

  React.useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full flex-1 flex flex-col">
      <div className="flex-1 grid place-items-center">
        <MotionH2
          initial={initial}
          animate={animate}
          className="primary_gradient text-center text-2xl md:text-3xl font-semibold"
        >
          Hello! How can I help you?
        </MotionH2>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 p-2 gap-3 md:gap-5">
        {prompts.map((prompt, i) => {
          if (windowSize < 768 && i > 1) return null;

          return (
            <CardSpotlight
              key={i}
              hoverEffect
              initial={initial}
              animate={animate}
              transition={{ delay: i * 0.1 }}
              className="col-span-1 p-0 bg-transparent"
            >
              <div
                onClick={() => sendPrompt(prompt)}
                className="cursor-pointer flex items-center justify-between p-4"
              >
                <div className="space-y-1.5">
                  <p className="text-sm font-medium">{prompt.title}</p>
                  <p className="text-xs font-light text-zinc-400">{prompt.subtitle}</p>
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
          );
        })}
      </div>
    </section>
  );
};
