export const Paragraph: React.FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({ children, className = "", ...props }) => (
  <span {...props} className={`text-gray-300 text-sm ${className}`}>
    {children}
  </span>
);
