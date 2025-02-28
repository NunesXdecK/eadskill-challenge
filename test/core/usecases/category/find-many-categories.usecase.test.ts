import { FindManyCategoriesUseCase } from "../../../../src/core/usecases/category/find-many-categories.usecase";
import { CategoryRepository } from "../../../../src/core/domain/interfaces/category-repository.inteface";

describe("FindManyCategoriesUseCase", () => {
  const mockCategories = ["electronics", "jewelery", "men's clothing"];

  const mockRepository: jest.Mocked<CategoryRepository> = {
    findMany: jest.fn(),
  };

  let useCase: FindManyCategoriesUseCase;

  beforeEach(() => {
    useCase = new FindManyCategoriesUseCase(mockRepository);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should find many categories successfully", async () => {
    mockRepository.findMany.mockResolvedValue(mockCategories);

    const result = await useCase.execute();

    expect(mockRepository.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockCategories);
  });

  it("should throw an error if find many fails", async () => {
    const mockError = new Error("Find many failed");
    mockRepository.findMany.mockRejectedValue(mockError);

    await expect(useCase.execute()).rejects.toThrow("Find many failed");
    expect(mockRepository.findMany).toHaveBeenCalled();
  });
});
