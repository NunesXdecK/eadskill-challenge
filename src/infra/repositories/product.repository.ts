import { HttpService } from "@/core/domain/interfaces/http-service.interface";
import { ProductFilter } from "@/core/domain/interfaces/product-filter.interface";
import { ProductRepository } from "@/core/domain/interfaces/product-repository.inteface";
import { Product } from "@/core/domain/interfaces/product.interface";
import { AxiosResponse } from "axios";

export class ProductHttpRepository implements ProductRepository {
  productUrl = "products";

  constructor(private readonly httpService: HttpService) {}

  async find(id: number): Promise<Product> {
    const result = (await this.httpService.get(
      `${this.productUrl}/${id}`
    )) as AxiosResponse<Product>;
    return result.data;
  }

  async findMany(_?: ProductFilter): Promise<Product[]> {
    const result = (await this.httpService.get(
      this.productUrl
    )) as AxiosResponse<Product[]>;
    return result.data;
  }

  async findManyByCategory(category: string): Promise<Product[]> {
    const result = (await this.httpService.get(
      `${this.productUrl}/category/${category}`
    )) as AxiosResponse<Product[]>;
    return result.data;
  }

  async create(params: Partial<Product>): Promise<boolean> {
    const result = (await this.httpService.post(
      this.productUrl,
      params
    )) as Promise<boolean>;
    return result;
  }

  async update(params: Product): Promise<boolean> {
    const result = (await this.httpService.put(
      `${this.productUrl}/${params.id}`,
      params
    )) as Promise<boolean>;
    return result;
  }

  async delete(id: number): Promise<boolean> {
    return (await this.httpService.delete(
      `${this.productUrl}/${id}`
    )) as Promise<boolean>;
  }
}
