import React, { HTMLAttributes } from "react";
import { render, screen } from "../setup-tests";
import * as componentsRenderTests from "./components-render";
import * as componentsRenderCssTests from "./components-render-css";

function getComponentName(component: React.ComponentType): string {
  return component.displayName || component.name || "UnknownComponent";
}

const componentRenderList = Object.values(
  componentsRenderTests
) as React.ComponentType[];

const componentRenderCssList = Object.values(
  componentsRenderCssTests
) as React.ComponentType[];

describe("Render and class tests", () => {
  componentRenderList.forEach(
    (Component: React.ComponentType<HTMLAttributes<HTMLDivElement>>) => {
      const componentName = getComponentName(Component);
      describe(componentName, () => {
        it(`${componentName} renders`, () => {
          render(<Component data-testid="test-component">Teste</Component>);
          const renderedComponent = screen.getByTestId("test-component");
          expect(renderedComponent).toBeInTheDocument();
        });

        it(`${componentName} render children correctly`, () => {
          render(<Component data-testid="test-component">Teste</Component>);
          const renderedComponent = screen.getByTestId("test-component");
          expect(renderedComponent).toHaveTextContent("Teste");
        });
      });
    }
  );

  componentRenderCssList.forEach(
    (Component: React.ComponentType<HTMLAttributes<HTMLDivElement>>) => {
      const componentName = getComponentName(Component);
      describe(componentName, () => {
        it(`${componentName} renders`, () => {
          render(<Component data-testid="test-component">Teste</Component>);
          const renderedComponent = screen.getByTestId("test-component");
          expect(renderedComponent).toBeInTheDocument();
        });

        test(`${componentName} render children correctly`, () => {
          render(<Component data-testid="test-component">Teste</Component>);
          const renderedComponent = screen.getByTestId("test-component");
          expect(renderedComponent).toHaveTextContent("Teste");
        });

        it(`${componentName} render css correctly`, () => {
          const className = "minha-classe-css";
          render(
            <Component data-testid="test-component" className={className}>
              Teste
            </Component>
          );
          const renderedComponent = screen.getByTestId("test-component");
          expect(renderedComponent).toHaveClass(className);
        });
      });
    }
  );
});
