import { Base, SkelletonProps } from "./base";

export const Text = ({ className = "", ...rest }: SkelletonProps) => (
  <Base className={`h-4 ${className}`} {...rest} />
);
