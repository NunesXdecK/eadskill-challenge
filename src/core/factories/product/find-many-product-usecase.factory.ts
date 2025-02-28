import ProductRepositoryFactory from "@/infra/factories/product-repository.factory";
import { FindManyProductUseCase } from "@/core/usecases/product/find-many-product.usecase";

export default class FindManyProductUseCaseFactory {
  static create(): FindManyProductUseCase {
    const productRepository = ProductRepositoryFactory.create();
    return new FindManyProductUseCase(productRepository);
  }
}
