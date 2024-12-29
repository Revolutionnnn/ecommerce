// __tests__/ConfirmationStep.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ConfirmationStep from "../confirmationStep";

describe("ConfirmationStep", () => {
  test("renders customer information and totals correctly", () => {
    const mockCustomerInfo = {
      name: "John Doe",
      address: "123 Main St",
      phone: "123-456-7890",
    };
    const mockTotal = 50000;

    render(
      <ConfirmationStep
        customerInfo={mockCustomerInfo}
        total={mockTotal}
      />
    );

    // Verificar que se muestren los datos del cliente
    expect(screen.getByText("Nombre:")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    expect(screen.getByText("Dirección:")).toBeInTheDocument();
    expect(screen.getByText("123 Main St")).toBeInTheDocument();

    expect(screen.getByText("Teléfono:")).toBeInTheDocument();
    expect(screen.getByText("123-456-7890")).toBeInTheDocument();

    // Verificar que se muestren los cálculos correctamente
    expect(screen.getByText("Subtotal:")).toBeInTheDocument();
    expect(screen.getByText("$50000.00")).toBeInTheDocument();

    expect(screen.getByText("Costo de envío:")).toBeInTheDocument();
    expect(screen.getByText("$10000.00")).toBeInTheDocument();

    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("$60000.00")).toBeInTheDocument();
  });
});
