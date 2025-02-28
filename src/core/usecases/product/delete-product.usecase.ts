import { ProductRepository } from "@/core/domain/interfaces/product-repository.inteface";
import { UseCase } from "@/core/domain/interfaces/use-case.inteface";

export class DeleteProductUseCase
  implements UseCase<number, Promise<boolean>>
{
  constructor(private readonly repository: ProductRepository) {}

  async execute(id: number): Promise<boolean> {
    try {
      const result = await this.repository.delete(id);
      return result;
    } catch (error: unknown) {
      throw error;
    }
  }
}
