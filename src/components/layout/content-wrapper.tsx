import { Box } from "../ui/box/box";

export const ContentWrapper: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <Box
    {...props}
    className={`rounded-md border border-gray-100 bg-[--background] ${className}`}
  >
    {children}
  </Box>
);
