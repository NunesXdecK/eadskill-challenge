import { AxiosResponse } from "axios";
import { HttpService } from "@/core/domain/interfaces/http-service.interface";
import { CategoryRepository } from "@/core/domain/interfaces/category-repository.inteface";

export class CategoryHttpRepository implements CategoryRepository {
  categoryUrl = "products/categories";

  constructor(private readonly httpService: HttpService) {}

  async findMany(): Promise<string[]> {
    const result = (await this.httpService.get(
      this.categoryUrl
    )) as AxiosResponse<string[]>;
    return result.data;
  }
}
