import React, { ComponentType } from "react";
import { render, fireEvent, screen } from "../../setup-tests";
import { withLeftModal } from "../../../src/components/hoc/with-left-modal";

const MockWrappedComponent: React.FC<{
  disabled?: boolean;
  onOpen?: () => void;
}> = ({ disabled, onOpen }) => (
  <button disabled={disabled} onClick={onOpen}>
    Open Modal
  </button>
);

const MockModalBody: React.FC<{
  disabled?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}> = ({ disabled, onClose, onConfirm }) => (
  <div>
    <button onClick={onClose}>Close</button>
    <button disabled={disabled} onClick={onConfirm}>
      Confirm
    </button>
  </div>
);

describe("withLeftModal", () => {
  it("should render the wrapped component", () => {
    const ComponentWithModal = withLeftModal(
      MockWrappedComponent,
      MockModalBody as unknown as ComponentType
    );
    render(<ComponentWithModal />);

    expect(screen.getByText("Open Modal")).toBeInTheDocument();
  });

  it("should open the modal when the wrapped component is clicked", () => {
    const ComponentWithModal = withLeftModal(
      MockWrappedComponent,
      MockModalBody as unknown as ComponentType
    );
    render(<ComponentWithModal />);

    fireEvent.click(screen.getByText("Open Modal"));

    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("should close the modal when the close button is clicked", () => {
    const ComponentWithModal = withLeftModal(
      MockWrappedComponent,
      MockModalBody as unknown as ComponentType
    );
    render(<ComponentWithModal />);

    fireEvent.click(screen.getByText("Open Modal"));
    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByText("Close")).not.toBeInTheDocument();
    expect(screen.queryByText("Confirm")).not.toBeInTheDocument();
  });

  it("should call onConfirm and close the modal when confirm is clicked", async () => {
    const mockOnConfirm = jest.fn().mockResolvedValue(undefined);
    const ComponentWithModal = withLeftModal(
      MockWrappedComponent,
      MockModalBody as unknown as ComponentType
    );
    render(<ComponentWithModal onConfirm={mockOnConfirm} />);

    fireEvent.click(screen.getByText("Open Modal"));
    fireEvent.click(screen.getByText("Confirm"));

    expect(mockOnConfirm).toHaveBeenCalled();
    expect(screen.getByText("Confirm")).toBeDisabled();
  });

  it("should close the modal when clicking outside", () => {
    const ComponentWithModal = withLeftModal(
      MockWrappedComponent,
      MockModalBody as unknown as ComponentType
    );
    render(<ComponentWithModal />);

    fireEvent.click(screen.getByText("Open Modal"));
    fireEvent.blur(screen.getByRole("button", { name: "Open Modal" }));

    expect(screen.queryByText("Close")).not.toBeInTheDocument();
    expect(screen.queryByText("Confirm")).not.toBeInTheDocument();
  });
});
