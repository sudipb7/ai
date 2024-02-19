import * as React from "react";

interface useChatScrollProps {
  lastMessage: number;
  isLoading: boolean;
  chatRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
}

export function useChatScroll({ isLoading, chatRef, bottomRef, lastMessage }: useChatScrollProps) {
  React.useEffect(() => {
    const shouldAutoScroll = () => {
      const topDiv = chatRef?.current;

      if (!topDiv) return false;

      const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;

      return distanceFromBottom <= 100 && isLoading;
    };

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [bottomRef, chatRef, isLoading, lastMessage]);
}
