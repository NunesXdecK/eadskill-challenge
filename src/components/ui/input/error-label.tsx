import { LabelHTMLAttributes } from "react";
import { Label } from "./label";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {}
export const Error = ({ children, className = "", ...props }: Props) => (
  <Label {...props} className={`text-red-300 ${className}`}>
    {children}
  </Label>
);
