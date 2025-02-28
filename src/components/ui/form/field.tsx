import { Box } from "../box/box";

export const Field: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    className = "",
    ...props
  }) => <Box {...props} className={`flex-1 text-left flex flex-col gap-2 ${className}`}>{children}</Box>;
  