import { FindManyCategoriesUseCase } from "@/core/usecases/category/find-many-categories.usecase";
import CategoryRepositoryFactory from "@/infra/factories/category-repository.factory";

export default class FindManyCategoriesUseCaseFactory {
  static create(): FindManyCategoriesUseCase {
    const categoryRepository = CategoryRepositoryFactory.create();
    return new FindManyCategoriesUseCase(categoryRepository);
  }
}
