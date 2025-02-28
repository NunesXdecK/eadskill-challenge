import { ProductFilter } from "@/core/domain/interfaces/product-filter.interface";
import { ProductRepository } from "@/core/domain/interfaces/product-repository.inteface";
import { Product } from "@/core/domain/interfaces/product.interface";
import { UseCase } from "@/core/domain/interfaces/use-case.inteface";

export class FindManyProductUseCase
  implements UseCase<undefined | ProductFilter, Promise<Product[]>>
{
  constructor(private readonly repository: ProductRepository) {}

  async execute(params?: undefined | ProductFilter): Promise<Product[]> {
    try {
      const result = params?.category
        ? await this.repository.findManyByCategory(params.category)
        : await this.repository.findMany(params);
      return result;
    } catch (error: unknown) {
      throw error;
    }
  }
}
