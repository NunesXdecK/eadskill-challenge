import React from "react";
import { render } from "../../setup-tests";
import { withAlert } from "../../../src/components/hoc/with-alert";
import { useAlert } from "../../../src/hooks/use-alert";
import { AlertContextType } from "../../../src/contexts/alert-context";

jest.mock("../../../src/hooks/use-alert");

const mockShowAlert = jest.fn();
const mockUseAlert = useAlert as jest.MockedFunction<typeof useAlert>;

const MockComponent: React.FC<{ showAlert: AlertContextType["showAlert"] }> = ({
  showAlert,
}) => {
  showAlert("Test message", "success");
  return <div>MockComponent</div>;
};

describe("withAlert", () => {
  beforeEach(() => {
    mockUseAlert.mockReturnValue({ showAlert: mockShowAlert });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should inject showAlert prop into wrapped component", () => {
    const WrappedComponent = withAlert(MockComponent);
    render(<WrappedComponent />);

    expect(mockUseAlert).toHaveBeenCalled();
    expect(mockShowAlert).toHaveBeenCalledWith("Test message", "success");
  });

  it("should render the wrapped component", () => {
    const WrappedComponent = withAlert(MockComponent);
    const { getByText } = render(<WrappedComponent />);

    expect(getByText("MockComponent")).toBeInTheDocument();
  });
});
