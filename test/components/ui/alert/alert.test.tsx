import React from "react";
import { render, screen } from "../../../setup-tests";
import { Alert } from "../../../../src/components/ui/alert/alert";

describe("Alert", () => {
  it("should render success alert with correct styles and message", () => {
    render(<Alert type="success" message="Operation successful" />);

    const alertBox = screen.getByTestId("alert-test");
    const title = screen.getByText("Sucesso");
    const message = screen.getByText("Operation successful");

    expect(alertBox).toHaveClass("bg-green-50");
    expect(title).toHaveClass("text-green-800");
    expect(message).toHaveClass("text-green-700");
  });

  it("should render error alert with correct styles and message", () => {
    render(<Alert type="error" message="Operation failed" />);

    const alertBox = screen.getByTestId("alert-test");
    const title = screen.getByText("Error");
    const message = screen.getByText("Operation failed");

    expect(alertBox).toHaveClass("bg-red-50");
    expect(title).toHaveClass("text-red-800");
    expect(message).toHaveClass("text-red-700");
  });

  it("should render with custom message as ReactNode", () => {
    const customMessage = <span>Custom message</span>;
    render(<Alert type="success" message={customMessage} />);

    expect(screen.getByText("Custom message")).toBeInTheDocument();
  });

  it("should have fixed positioning and correct z-index", () => {
    render(<Alert type="success" message="Test message" />);

    const alertBox = screen.getByTestId("alert-test");

    expect(alertBox).toHaveClass("fixed");
    expect(alertBox).toHaveClass("bottom-0");
    expect(alertBox).toHaveClass("right-0");
    expect(alertBox).toHaveClass("z-20");
  });
});
