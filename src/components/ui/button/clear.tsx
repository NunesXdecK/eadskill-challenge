import { ButtonProps } from "./types";

export const Clear: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => (
  <button
    {...props}
    className={`duration-300 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-none focus-visible:opacity-70 ${className}`}
  >
    {children}
  </button>
);
