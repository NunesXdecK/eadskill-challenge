import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { CategoryHttpRepository } from "../../../src/infra/repositories/category.repository";
import { HttpService } from "../../../src/core/domain/interfaces/http-service.interface";

const mockHttpService: jest.Mocked<HttpService> = {
  get: jest.fn(),
  put: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
};

describe("CategoryHttpRepository", () => {
  let categoryRepository: CategoryHttpRepository;

  beforeEach(() => {
    categoryRepository = new CategoryHttpRepository(
      mockHttpService as HttpService
    );
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of categories", async () => {
    const mockResponse: AxiosResponse<string[]> = {
      data: ["electronics", "jewelery", "men's clothing"],
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    };

    mockHttpService.get.mockResolvedValue(mockResponse);

    const result = await categoryRepository.findMany();

    expect(mockHttpService.get).toHaveBeenCalledWith("products/categories");

    expect(result).toEqual(mockResponse.data);
  });

  it("should thrown an error", async () => {
    const mockError = new Error("error");
    mockHttpService.get.mockRejectedValue(mockError);

    await expect(categoryRepository.findMany()).rejects.toThrow(
      "error"
    );

    expect(mockHttpService.get).toHaveBeenCalledWith("products/categories");
  });
});
