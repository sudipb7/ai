import * as React from "react";
import { Message } from "ai";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Markdown } from "@/components/markdown";
import { CopyButton } from "../copy-button";

const chatItemVariants = cva(
  "relative max-w-[95%] md:max-w-[85%] rounded-lg p-3 transition-all",
  {
    variants: {
      isAI: {
        true: "mr-auto bg-gradient-to-br from-muted via-secondary to-background dark:to-card border border-secondary",
        false:
          "ml-auto bg-gradient-to-br from-primary via-green-600 to-green-800",
      },
    },
    defaultVariants: {
      isAI: false,
    },
  }
);

interface ChatItemProps
  extends React.ComponentPropsWithRef<"div">,
    VariantProps<typeof chatItemVariants> {
  message: Message;
  isAI: boolean;
  isIncomingResponse: boolean;
}

const ChatItem = React.forwardRef<HTMLDivElement, ChatItemProps>(
  ({ className, message, isAI, isIncomingResponse, ...props }, ref) => {
    return (
      <>
        {!isIncomingResponse ? (
          <div
            className={cn(chatItemVariants({ isAI, className }))}
            ref={ref}
            {...props}
          >
            {!isAI ? (
              <p className="text-sm md:text-base text-justify text-white tracking-wide transition-all">
                {message?.content}
              </p>
            ) : (
              <Markdown source={message?.content} />
            )}
          </div>
        ) : (
          <div className={cn(chatItemVariants({ isAI }))}>
            <p className="text-sm md:text-base font-medium">
              Response is being generated...
            </p>
          </div>
        )}
        {isAI && !isIncomingResponse && (
          <CopyButton
            className="-mt-2.5"
            content={message?.content}
          />
        )}
      </>
    );
  }
);

ChatItem.displayName = "ChatItem";

export { ChatItem, chatItemVariants };
