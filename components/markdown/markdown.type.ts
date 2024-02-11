import * as React from "react";

export type MarkdownProps = React.ComponentPropsWithoutRef<"div"> & {
  source: string;
};
