import { FindProductUseCase } from "../../../../src/core/usecases/product/find-product.usecase";
import { ProductRepository } from "../../../../src/core/domain/interfaces/product-repository.inteface";
import { Product } from "../../../../src/core/domain/interfaces/product.interface";

describe("FindProductUseCase", () => {
  const mockProduct: Product = {
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
  };

  const mockRepository: jest.Mocked<ProductRepository> = {
    find: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
    findManyByCategory: jest.fn(),
  };

  let useCase: FindProductUseCase;

  beforeEach(() => {
    useCase = new FindProductUseCase(mockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should find product successfully", async () => {
    mockRepository.find.mockResolvedValue(mockProduct);

    const result = await useCase.execute(1);

    expect(mockRepository.find).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockProduct);
  });

  it("should throw an error if product is not found", async () => {
    const mockError = new Error("Product not found");
    mockRepository.find.mockRejectedValue(mockError);

    await expect(useCase.execute(1)).rejects.toThrow("Product not found");
    expect(mockRepository.find).toHaveBeenCalledWith(1);
  });
});
