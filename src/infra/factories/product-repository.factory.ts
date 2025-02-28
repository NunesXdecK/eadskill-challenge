import { ProductRepository } from "@/core/domain/interfaces/product-repository.inteface";
import { ProductHttpRepository } from "../repositories/product.repository";
import { AxiosHttpService } from "../http/axios.adapter";

export default class ProductRepositoryFactory {
  static create(): ProductRepository {
    const httpService = new AxiosHttpService();
    return new ProductHttpRepository(httpService);
  }
}
