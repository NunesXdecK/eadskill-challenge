import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { HttpService } from "../../../src/core/domain/interfaces/http-service.interface";
import { Product } from "../../../src/core/domain/interfaces/product.interface";
import { ProductHttpRepository } from "../../../src/infra/repositories/product.repository";

jest.mock("../../../src/core/domain/interfaces/http-service.interface");

describe("ProductHttpRepository", () => {
  const mockProductOne: Product = {
    id: 1,
    title: "Test Product",
    price: 100,
    category: "test",
    description: "test",
    image: "test",
    rating: { count: 100, rate: 1 },
  };

  const mockProductTwo: Product = {
    id: 2,
    title: "Test Product",
    price: 100,
    category: "test",
    description: "test",
    image: "test",
    rating: { count: 100, rate: 1 },
  };

  let productRepository: ProductHttpRepository;
  let mockHttpService: jest.Mocked<HttpService>;

  beforeEach(() => {
    mockHttpService = {
      put: jest.fn(),
      post: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<HttpService>;
    productRepository = new ProductHttpRepository(mockHttpService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch a single product", async () => {
    const axiosResponse: AxiosResponse<Product> = {
      data: mockProductOne,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    };

    mockHttpService.get.mockResolvedValueOnce(axiosResponse);

    const result = await productRepository.find(1);

    expect(result).toEqual(mockProductOne);
    expect(mockHttpService.get).toHaveBeenCalledWith("products/1");
  });

  it("should fetch many products", async () => {
    const mockProducts: Product[] = [mockProductOne, mockProductTwo];
    const axiosResponse: AxiosResponse<Product[]> = {
      data: mockProducts,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    };

    mockHttpService.get.mockResolvedValueOnce(axiosResponse);

    const result = await productRepository.findMany();

    expect(result).toEqual(mockProducts);
    expect(mockHttpService.get).toHaveBeenCalledWith("products");
  });

  it("should findManyByCategory many products", async () => {
    const mockProducts: Product[] = [mockProductOne, mockProductTwo];
    const axiosResponse: AxiosResponse<Product[]> = {
      data: mockProducts,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    };

    mockHttpService.get.mockResolvedValueOnce(axiosResponse);

    const result = await productRepository.findManyByCategory("test");

    expect(result).toEqual(mockProducts);
    expect(mockHttpService.get).toHaveBeenCalledWith("products/category/test");
  });

  it("should create a product", async () => {
    const mockProduct: Partial<Product> = { title: "New Product", price: 100 };
    const axiosResponse: AxiosResponse<boolean> = {
      data: true,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    };

    mockHttpService.post.mockResolvedValueOnce(axiosResponse);

    const result = await productRepository.create(mockProduct);

    expect(result).toBe(axiosResponse);
    expect(mockHttpService.post).toHaveBeenCalledWith("products", mockProduct);
  });

  it("should update a product", async () => {
    const mockProduct: Product = mockProductOne;
    const axiosResponse: AxiosResponse<boolean> = {
      data: true,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    };

    mockHttpService.put.mockResolvedValueOnce(axiosResponse);

    const result = await productRepository.update(mockProduct);

    expect(result).toBe(axiosResponse);
    expect(mockHttpService.put).toHaveBeenCalledWith("products/1", mockProduct);
  });

  it("should delete a product", async () => {
    const axiosResponse: AxiosResponse<boolean> = {
      data: true,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    };

    mockHttpService.delete.mockResolvedValueOnce(axiosResponse);

    const result = await productRepository.delete(1);

    expect(result).toBe(axiosResponse);
    expect(mockHttpService.delete).toHaveBeenCalledWith("products/1");
  });
});
