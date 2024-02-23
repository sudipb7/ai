import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Modal = ({
  isOpen,
  handleClose,
  title,
  description,
  footer,
  children,
  className,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={cn("", className)}>
        <DialogHeader>
          <DialogTitle className="text-2xl tracking-wide primary_gradient">{title}</DialogTitle>
          {description && (
            <DialogDescription className="max-sm:text-xs font-medium tracking-wide mt-2">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
        {footer && <DialogFooter className="mt-3">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
