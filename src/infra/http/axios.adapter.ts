import { HttpService } from "@/core/domain/interfaces/http-service.interface";
import { ProductFilter } from "@/core/domain/interfaces/product-filter.interface";
import { Product } from "@/core/domain/interfaces/product.interface";
import axios, { AxiosInstance } from "axios";

export class AxiosHttpService implements HttpService {
  constructor(private readonly instance: AxiosInstance) {}

  async get(
    url: string,
    params: ProductFilter | unknown
  ): Promise<Product | Product[]> {
    try {
      return await this.instance.get(url, {
        params,
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async post(url: string, params: Product | unknown): Promise<boolean> {
    try {
      await this.instance.post(url, params);
    } catch (error: unknown) {
      console.error(error);
      return false;
    }
    return true as unknown as boolean;
  }

  async put(url: string, params: Product | unknown): Promise<boolean> {
    try {
      await this.instance.put(url, {
        params,
        data: params,
      });
    } catch (error: unknown) {
      console.error(error);
      return false;
    }
    return true as unknown as boolean;
  }

  async delete(url: string, params: Product | unknown): Promise<boolean> {
    try {
      await this.instance.delete(url, {
        params: params,
      });
    } catch (error: unknown) {
      console.error(error);
      return false;
    }
    return true as unknown as boolean;
  }
}
