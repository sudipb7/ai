import { fromMarkdown } from "mdast-util-from-markdown";

import { MarkdownProps } from "./markdown.type";
import { MarkdownElement } from "./markdown-element";

export const Markdown = ({ source, ...props }: MarkdownProps) => {
  const markdownTree = fromMarkdown(source).children;

  return (
    <div {...props} className="space-y-2.5">
      {markdownTree.map((node, index) => (
        <MarkdownElement key={index} element={node} />
      ))}
    </div>
  );
};
