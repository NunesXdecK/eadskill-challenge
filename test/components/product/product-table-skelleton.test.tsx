import React from "react";
import { render, screen } from "../../setup-tests";
import { ProductTableSkeleton } from "../../../src/components/product/product-table-skeleton";

describe("ProductFormSkelleton", () => {
  it("should render the skeleton title", () => {
    render(<ProductTableSkeleton />);

    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
