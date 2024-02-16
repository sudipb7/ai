"use client";

import "highlight.js/styles/panda-syntax-dark.css";

import hljs from "highlight.js";
import { useEffect } from "react";

import { cn } from "@/lib/utils";
import { MarkdownCodeProps } from "./code.type";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CopyButton } from "@/components/copy-button";

export const MarkdownCode = ({ value, lang }: MarkdownCodeProps) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const styles = cn("", {
    [`language-${lang || ""}`]: lang,
  });

  return (
    <ScrollArea className="whitespace-nowrap relative group">
      <CopyButton
        content={value!}
        hideText
        className="absolute top-1 right-1"
      />
      <pre>
        <code className={cn(styles, "text-sm md:text-base")}>{value}</code>
      </pre>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
