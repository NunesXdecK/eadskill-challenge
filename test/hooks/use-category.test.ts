import { renderHook, act, waitFor } from "../setup-tests";
import { useCategories } from "../../src/hooks/use-categories";
import FindManyCategoriesUseCaseFactory from "../../src/core/factories/category/find-many-category-usecase.factory";

jest.mock(
  "../../src/core/factories/category/find-many-category-usecase.factory"
);

const mockCategories = ["electronics", "jewelery", "men's clothing"];

describe("useCategories", () => {
  let executeMock = jest.fn();
  beforeEach(() => {
    (FindManyCategoriesUseCaseFactory.create as jest.Mock).mockReturnValue({
      execute: executeMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return initial state", async () => {
    executeMock.mockResolvedValue(mockCategories);
    const { result } = renderHook(() => useCategories());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockCategories);
    });
  });

  it("should handle empty data", async () => {
    executeMock.mockResolvedValue([]);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual([]);
    });
  });

  it("should handle fetch error", async () => {
    executeMock.mockRejectedValue(new Error("Fetch error"));

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual([]);
    });
  });
});
