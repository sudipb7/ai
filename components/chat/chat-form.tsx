import { ChatRequestOptions } from "ai";

import { Loader, ArrowUp } from "lucide-react";

interface ChatFormProps {
  input: string;
  isLoading: boolean;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export const ChatForm = ({
  input,
  isLoading,
  handleSubmit,
  handleInputChange,
}: ChatFormProps) => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    handleSubmit(e);
  };

  return (
    <div className="w-full bg-offwhite dark:bg-card fixed bottom-0 inset-x-0 border border-border border-collapse">
      <form
        onSubmit={handleFormSubmit}
        className="w-full mx-auto max-w-4xl p-4 border-t border-border z-[1]"
      >
        <div className="relative">
          <input
            value={input}
            onChange={handleInputChange}
            type="text"
            name="prompt"
            id="prompt"
            autoComplete="off"
            placeholder="Ask anything..."
            className="w-full p-4 pl-5 pr-16 bg-gradient-to-b from-muted via-secondary to-background dark:to-card rounded-full outline-none placeholder-muted-foreground border border-border focus:ring-offset-0 focus:ring-1 focus:ring-ring transition"
          />
          <button
            disabled={input === ""}
            type="submit"
            aria-label="Send message"
            className="p-2 rounded-full outline-none border border-transparent ring-1 ring-offset-0 ring-ring disabled:ring-0 disabled:border-border disabled:opacity-50 absolute bottom-2.5 right-3 z-[2] transition"
          >
            {isLoading ? (
              <Loader className="h-5 w-5 text-primary animate-spin" />
            ) : (
              <ArrowUp className="h-5 w-5 text-primary" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
