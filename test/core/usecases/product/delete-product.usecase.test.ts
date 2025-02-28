import { DeleteProductUseCase } from "../../../../src/core/usecases/product/delete-product.usecase";
import { ProductRepository } from "../../../../src/core/domain/interfaces/product-repository.inteface";

describe("DeleteProductUseCase", () => {
  const mockRepository: jest.Mocked<ProductRepository> = {
    find: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
    findManyByCategory: jest.fn(),
  };
  let useCase: DeleteProductUseCase;

  beforeEach(() => {
    useCase = new DeleteProductUseCase(mockRepository);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should delete product successfully", async () => {
    mockRepository.delete.mockResolvedValue(true);

    const result = await useCase.execute(1);

    expect(mockRepository.delete).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });

  it("should throw an error if delete fails", async () => {
    const mockError = new Error("Delete failed");
    mockRepository.delete.mockRejectedValue(mockError);

    await expect(useCase.execute(1)).rejects.toThrow("Delete failed");
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });
});
