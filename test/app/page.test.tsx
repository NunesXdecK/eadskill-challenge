import { render, screen } from "../setup-tests";
import Home from "../../src/app/page";

jest.mock("../../src/components/product/product-table", () => ({
  ProductTableWithAlert: () => <div>ProductTable</div>,
}));

jest.mock("../../src/components/product/form-modal-button", () => ({
  FormModalButton: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
}));

describe("Home", () => {
  it("should render the title and description", () => {
    render(<Home />);

    expect(screen.getByText("Produtos")).toBeInTheDocument();
    expect(
      screen.getByText("Tela para cadastro de produtos")
    ).toBeInTheDocument();
  });

  it("should render the new product button", () => {
    render(<Home />);

    expect(screen.getByText("Novo")).toBeInTheDocument();
  });

  it("should render the product table", () => {
    render(<Home />);

    expect(screen.getByText("ProductTable")).toBeInTheDocument();
  });
});
