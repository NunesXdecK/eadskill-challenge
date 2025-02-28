import React from "react";
import { render, fireEvent, screen } from "../../setup-tests";
import { withModal } from "../../../src/components/hoc/with-modal";

const MockWrappedComponent: React.FC<{
  onOpen?: () => void;
  children?: React.ReactNode;
}> = ({ onOpen, children }) => (
  <button onClick={onOpen}>{children || "Open Modal"}</button>
);

const MockModalBody: React.FC<{ id?: string; onClose?: () => void }> = ({
  id,
  onClose,
}) => (
  <div>
    <button onClick={onClose}>Close</button>
    <span>{id}</span>
  </div>
);

describe("withModal", () => {
  it("should render the wrapped component", () => {
    const ComponentWithModal = withModal(MockWrappedComponent, MockModalBody);
    render(<ComponentWithModal />);

    expect(screen.getByText("Open Modal")).toBeInTheDocument();
  });

  it("should open the modal when the wrapped component is clicked", () => {
    const ComponentWithModal = withModal(MockWrappedComponent, MockModalBody);
    render(<ComponentWithModal />);

    fireEvent.click(screen.getByText("Open Modal"));

    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("should close the modal when the close button is clicked", () => {
    const ComponentWithModal = withModal(MockWrappedComponent, MockModalBody);
    render(<ComponentWithModal />);

    fireEvent.click(screen.getByText("Open Modal"));
    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByText("Close")).not.toBeInTheDocument();
  });

  it("should pass the id prop to the modal body", () => {
    const ComponentWithModal = withModal(MockWrappedComponent, MockModalBody);
    render(<ComponentWithModal id="test-id" />);

    fireEvent.click(screen.getByText("Open Modal"));

    expect(screen.getByText("test-id")).toBeInTheDocument();
  });

  it("should render children in the wrapped component", () => {
    const ComponentWithModal = withModal(MockWrappedComponent, MockModalBody);
    render(<ComponentWithModal>Custom Text</ComponentWithModal>);

    expect(screen.getByText("Custom Text")).toBeInTheDocument();
  });
});
