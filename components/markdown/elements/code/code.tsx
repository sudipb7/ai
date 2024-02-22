import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { CopyButton } from "@/components/copy-button";
import { MarkdownCodeProps } from "./code.type";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const MarkdownCode = ({ value, lang }: MarkdownCodeProps) => {
  return (
    <ScrollArea className="relative md:text-base my-0.5">
      <CopyButton content={value!} hideText className="absolute top-1 right-1" />
      {/* @ts-ignore */}
      <SyntaxHighlighter
        showLineNumbers
        language={lang || ""}
        style={oneDark}
        customStyle={{
          borderRadius: "0.3rem",
          padding: "0.6rem 0.4rem",
          fontSize: "14px",
          margin: 0,
        }}
      >
        {value}
      </SyntaxHighlighter>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
