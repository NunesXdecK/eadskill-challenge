export const Table: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({
  children,
  ...props
}) => (
  <div className="pr-2 pb-2 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-500">
    <table {...props} className="w-full">
      {children}
    </table>
  </div>
);
