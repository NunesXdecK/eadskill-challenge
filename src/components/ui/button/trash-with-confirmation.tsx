"use client";
import { withLeftModal } from "@/components/hoc/withLeftModal";
import { Box } from "../box/box";
import { Icons } from "../icons";
import { Text } from "../text";
import { Clear } from "./clear";
import { Danger } from "./danger";

interface ButtonWithOnOpen {
  onOpen?: () => void;
}

interface ModalWithOnClose {
  disabled?: boolean;
  onClose?: () => void;
  onConfirm?: (onClose: () => void) => void;
}

const TrashButton = ({ onOpen }: ButtonWithOnOpen) => (
  <Danger onClick={onOpen ? () => onOpen() : undefined}>
    <Icons.Trash />
  </Danger>
);

const ModalBody = ({
  disabled,
  onConfirm,
  onClose,
  ...rest
}: ModalWithOnClose) => (
  <Box className="flex flex-col">
    <Text.Paragraph className="text-left">
      Tem certeza que deseja prosseguir?
    </Text.Paragraph>
    <Box className="flex justify-between mt-4 gap-8">
      <Clear
        disabled={disabled}
        onClick={onClose ? () => onClose() : undefined}
      >
        Cancelar
      </Clear>
      <Danger
        disabled={disabled}
        onClick={onConfirm && onClose ? () => onConfirm(onClose) : undefined}
      >
        Confirmar
      </Danger>
    </Box>
  </Box>
);

export const TrashConfirm = withLeftModal(TrashButton, ModalBody);
