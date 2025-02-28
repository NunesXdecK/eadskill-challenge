import { CreateProductUseCase } from "../../../../src/core/usecases/product/create-product.usecase";
import { ProductRepository } from "../../../../src/core/domain/interfaces/product-repository.inteface";
import { Product } from "../../../../src/core/domain/interfaces/product.interface";

describe("CreateProductUseCase", () => {
  const mockProduct: Partial<Product> = {
    title: "Product 1",
    price: 100,
    image: "https://example.com/image.jpg",
    category: "electronics",
    description: "A great product",
  };

  const mockRepository: jest.Mocked<ProductRepository> = {
    find: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
    findManyByCategory: jest.fn(),
  };

  let useCase: CreateProductUseCase;

  beforeEach(() => {
    useCase = new CreateProductUseCase(mockRepository);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should create product successfully", async () => {
    mockRepository.create.mockResolvedValue(true);

    const result = await useCase.execute(mockProduct);

    expect(mockRepository.create).toHaveBeenCalledWith(mockProduct);
    expect(result).toBe(true);
  });

  it("should throw an error if create fails", async () => {
    const mockError = new Error("Create failed");
    mockRepository.create.mockRejectedValue(mockError);

    await expect(useCase.execute(mockProduct)).rejects.toThrow("Create failed");
    expect(mockRepository.create).toHaveBeenCalledWith(mockProduct);
  });
});
