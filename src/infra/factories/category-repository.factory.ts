import { AxiosHttpService } from "../http/axios.adapter";
import { CategoryHttpRepository } from "../repositories/category.repository";
import { CategoryRepository } from "@/core/domain/interfaces/category-repository.inteface";
import AxiosAdapterFactory from "./axios-adapter.factory";

export default class CategoryRepositoryFactory {
  static create(): CategoryRepository {
    const httpService = AxiosAdapterFactory.create();
    return new CategoryHttpRepository(httpService);
  }
}
