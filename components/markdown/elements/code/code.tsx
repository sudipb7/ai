"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";

import { CopyButton } from "@/components/copy-button";
import { MarkdownCodeProps } from "./code.type";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const MarkdownCode = ({ value, lang }: MarkdownCodeProps) => {
  const { theme } = useTheme();

  return (
    <ScrollArea className="relative text-sm md:text-base my-0.5">
      <CopyButton
        content={value!}
        hideText
        className="absolute top-1 right-1"
      />
      {/* @ts-ignore */}
      <SyntaxHighlighter
        showLineNumbers
        language={lang || ""}
        style={theme === "dark" ? oneDark : oneLight}
        customStyle={{
          borderRadius: "0.3rem",
          padding: "0.6rem 0.4rem",
          margin: 0,
        }}
      >
        {value}
      </SyntaxHighlighter>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
