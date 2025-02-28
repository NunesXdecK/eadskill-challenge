import { AlertType } from "@/contexts/alert-context";
import { ReactNode } from "react";
import { Text } from "../text";
import { Box } from "../box/box";

interface Props {
  type: AlertType;
  message: string | ReactNode;
}

export const Alert = ({ type, message }: Props) => {
  const className = {
    error: {
      title: "Error",
      className: "bg-red-50",
      classNameText: "text-red-700",
      classNameTitle: "text-red-800",
    },
    success: {
      title: "Sucesso",
      className: "bg-green-50",
      classNameText: "text-green-700",
      classNameTitle: "text-green-800",
    },
  };
  return (
    <Box data-testid="alert-test" className={`z-20 min-w-[200px] fixed bottom-0 right-0 p-4 m-4 rounded-md ${className[type].className}`}>
      <Text.Default
        className={`text-lg font-medium ${className[type].classNameTitle}`}
      >
        {className[type].title}
      </Text.Default><br/>
      <Text.Default
        className={`text-xs font-normal ${className[type].classNameText}`}
      >
        {message}
      </Text.Default>
    </Box>
  );
};
