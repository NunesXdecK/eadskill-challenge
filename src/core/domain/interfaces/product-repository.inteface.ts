import { Product } from "./product.interface";
import { ProductFilter } from "./product-filter.interface";

export interface ProductRepository {
  create: (params: Partial<Product>) => Promise<boolean>;
  find: (id: number) => Promise<Product>;
  findMany: (params: undefined | ProductFilter) => Promise<Product[]>;
  findManyByCategory: (category: string) => Promise<Product[]>;
  update: (params: Product) => Promise<boolean>;
  delete: (id: number) => Promise<boolean>;
}
