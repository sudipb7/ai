import { cn } from "@/lib/utils";
import { MarkdownHeadingProps } from "./heading.type";

export const MarkdownHeading = ({
  depth,
  text,
  className = "",
}: MarkdownHeadingProps) => {
  const initialStyles = "relative font-medium text-foreground m-0.5";

  if (depth === 1) {
    return (
      <h2
        className={cn(
          initialStyles,
          "m-1 text-2xl font-semibold tracking-tight",
          className
        )}
      >
        {text}
      </h2>
    );
  }

  if (depth === 2) {
    return (
      <h3
        className={cn(
          initialStyles,
          "text-xl font-semibold tracking-tight",
          className
        )}
      >
        {text}
      </h3>
    );
  }

  return <h4 className={cn(initialStyles, className)}>{text}</h4>;
};
