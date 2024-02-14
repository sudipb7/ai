"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";

interface CopyButtonProps extends React.ComponentPropsWithRef<"button"> {
  content: string;
  hideText?: boolean;
}

export const CopyButton = ({
  content,
  hideText = false,
  className,
  ...props
}: CopyButtonProps) => {
  const { isCopied, copyToClipboard } = useCopy();

  const handleCopy = () => {
    if (isCopied) return;
    copyToClipboard(content);
  };

  return (
    <button
      {...props}
      onClick={handleCopy}
      className={cn(
        "cursor-pointer p-1.5 flex items-center text-muted-foreground w-fit transition",
        className
      )}
    >
      {isCopied ? (
        <Check className="h-3 md:h-4 w-3 md:w-4" />
      ) : (
        <Copy className="h-3 md:h-4 w-3 md:w-4" />
      )}
      {!hideText && <span className="text-xs md:text-sm ml-1.5">Copy</span>}
    </button>
  );
};
