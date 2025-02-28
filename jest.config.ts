import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  collectCoverage: true,
  setupFilesAfterEnv: ["<rootDir>/test/setup-tests.ts"],
  coverageReporters: ["text"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}", 
    "!src/contexts/*",
    "!src/app/layout.tsx",
    "!src/**/*.d.ts", 
    "!src/**/*.factory.{ts,tsx,js,jsx}",
    "!src/**/*.interface.{ts,tsx,js,jsx}",
    "!src/**/*.test.{ts,tsx,js,jsx}",
    "!src/**/*.{spec,test}.{ts,tsx,js,jsx}",
  ],
  coverageThreshold: {
    global: {
      statements: 30,
      lines: 30,
    },
  },
};

export default createJestConfig(config);
