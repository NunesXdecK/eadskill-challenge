import { ValueType } from "@/components/ui/table/header-switch-button";
import { Product } from "./product.interface";

export interface ProductFilter extends Partial<Product> {
  page: number;
  perPage: number;
  valueOrder: ValueType;
}
