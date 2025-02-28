export const Default: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <span {...props} className={`text-gray-300 text-sm ${className}`}>
    {children}
  </span>
);
