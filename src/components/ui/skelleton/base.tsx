export interface SkelletonProps {
  className?: string;
}

export const Base = ({ className = "", ...rest }: SkelletonProps) => (
  <div
    className={`animate-pulse rounded-sm bg-gray-800 ${className}`}
    {...rest}
  />
);
