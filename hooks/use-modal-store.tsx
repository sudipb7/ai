import { create } from "zustand";

type ModalType = "feedback";

interface ModalStoreProps {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStoreProps>((set) => ({
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false, type: null }),
  type: null,
}));
