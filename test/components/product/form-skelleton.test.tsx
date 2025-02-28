import React from "react";
import { render, screen } from "../../setup-tests";
import { ProductFormSkelleton } from "../../../src/components/product/form-skelleton";

describe("ProductFormSkelleton", () => {
  it("should render the skeleton title", () => {
    render(<ProductFormSkelleton />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
