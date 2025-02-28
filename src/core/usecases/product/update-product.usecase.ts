import { ProductRepository } from "@/core/domain/interfaces/product-repository.inteface";
import { Product } from "@/core/domain/interfaces/product.interface";
import { UseCase } from "@/core/domain/interfaces/use-case.inteface";

export class UpdateProductUseCase
  implements UseCase<Product, Promise<boolean>>
{
  constructor(private readonly repository: ProductRepository) {}

  async execute(params: Product): Promise<boolean> {
    try {
      const result = await this.repository.update(params);
      return result;
    } catch (error: unknown) {
      throw error;
    }
  }
}
