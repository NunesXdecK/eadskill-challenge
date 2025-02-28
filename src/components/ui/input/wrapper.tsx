import { HTMLAttributes } from "react";
import { Box } from "../box/box";

export const Wrapper = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <Box
    {...props}
    className={`duration-200 flex items-center rounded-md bg-transparent border border-gray-200 has-[input:focus-within]:border-indigo-500 has-[select:focus-within]:border-indigo-500 ${className}`}
  >
    {children}
  </Box>
);
