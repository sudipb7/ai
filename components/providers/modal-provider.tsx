"use client";

import { useEffect, useState } from "react";

import { FeedbackModal } from "@/components/modals/feedback-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <FeedbackModal />
    </>
  );
};
