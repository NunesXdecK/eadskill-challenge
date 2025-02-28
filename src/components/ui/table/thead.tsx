export const THead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...props
}) => <thead {...props}>{children}</thead>;
