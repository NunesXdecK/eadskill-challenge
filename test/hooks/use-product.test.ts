import { renderHook, act, waitFor } from "../setup-tests";
import * as yup from "yup";
import { useProduct } from "../../src/hooks/use-product";
import { Product } from "../../src/core/domain/interfaces/product.interface";
import CreateProductUseCaseFactory from "../../src/core/factories/product/create-product-usecase.factory";
import UpdateProductUseCaseFactory from "../../src/core/factories/product/update-product-usecase.factory";
import FindProductUseCaseFactory from "../../src/core/factories/product/find-product-usecase.factory";

jest.mock("../../src/core/factories/product/create-product-usecase.factory");
jest.mock("../../src/core/factories/product/update-product-usecase.factory");
jest.mock("../../src/core/factories/product/find-product-usecase.factory");

const mockProduct: Product = {
  id: 1,
  title: "Product 1",
  price: 100,
  image: "https://example.com/image.jpg",
  category: "electronics",
  description: "A great product",
  rating: {
    rate: 3,
    count: 100,
  },
};

describe("useProduct", () => {
  let create = jest.fn();
  let update = jest.fn();
  let find = jest.fn();

  beforeEach(() => {
    (CreateProductUseCaseFactory.create as jest.Mock).mockReturnValue({
      execute: create.mockResolvedValue(true),
    });
    (UpdateProductUseCaseFactory.create as jest.Mock).mockReturnValue({
      execute: update.mockResolvedValue(true),
    });
    (FindProductUseCaseFactory.create as jest.Mock).mockReturnValue({
      execute: find.mockResolvedValue(mockProduct),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return initial state for new product", () => {
    const { result } = renderHook(() => useProduct());

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual({} as Product);
    expect(result.current.errors).toEqual([]);
  });

  it("should return initial state for existing product", async () => {
    const { result } = renderHook(() => useProduct("1"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockProduct);
      expect(result.current.errors).toEqual([]);
    });
  });

  it("should update product data on change", () => {
    const { result } = renderHook(() => useProduct());

    act(() => {
      result.current.onChange("title", "New Title");
    });

    expect(result.current.data.title).toBe("New Title");
  });

  it("should save new product successfully", async () => {
    const { result } = renderHook(() => useProduct());

    const product = { ...mockProduct, id: undefined } as unknown as Product;

    const saveResult = await act(async () => {
      return result.current.onSave(product);
    });

    expect(CreateProductUseCaseFactory.create).toHaveBeenCalled();
    expect(saveResult).toBe(true);
    expect(result.current.errors).toEqual([]);
  });

  it("should update existing product successfully", async () => {
    const { result } = renderHook(() => useProduct("1"));

    const saveResult = await act(async () => {
      return result.current.onSave(mockProduct);
    });

    await waitFor(() => {
      expect(UpdateProductUseCaseFactory.create).toHaveBeenCalled();
      expect(saveResult).toBe(true);
      expect(result.current.errors).toEqual([]);
    });
  });

  it("should handle validation errors on save", async () => {
    const { result } = renderHook(() => useProduct());

    const invalidProduct: Product = {
      id: 1,
      title: "",
      price: -1,
      image: "invalid-url",
      category: "",
      description: "",
      rating: {
        rate: 3,
        count: 100,
      },
    };

    const saveResult = await act(async () => {
      return result.current.onSave(invalidProduct);
    });

    expect(saveResult).toBe(false);
    expect(result.current.errors.length).toBeGreaterThan(0);
  });

  it("should not fetch product if id is invalid", async () => {
    const { result } = renderHook(() => useProduct(undefined));

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual({} as Product);
  });

  it("should handle fetch error", async () => {
    find.mockRejectedValue(new Error("Fetch error"));

    const { result } = renderHook(() => useProduct("1"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual({});
    });
  });
});
