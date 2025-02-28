import { InputHTMLAttributes } from "react";
import { Wrapper } from "./wrapper";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  value?: string;
}
export const Input = ({ children, className = "", ...props }: Props) => (
  <input
    {...props}
    className={`block bg-transparent min-w-0 grow py-1.5 pr-3 pl-3 text-base text-gray-300 placeholder:text-gray-200 focus:outline-none sm:text-sm/6 ${className}`}
  >
    {children}
  </input>
);

export const WithWrapperInput = ({
  children,
  className = "",
  ...props
}: Props) => (
  <Wrapper>
    <Input {...props}>{children}</Input>
  </Wrapper>
);
