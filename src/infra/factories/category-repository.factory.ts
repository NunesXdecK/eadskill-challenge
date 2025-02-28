import { AxiosHttpService } from "../http/axios.adapter";
import { CategoryHttpRepository } from "../repositories/category.repository";
import { CategoryRepository } from "@/core/domain/interfaces/category-repository.inteface";

export default class CategoryRepositoryFactory {
  static create(): CategoryRepository {
    const httpService = new AxiosHttpService();
    return new CategoryHttpRepository(httpService);
  }
}
