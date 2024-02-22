import { cn } from "@/lib/utils";
import { MarkdownHeadingProps } from "./heading.type";

export const MarkdownHeading = ({ depth, text, className = "" }: MarkdownHeadingProps) => {
  const initialStyles = "relative font-medium text-foreground m-0.5";

  if (depth === 1) {
    return (
      <h1 className={cn(initialStyles, "text-3xl md:text-4xl font-bold", className)}>{text}</h1>
    );
  }

  if (depth === 2) {
    return (
      <h2 className={cn(initialStyles, "text-2xl md:text-3xl font-semibold", className)}>{text}</h2>
    );
  }

  if (depth === 3) {
    return (
      <h3 className={cn(initialStyles, "text-xl md:text-2xl font-semibold", className)}>{text}</h3>
    );
  }

  if (depth === 4) {
    return (
      <h4 className={cn(initialStyles, "text-lg md:text-xl font-medium", className)}>{text}</h4>
    );
  }

  return <h5 className={cn(initialStyles, className)}>{text}</h5>;
};
