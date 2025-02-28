import { CategoryRepository } from "@/core/domain/interfaces/category-repository.inteface";
import { Product } from "@/core/domain/interfaces/product.interface";
import { UseCase } from "@/core/domain/interfaces/use-case.inteface";

export class FindManyCategoriesUseCase
  implements UseCase<undefined, Promise<string[]>>
{
  constructor(private readonly repository: CategoryRepository) {}

  async execute(): Promise<string[]> {
    try {
      const result = await this.repository.findMany();
      return result;
    } catch (error: unknown) {
      throw error;
    }
  }
}
