"use client";
import { ReactNode, useState } from "react";
import { Modal } from "../ui/modal";

interface ComponentProps {
  id?: string;
  children?: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

export const withModal = (
  WrappedComponent: React.ComponentType<ComponentProps>,
  ModalBody: React.ComponentType<ComponentProps>
) => {
  return ({ id, children }: ComponentProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
      <div className="relative w-auto" tabIndex={-1}>
        <WrappedComponent onOpen={onOpen}>{children}</WrappedComponent>

        {isOpen && (
          <Modal.Wrapper>
            <ModalBody id={id} onClose={onClose} />
          </Modal.Wrapper>
        )}
      </div>
    );
  };
};
