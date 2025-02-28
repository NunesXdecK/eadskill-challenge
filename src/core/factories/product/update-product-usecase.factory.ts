import { UpdateProductUseCase } from "@/core/usecases/product/update-product.usecase";
import ProductRepositoryFactory from "@/infra/factories/product-repository.factory";

export default class UpdateProductUseCaseFactory {
  static create(): UpdateProductUseCase {
    const productRepository = ProductRepositoryFactory.create();
    return new UpdateProductUseCase(productRepository);
  }
}
