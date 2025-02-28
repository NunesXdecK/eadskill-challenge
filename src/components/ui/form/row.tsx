import { Box } from "../box/box";

export const Row: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    className = "",
    ...props
  }) => <Box {...props} className={`flex gap-8 flex-col sm:flex-row ${className}`}>{children}</Box>;
  