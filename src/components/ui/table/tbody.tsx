export const TBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...props
}) => <tbody {...props}>{children}</tbody>;
