import { ProductRepository } from "@/core/domain/interfaces/product-repository.inteface";
import { ProductHttpRepository } from "../repositories/product.repository";
import { AxiosHttpService } from "../http/axios.adapter";
import AxiosAdapterFactory from "./axios-adapter.factory";

export default class ProductRepositoryFactory {
  static create(): ProductRepository {
    const httpService = AxiosAdapterFactory.create();
    return new ProductHttpRepository(httpService);
  }
}
