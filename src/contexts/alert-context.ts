import React, { createContext, useState, ReactNode, useContext } from "react";

export type AlertType = "success" | "error";

export interface AlertContextType {
  showAlert: (message: string, type?: AlertType) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);
