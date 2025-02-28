import { ProductRepository } from "@/core/domain/interfaces/product-repository.inteface";
import { Product } from "@/core/domain/interfaces/product.interface";
import { UseCase } from "@/core/domain/interfaces/use-case.inteface";

export class FindProductUseCase implements UseCase<number, Promise<Product>> {
  constructor(private readonly repository: ProductRepository) {}

  async execute(id: number): Promise<Product> {
    try {
      const result = await this.repository.find(id);
      return result;
    } catch (error: unknown) {
      throw error;
    }
  }
}
