import { HTMLAttributes } from "react";
import { Box } from "../box/box";
import { ContentWrapper } from "@/components/layout/content-wrapper";

export const Wrapper = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <Box
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    className={`relative z-10 ${className}`}
    {...props}
  >
    <Box
      className="fixed inset-0 bg-gray-800/75 transition-opacity"
      aria-hidden="true"
    ></Box>

    <Box className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <Box className="flex min-h-full items-center justify-center p-4 text-center">
        <Box className="relative transform overflow-hidden transition-all w-full max-w-[1280px]">
          <ContentWrapper className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {children}
          </ContentWrapper>
        </Box>
      </Box>
    </Box>
  </Box>
);
