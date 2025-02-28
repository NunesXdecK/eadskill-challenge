import React from "react";
import { render, screen, fireEvent } from "../../../setup-tests";
import { Paginator } from "../../../../src/components/ui/paginator/paginator";

describe("Paginator", () => {
  it("should render pagination buttons", () => {
    render(
      <Paginator page={1} perPage={10} maxLength={50} onChange={jest.fn()} />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should highlight the current page", () => {
    render(
      <Paginator page={2} perPage={10} maxLength={50} onChange={jest.fn()} />
    );

    const currentPageButton = screen.getByText("2");
    expect(currentPageButton).toHaveClass("bg-gray-400");
  });

  it("should call onChange when a button is clicked", () => {
    const mockOnChange = jest.fn();
    render(
      <Paginator page={1} perPage={10} maxLength={50} onChange={mockOnChange} />
    );

    fireEvent.click(screen.getByText("2"));
    expect(mockOnChange).toHaveBeenCalledWith(2);
  });

  it("should render ellipsis for large page ranges", () => {
    render(
      <Paginator page={5} perPage={10} maxLength={100} onChange={jest.fn()} />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should not render ellipsis for small page ranges", () => {
    render(
      <Paginator page={1} perPage={10} maxLength={20} onChange={jest.fn()} />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.queryByText("...")).not.toBeInTheDocument();
  });
});
