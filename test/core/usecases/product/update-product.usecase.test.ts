import { UpdateProductUseCase } from "../../../../src/core/usecases/product/update-product.usecase";
import { ProductRepository } from "../../../../src/core/domain/interfaces/product-repository.inteface";
import { Product } from "../../../../src/core/domain/interfaces/product.interface";

describe("UpdateProductUseCase", () => {
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

  let useCase: UpdateProductUseCase;

  beforeEach(() => {
    useCase = new UpdateProductUseCase(mockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update product successfully", async () => {
    mockRepository.update.mockResolvedValue(true);

    const result = await useCase.execute(mockProduct);

    expect(mockRepository.update).toHaveBeenCalledWith(mockProduct);
    expect(result).toBe(true);
  });

  it("should throw an error if update fails", async () => {
    const mockError = new Error("Update failed");
    mockRepository.update.mockRejectedValue(mockError);

    await expect(useCase.execute(mockProduct)).rejects.toThrow("Update failed");
    expect(mockRepository.update).toHaveBeenCalledWith(mockProduct);
  });
});
