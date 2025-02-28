import { renderHook, act, waitFor } from "../setup-tests";
import { useProducts } from "../../src/hooks/use-products";
import { Product } from "../../src/core/domain/interfaces/product.interface";
import FindManyProductUseCaseFactory from "../../src/core/factories/product/find-many-product-usecase.factory";

jest.mock("../../src/core/factories/product/find-many-product-usecase.factory");

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Product 1",
    price: 100,
    category: "test",
    description: "test",
    image: "test",
    rating: { count: 100, rate: 1 },
  },
  {
    id: 2,
    title: "Product 2",
    price: 200,
    category: "test",
    description: "test",
    image: "test",
    rating: { count: 200, rate: 2 },
  },
  {
    id: 3,
    title: "Product 3",
    price: 300,
    category: "test",
    description: "test",
    image: "test",
    rating: { count: 300, rate: 3 },
  },
];

describe("useProducts", () => {
  let execute = jest.fn();

  beforeEach(() => {
    (FindManyProductUseCaseFactory.create as jest.Mock).mockReturnValue({
      execute: execute.mockResolvedValue(mockProducts),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return initial state", async () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.maxLength).toBe(0);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockProducts.slice(0, 5));
      expect(result.current.maxLength).toBe(mockProducts.length);
    });
  });

  it("should update filter and refresh data", async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.onChangeFilter("page", 2);
    });

    await waitFor(() => {
      expect(result.current.filter.page).toBe(2);
      expect(result.current.data).toEqual(mockProducts.slice(5, 10));
    });
  });

  it("should change category and reset page", async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.onCategoryChange("electronics");
    });

    await waitFor(() => {
      expect(result.current.filter.category).toBe("electronics");
      expect(result.current.filter.page).toBe(1);
    });
  });

  it("should change value order and reset page", async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.onValueOrderChange("asc");
    });

    await waitFor(() => {
      expect(result.current.filter.valueOrder).toBe("asc");
      expect(result.current.filter.page).toBe(1);
    });
  });

  it("should refresh data", async () => {
    const { result } = renderHook(() => useProducts());

    const initialRefreshState = result.current.refresh;

    act(() => {
      result.current.refresh();
    });

    await waitFor(() => {
      expect(result.current.refresh).not.toBe(initialRefreshState);
    });
  });

  it("should sort data in ascending order", async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.onValueOrderChange("asc");
    });

    await waitFor(() => {
      expect(result.current.data[0].price).toBe(300);
      expect(result.current.data[1].price).toBe(200);
      expect(result.current.data[2].price).toBe(100);
    });
  });

  it("should sort data in descending order", async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.onValueOrderChange("desc");
    });

    await waitFor(() => {
      expect(result.current.data[0].price).toBe(100);
      expect(result.current.data[1].price).toBe(200);
      expect(result.current.data[2].price).toBe(300);
    });
  });

  it("should paginate data correctly", async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.onChangeFilter("perPage", 2);
    });

    await waitFor(() => {
      expect(result.current.data.length).toBe(2);
      expect(result.current.data).toEqual(mockProducts.slice(0, 2));
    });
  });

  it("should handle fetch error", async () => {
    execute.mockRejectedValue(new Error("Fetch error"));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual([]);
    });
  });
});
