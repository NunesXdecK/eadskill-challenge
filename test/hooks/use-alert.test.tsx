import React from "react";
import { renderHook, act } from "../setup-tests";
import { useAlert } from "../../src/hooks/use-alert";
import {
  AlertContext,
  AlertContextType,
} from "../../src/contexts/alert-context";

describe("useAlert", () => {
  it("should return the alert context", () => {
    const mockContext = { showAlert: jest.fn() };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AlertContext.Provider value={mockContext}>
        {children}
      </AlertContext.Provider>
    );

    const { result } = renderHook(() => useAlert(), { wrapper });

    expect(result.current).toEqual(mockContext);
  });

  it("should throw an error if used outside AlertProvider", () => {
    let errorMessage;
    try {
      renderHook(() => useAlert());
    } catch (error: unknown) {
      errorMessage = (error as unknown as Error).message;
    }
    expect(errorMessage).toBe("useAlert must be used within an AlertProvider");
  });
});
