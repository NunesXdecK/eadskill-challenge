import React from "react";
import { render, screen, fireEvent } from "../../setup-tests";
import { ProductTable } from "../../../src/components/product/product-table";
import { useProducts } from "../../../src/hooks/use-products";
import { useCategories } from "../../../src/hooks/use-categories";
import DeleteProductUseCaseFactory from "../../../src/core/factories/product/delete-product-usecase.factory";
import { Product } from "@/core/domain/interfaces/product.interface";
import { DeleteProductUseCase } from "../../../src/core/usecases/product/delete-product.usecase";

jest.mock("../../../src/hooks/use-products");
jest.mock("../../../src/hooks/use-categories");
jest.mock("../../../src/core/factories/product/delete-product-usecase.factory");
jest.mock("../../../src/components/product/product-table-skeleton");
jest.mock("../../../src/components/product/form-modal-button");
jest.mock("../../../src/components/ui/paginator/paginator");

const mockUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;
const mockUseCategories = useCategories as jest.MockedFunction<
  typeof useCategories
>;
const mockDeleteProductUseCaseFactory =
  DeleteProductUseCaseFactory as jest.Mocked<
    typeof DeleteProductUseCaseFactory
  >;

describe("ProductTable", () => {
  const useCase = { execute: jest.fn() } as unknown as DeleteProductUseCase;
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Product 1",
      rating: { rate: 4.5, count: 100 },
      category: "electronics",
      price: 100,
      description: "A great product",
      image: "test-image",
    },
    {
      id: 2,
      title: "Product 2",
      rating: { rate: 3.5, count: 200 },
      category: "jewelery",
      price: 200,
      description: "Another great product",
      image: "test-image",
    },
  ];

  beforeEach(() => {
    mockUseProducts.mockReturnValue({
      filter: { page: 1, perPage: 5, valueOrder: "desc" },
      loading: false,
      data: mockProducts,
      maxLength: 10,
      refresh: jest.fn(),
      onChangeFilter: jest.fn(),
      onCategoryChange: jest.fn(),
      onValueOrderChange: jest.fn(),
    });
    mockUseCategories.mockReturnValue({
      loading: false,
      data: ["electronics", "jewelery"],
    });
    mockDeleteProductUseCaseFactory.create.mockReturnValue(useCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the category filter", () => {
    render(<ProductTable showAlert={jest.fn()} />);

    expect(screen.getByTestId("category-select-label")).toBeInTheDocument();
  });

  it("should render the product table with data", () => {
    render(<ProductTable showAlert={jest.fn()} />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("should highlight rows with rating greater than 4", () => {
    render(<ProductTable showAlert={jest.fn()} />);

    const highlightedRow = screen.getByText("Product 1").closest("tr");
    expect(highlightedRow).toHaveClass("bg-[#17233b]");
  });
});
