import { FindManyProductUseCase } from "../../../../src/core/usecases/product/find-many-product.usecase";
import { ProductRepository } from "../../../../src/core/domain/interfaces/product-repository.inteface";
import { Product } from "../../../../src/core/domain/interfaces/product.interface";
import { ProductFilter } from "../../../../src/core/domain/interfaces/product-filter.interface";

describe("FindManyProductUseCase", () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Product 1",
      price: 100,
      image: "https://example.com/image.jpg",
      category: "electronics",
      description: "A great product",
      rating: {
        count: 100,
        rate: 4,
      },
    },
    {
      id: 2,
      title: "Product 2",
      price: 200,
      image: "https://example.com/image.jpg",
      category: "electronics",
      description: "A great product",
      rating: {
        count: 200,
        rate: 3,
      },
    },
  ];

  const mockRepository: jest.Mocked<ProductRepository> = {
    find: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
    findManyByCategory: jest.fn(),
  };

  let useCase: FindManyProductUseCase;

  beforeEach(() => {
    useCase = new FindManyProductUseCase(mockRepository);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should find many products without filter", async () => {
    mockRepository.findMany.mockResolvedValue(mockProducts);

    const result = await useCase.execute();

    expect(mockRepository.findMany).toHaveBeenCalledWith(undefined);
    expect(result).toEqual(mockProducts);
  });

  it("should find many products with filter", async () => {
    const filter: ProductFilter = { page: 1, perPage: 10 } as ProductFilter;
    mockRepository.findMany.mockResolvedValue(mockProducts);

    const result = await useCase.execute(filter);

    expect(mockRepository.findMany).toHaveBeenCalledWith(filter);
    expect(result).toEqual(mockProducts);
  });

  it("should find many products by category", async () => {
    const filter: ProductFilter = { category: "electronics" } as ProductFilter;
    mockRepository.findManyByCategory.mockResolvedValue(mockProducts);

    const result = await useCase.execute(filter);

    expect(mockRepository.findManyByCategory).toHaveBeenCalledWith(
      "electronics"
    );
    expect(result).toEqual(mockProducts);
  });

  it("should throw an error if find many fails", async () => {
    const mockError = new Error("Find many failed");
    mockRepository.findMany.mockRejectedValue(mockError);

    await expect(useCase.execute()).rejects.toThrow("Find many failed");
    expect(mockRepository.findMany).toHaveBeenCalledWith(undefined);
  });

  it("should throw an error if find many by category fails", async () => {
    const mockError = new Error("Find many by category failed");
    const filter: ProductFilter = { category: "electronics" } as ProductFilter;
    mockRepository.findManyByCategory.mockRejectedValue(mockError);

    await expect(useCase.execute(filter)).rejects.toThrow(
      "Find many by category failed"
    );
    expect(mockRepository.findManyByCategory).toHaveBeenCalledWith(
      "electronics"
    );
  });
});
