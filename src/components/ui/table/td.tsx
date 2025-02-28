export const TD: React.FC<React.HTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <td {...props} className={`px-2 py-4 align-top ${className}`}>
    {children}
  </td>
);
