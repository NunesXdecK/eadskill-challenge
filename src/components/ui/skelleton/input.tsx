import { Base, SkelletonProps } from "./base";

export const Input = ({ className = "", ...rest }: SkelletonProps) => (
  <Base className={`h-6 ${className}`} {...rest} />
);
