import { useMemo } from "react";
import { Button } from "../button";

interface PaginatorProps {
  page: number;
  perPage: number;
  maxLength: number;
  onChange: (page: number) => void;
}
export const Paginator: React.FC<PaginatorProps> = ({
  onChange,
  page = 0,
  perPage = 0,
  maxLength = 0,
}) => {
  const options = useMemo<number[]>(() => {
    const adjacent = 2;
    const maxPages = Math.round(maxLength / perPage);
    const center = [];
    for (
      let i = Math.max(1, page - adjacent);
      i <= Math.min(maxPages, page + adjacent);
      i++
    ) {
      center.push(i);
    }
    return [
      ...(page > 1 + adjacent ? [1] : []),
      ...center,
      ...(page < maxPages - adjacent ? [maxPages] : []),
    ];
  }, [page, perPage, maxLength]);
  return (
    <div className="flex gap-2">
      {options.map((currPage) => (
        <Button.Primary
          key={currPage}
          aria-current="page"
          className={currPage === page ? "bg-gray-400" : ""}
          onClick={onChange ? () => onChange(currPage) : undefined}
        >
          {currPage}
        </Button.Primary>
      ))}
    </div>
  );
};
