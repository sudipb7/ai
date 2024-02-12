"use client";

import "highlight.js/styles/atom-one-dark.css";

import hljs from "highlight.js";
import { useEffect } from "react";

import { cn } from "@/lib/utils";
import { MarkdownCodeProps } from "./code.type";

export const MarkdownCode = ({ value, lang }: MarkdownCodeProps) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const styles = cn("rounded-lg", {
    [`language-${lang || ""}`]: lang,
  });

  return (
    <pre>
      <code className={cn(styles, "whitespace-pre-wrap text-sm my-2 p-2")}>{value}</code>
    </pre>
  );
};
