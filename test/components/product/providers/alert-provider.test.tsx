import React from "react";
import { fireEvent, render, screen, waitFor } from "../../../setup-tests";
import { AlertProvider } from "../../../../src/components/providers/alert-provider";
import {
  AlertContext,
  AlertContextType,
} from "../../../../src/contexts/alert-context";
import { Alert } from "../../../../src/components/ui/alert/alert";

jest.mock("../../../../src/components/ui/alert/alert", () => ({
  Alert: ({ message, type }: { message: string; type: string }) => (
    <div data-testid="alert">{message}</div>
  ),
}));

const TestComponent = () => {
  const { showAlert } = React.useContext(AlertContext) as AlertContextType;
  return <button onClick={() => showAlert("Test Alert")}>Show Alert</button>;
};

describe("AlertProvider", () => {
  it("should render children", () => {
    render(
      <AlertProvider>
        <div>Test Child</div>
      </AlertProvider>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("should show an alert when showAlert is called", () => {
    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    fireEvent.click(screen.getByText("Show Alert"));

    expect(screen.getByText("Test Alert")).toBeInTheDocument();
  });

  it("should hide the alert after 3 seconds", async () => {
    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    fireEvent.click(screen.getByText("Show Alert"));

    expect(screen.getByText("Test Alert")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByText("Test Alert")).not.toBeInTheDocument();
      },
      { timeout: 4000 }
    );
  });
});
