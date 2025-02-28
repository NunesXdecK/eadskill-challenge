import { ButtonProps } from "./types";

export const Danger: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => (
  <button
    {...props}
    className={`rounded-md duration-300 bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${className}`}
  >
    {children}
  </button>
);
