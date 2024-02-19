import Image from "next/image";
import { ArrowUp } from "lucide-react";

import { MotionDiv } from "@/components/motion";
import { ActionTooltip } from "@/components/ui/action-tooltip";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "@/components/ui/card-spotlight";

const prompts = [
  {
    title: "Help me dubug",
    subtitle: "a linked list problem in C++.",
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
  const sendPrompt = ({ title, subtitle }: (typeof prompts)[0]) => {
    if (!textAreaRef.current) return;
    const textArea = textAreaRef.current;
    textArea.value = `${title} ${subtitle}`;
    handleChange({ target: { value: textArea.value } } as any);
    setTimeout(() => formRef.current?.requestSubmit(), 0);
  };

  return (
    <section className="w-full flex-1 flex flex-col">
      <MotionDiv
        initial={initial}
        animate={animate}
        className="flex-1 flex flex-col items-center justify-center"
      >
        <Image src="/logo.svg" alt="AI logo" width={130} height={130} />
        <h2 className="primary_gradient text-center text-2xl md:text-3xl font-semibold">
          How can I help you today?
        </h2>
      </MotionDiv>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 p-2 gap-3 md:gap-5">
        {prompts.map((prompt, i) => (
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
        ))}
      </div>
    </section>
  );
};
