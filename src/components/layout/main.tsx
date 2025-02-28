import { ContentWrapper } from "./content-wrapper";

export const Main: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => (
  <main {...props} className="h-screen flex justify-center items-center">
    <ContentWrapper className="w-full max-w-[1280px] max-h-[80vh] py-10 px-8 flex flex-col gap-8">
      {children}
    </ContentWrapper>
  </main>
);
