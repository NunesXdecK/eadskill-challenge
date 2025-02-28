import { Box } from "../box/box";

export const Wrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <Box {...props} className={`flex flex-col gap-4 ${className}`}>
    {children}
  </Box>
);
