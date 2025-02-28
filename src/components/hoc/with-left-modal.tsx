"use client";
import { useState } from "react";
import { ContentWrapper } from "../layout/content-wrapper";

interface ComponentProps {
  disabled?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onConfirm?: (onClose: () => void) => void;
}

export const withLeftModal = (
  WrappedComponent: React.ComponentType<ComponentProps>,
  ModalBody: React.ComponentType<ComponentProps>
) => {
  return ({ onConfirm }: ComponentProps) => {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
        onClose();
      }
    };

    return (
      <div className="relative w-auto" onBlur={handleBlur} tabIndex={-1}>
        <WrappedComponent disabled={loading} onOpen={onOpen} />

        {isOpen && (
          <ContentWrapper className="absolute z-10 py-6 px-4 right-[120%] top-[0%]">
            <ModalBody
              disabled={loading}
              onClose={onClose}
              onConfirm={
                onConfirm
                  ? async () => {
                      setLoading(true);
                      await onConfirm(onClose);
                      setLoading(false);
                    }
                  : undefined
              }
            />
          </ContentWrapper>
        )}
      </div>
    );
  };
};
