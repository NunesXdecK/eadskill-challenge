import { useEffect, useState } from "react";
import * as yup from "yup";
import { Product } from "@/core/domain/interfaces/product.interface";
import CreateProductUseCaseFactory from "@/core/factories/product/create-product-usecase.factory";
import UpdateProductUseCaseFactory from "@/core/factories/product/update-product-usecase.factory";
import FindProductUseCaseFactory from "@/core/factories/product/find-product-usecase.factory";

interface Result {
  data: Product;
  errors: string[];
  loading: boolean;
  onSave: (data: Product) => Promise<boolean>;
  onChange: (key: string, value: string | number) => void;
}

const schema = yup.object().shape({
  title: yup.string().max(30, "title-30").required("title"),
  price: yup.number().positive("price-0").required("price"),
  image: yup.string().url("image-url").required("image"),
  category: yup.string().required("category"),
  description: yup.string().required("description"),
});

export const useProduct = (id?: string): Result => {
  const [loading, setLoading] = useState<boolean>(id !== undefined);
  const [data, setData] = useState<Product>({} as Product);
  const [errors, setErrors] = useState<string[]>([]);

  const onSave = async (data: Product): Promise<boolean> => {
    setLoading(true);
    setErrors([]);
    let result = false;
    try {
      await schema.validate(data, { abortEarly: false });
      const isNew = data.id === undefined;
      result = isNew
        ? await CreateProductUseCaseFactory.create().execute(data)
        : await UpdateProductUseCaseFactory.create().execute(data);
    } catch (error: unknown) {
      if (error instanceof yup.ValidationError) {
        const validationError: yup.ValidationError = error;
        setErrors(validationError.errors);
      }
    }

    setLoading(false);
    return result;
  };

  const onChange = (key: string, value: string | number) =>
    setData((curr) => ({
      ...curr,
      [key]: value,
    }));

  useEffect(() => {
    if (!id || isNaN(Number(id))) return;
    setLoading(true);
    FindProductUseCaseFactory.create()
      .execute(Number(id))
      .then((result) => {
        setData(result);
        setLoading(false);
      });
  }, []);

  return {
    data,
    errors,
    loading,
    onSave,
    onChange,
  };
};
