import ProductRepositoryFactory from "@/infra/factories/product-repository.factory";
import { CreateProductUseCase } from "@/core/usecases/product/create-product.usecase";

export default class CreateProductUseCaseFactory {
  static create(): CreateProductUseCase {
    const productRepository = ProductRepositoryFactory.create();
    return new CreateProductUseCase(productRepository);
  }
}
