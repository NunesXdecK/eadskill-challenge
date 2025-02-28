import { LabelHTMLAttributes } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {}
export const Label = ({ children, className = "", ...props }: Props) => (
  <label
    {...props}
    className={`block text-sm/6 font-medium text-gray-200 ${className}`}
  >
    {children}
  </label>
);
