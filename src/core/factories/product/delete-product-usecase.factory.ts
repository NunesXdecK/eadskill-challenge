import { DeleteProductUseCase } from "@/core/usecases/product/delete-product.usecase";
import ProductRepositoryFactory from "@/infra/factories/product-repository.factory";

export default class DeleteProductUseCaseFactory {
  static create(): DeleteProductUseCase {
    const productRepository = ProductRepositoryFactory.create();
    return new DeleteProductUseCase(productRepository);
  }
}
