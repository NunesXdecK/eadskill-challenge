import { useEffect, useState } from "react";
import FindManyCategoriesUseCaseFactory from "@/core/factories/category/find-many-category-usecase.factory";

interface Result {
  data: string[];
  loading: boolean;
}

export const useCategories = (): Result => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    FindManyCategoriesUseCaseFactory.create()
      .execute()
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return {
    data,
    loading,
  };
};
