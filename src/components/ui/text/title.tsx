export const Title: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <h1 {...props} className={`text-white text-xl font-semibold ${className}`}>
    {children}
  </h1>
);
