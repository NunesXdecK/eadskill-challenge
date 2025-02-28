import { FindProductUseCase } from "@/core/usecases/product/find-product.usecase";
import ProductRepositoryFactory from "@/infra/factories/product-repository.factory";

export default class FindProductUseCaseFactory {
  static create(): FindProductUseCase {
    const productRepository = ProductRepositoryFactory.create();
    return new FindProductUseCase(productRepository);
  }
}
