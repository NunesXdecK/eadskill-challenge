import React from "react";
import { useAlert } from "@/hooks/use-alert";
import { AlertContextType } from "@/contexts/alert-context";

interface WithAlertProps {
  showAlert: AlertContextType["showAlert"];
}

const withAlert = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithAlertProps>
) => {
  return (props: P) => {
    const { showAlert } = useAlert();
    return <WrappedComponent {...props} showAlert={showAlert} />;
  };
};

export default withAlert;
