import React from "react";
import { render, fireEvent, screen } from "../../setup-tests";
import { FormModalButton } from "../../../src/components/product/form-modal-button";
import { useProduct } from "../../../src/hooks/use-product";
import { useCategories } from "../../../src/hooks/use-categories";

jest.mock("../../../src/hooks/use-product", () => ({
  useProduct: jest.fn(),
}));

jest.mock("../../../src/hooks/use-categories", () => ({
  useCategories: jest.fn(),
}));

jest.mock("../../../src/components/hoc/with-alert", () => ({
  withAlert: jest.fn((WrappedComponent) => WrappedComponent),
}));

jest.mock("../../../src/components/product/form-skelleton", () => ({
  ProductFormSkelleton: () => (
    <div data-testid="product-form-skeleton">Loading...</div>
  ),
}));

const mockUseProduct = useProduct as jest.MockedFunction<typeof useProduct>;
const mockUseCategories = useCategories as jest.MockedFunction<
  typeof useCategories
>;

describe("FormModalButton", () => {
  beforeEach(() => {
    mockUseProduct.mockReturnValue({
      errors: [],
      loading: false,
      data: {
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
      },
      onSave: jest.fn().mockResolvedValue(true),
      onChange: jest.fn(),
    });
    mockUseCategories.mockReturnValue({
      loading: false,
      data: ["electronics", "jewelery"],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the open button", () => {
    render(<FormModalButton>Open Modal</FormModalButton>);

    expect(screen.getByText("Open Modal")).toBeInTheDocument();
  });

  it("should open the modal when the button is clicked", () => {
    render(<FormModalButton>Open Modal</FormModalButton>);

    fireEvent.click(screen.getByText("Open Modal"));

    expect(screen.getByText("Novo produto")).toBeInTheDocument();
  });

  it("should close the modal when the close button is clicked", () => {
    render(<FormModalButton>Open Modal</FormModalButton>);

    fireEvent.click(screen.getByText("Open Modal"));
    fireEvent.click(screen.getByText("X"));

    expect(screen.queryByText("Novo produto")).not.toBeInTheDocument();
  });

  it("should render the product form skeleton when loading", () => {
    mockUseProduct.mockReturnValue({
      errors: [],
      loading: true,
      data: {} as any,
      onSave: jest.fn(),
      onChange: jest.fn(),
    });
    mockUseCategories.mockReturnValue({
      loading: true,
      data: [],
    });

    render(<FormModalButton>Open Modal</FormModalButton>);
    fireEvent.click(screen.getByText("Open Modal"));

    expect(screen.getByTestId("product-form-skeleton")).toBeInTheDocument();
  });

  it("should call onSave and close the modal when the save button is clicked", async () => {
    render(<FormModalButton>Open Modal</FormModalButton>);

    fireEvent.click(screen.getByText("Open Modal"));
    fireEvent.click(screen.getByText("Salvar produto"));

    expect(mockUseProduct().onSave).toHaveBeenCalled();
  });

  it("should show an error message if onSave fails", async () => {
    mockUseProduct.mockReturnValue({
      errors: ["title"],
      loading: false,
      data: {
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
      },
      onSave: jest.fn().mockResolvedValue(false),
      onChange: jest.fn(),
    });

    render(<FormModalButton>Open Modal</FormModalButton>);

    fireEvent.click(screen.getByText("Open Modal"));
    fireEvent.click(screen.getByText("Salvar produto"));

    expect(
      screen.getByText(
        "O nome do produto é obrigatório e precisa ser menor que 30 caracteres."
      )
    ).toBeInTheDocument();
  });
});
