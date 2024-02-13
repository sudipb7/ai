// @ts-ignore
import type { Content } from "mdast-util-from-markdown/lib";

export type MarkdownElementProps = {
  element: Content;
  parent?: Content | null;
};
