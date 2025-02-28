import { HTMLAttributes } from "react";
import { Box } from "../box/box";

export const SelectWrapper = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <Box
    {...props}
    className={`grid shrink-0 grid-cols-1 focus-within:relative ${className}`}
  >
    {children}
  </Box>
);
