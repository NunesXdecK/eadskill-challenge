export const TH: React.FC<React.HTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <th {...props} className={`text-left px-2 py-4 align-top ${className}`}>
    {children}
  </th>
);
