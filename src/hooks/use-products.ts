import { useEffect, useMemo, useState } from "react";
import { Product } from "@/core/domain/interfaces/product.interface";
import { ValueType } from "@/components/ui/table/header-switch-button";
import { ProductFilter } from "@/core/domain/interfaces/product-filter.interface";
import FindManyProductUseCaseFactory from "@/core/factories/product/find-many-product-usecase.factory";

interface Result {
  data: Product[];
  loading: boolean;
  maxLength: number;
  filter: ProductFilter;
  refresh: () => void;
  onCategoryChange: (value: string) => void;
  onValueOrderChange: (value: ValueType) => void;
  onChangeFilter: (key: string, value: string | number) => void;
}

export const useProducts = (): Result => {
  const [filter, setFilter] = useState<ProductFilter>({
    page: 1,
    perPage: 5,
    valueOrder: "desc",
  });
  const [refresh, setRefresh] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Product[]>([]);

  const filteredData = useMemo(() => {
    return data.sort((first, second) =>
      filter.valueOrder === "asc"
        ? second.price - first.price
        : first.price - second.price
    );
  }, [data, filter]);

  const paginateData = useMemo(() => {
    const init = (filter.page - 1) * filter.perPage;
    const end = init + filter.perPage;

    return filteredData.slice(
      init,
      end > filteredData.length ? filteredData.length : end
    );
  }, [filteredData, filter]);

  const onChangeFilter = (key: string, value: string | number) =>
    setFilter((curr) => ({
      ...curr,
      [key]: value,
    }));

  const onCategoryChange = (value: string) =>
    setFilter((curr) => ({
      ...curr,
      page: 1,
      category: value,
    }));

  const onValueOrderChange = (value: ValueType) =>
    setFilter((curr) => ({
      ...curr,
      page: 1,
      valueOrder: value,
    }));

  useEffect(() => {
    setLoading(true);
    FindManyProductUseCaseFactory.create()
      .execute(filter)
      .then((result) => {
        setData(result);
        setLoading(false);
      });
  }, [refresh, filter.category]);

  return {
    filter,
    loading,
    onChangeFilter,
    onCategoryChange,
    onValueOrderChange,
    data: paginateData,
    maxLength: data.length,
    refresh: () => setRefresh((curr) => !curr),
  };
};
