import { ChatRequestOptions } from "ai";

import { FiLoader } from "react-icons/fi";
import { FaArrowUp } from "react-icons/fa6";

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
    <div className="w-full sticky bottom-0 inset-x-0">
      <form
        onSubmit={handleFormSubmit}
        className="relative p-3 border-t border-[#373737] bg-[#1F1F1D] z-[1]"
      >
        <input
          value={input}
          onChange={handleInputChange}
          type="text"
          name="prompt"
          id="prompt"
          autoComplete="off"
          placeholder="Say something..."
          className="w-full p-4 pr-12 bg-transparent text-zinc-200 rounded-full outline-none border border-[#373737] focus:border-transparent focus:ring-offset-0 focus:ring-1 focus:ring-cyan-500 transition"
        />
        <button
          disabled={input === "" || isLoading}
          type="submit"
          aria-label="Send message"
          className="p-2 rounded-full outline-none border border-cyan-500 disabled:border-[#373737] disabled:cursor-not-allowed disabled:opacity-50 absolute top-[21.5px] right-[20px] peer bg-[#1F1F1D] z-[2] transition"
        >
          {isLoading ? (
            <FiLoader className="h-5 w-5 text-cyan-500 animate-spin" />
          ) : (
            <FaArrowUp className="h-5 w-5 text-cyan-500" />
          )}
        </button>
      </form>
    </div>
  );
};
