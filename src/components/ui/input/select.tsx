import { SelectHTMLAttributes } from "react";
import { Wrapper } from "./wrapper";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  value?: string;
}

export const Select = ({ children, className = "", ...props }: Props) => (
  <select
    {...props}
    className={`duration-200 bg-transparent col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-200 placeholder:text-gray-400 outline-none focus:outline-none sm:text-sm/6 ${className}`}
  >
    {children}
  </select>
);

export const WithWrapperSelect = ({
  children,
  className = "",
  ...props
}: Props) => (
  <Wrapper>
    <Select {...props}>{children}</Select>
  </Wrapper>
);
