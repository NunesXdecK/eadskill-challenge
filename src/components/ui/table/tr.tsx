export const TR: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <tr {...props} className={`border-b border-gray-200 ${className}`}>
    {children}
  </tr>
);
