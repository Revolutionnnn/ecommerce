import React from "react";
import { render, screen } from "@testing-library/react";

import Stepper from "../stepper";

describe("Stepper Component", () => {
  test("renderiza los pasos y resalta el activo", () => {
    const steps = ["Paso 1", "Paso 2", "Paso 3"];
    const activeStep = 1;

    render(<Stepper activeStep={activeStep} steps={steps} />);

    steps.forEach((_, index) => {
      expect(screen.getByText(index + 1)).toBeInTheDocument();
    });

    const activeStepElement = screen.getByText("2");

    expect(activeStepElement).toHaveClass("bg-green-500");
  });
});
