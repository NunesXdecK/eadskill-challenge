import { useState } from "react";
import { Button } from "../button";
import { Icons } from "../icons";

export type ValueType = "asc" | "desc";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  initialValue?: ValueType;
  onSwitch: (value: ValueType) => void;
}

export const HeaderSwitchButton: React.FC<ButtonProps> = ({
  children,
  onSwitch,
  initialValue = "asc",
  ...props
}) => {
  const [value, setValue] = useState<ValueType>(initialValue);
  return (
    <Button.Clear
      {...props}
      className="flex gap-2"
      onClick={
        onSwitch
          ? () => {
              const finalValue = value === "asc" ? "desc" : "asc";
              onSwitch(finalValue);
              setValue(finalValue);
            }
          : undefined
      }
    >
      {children}
      {value === "asc" ? <Icons.BarsDown /> : <Icons.BarsUp />}
    </Button.Clear>
  );
};
