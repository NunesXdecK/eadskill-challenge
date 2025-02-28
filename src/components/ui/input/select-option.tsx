import { OptionHTMLAttributes } from "react";

interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
  value?: string;
}

export const SelectOption = ({ children, ...props }: OptionProps) => (
  <option {...props} className="text-gray-200 bg-[--background]">
    {children}
  </option>
);
