import { TextareaHTMLAttributes } from "react";
import { Wrapper } from "./wrapper";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
}

export const Textarea = ({ children, className = "", ...props }: Props) => (
  <textarea
    {...props}
    className={`block bg-transparent min-w-0 grow py-1.5 pr-3 pl-3 text-base text-gray-300 placeholder:text-gray-200 focus:outline-none sm:text-sm/6 ${className}`}
  >
    {children}
  </textarea>
);

export const WithWrapperTextarea = ({
  children,
  className = "",
  ...props
}: Props) => (
  <Wrapper>
    <Textarea {...props}>{children}</Textarea>
  </Wrapper>
);
