// __tests__/CustomerInfoStep.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomerInfoStep from "../customerInfoStep";

describe("CustomerInfoStep", () => {
  test("renders all inputs and placeholders", () => {
    render(
      <CustomerInfoStep
        customerInfo={{
          name: "",
          address: "",
          phone: "",
          email: "",
          paymentMethod: "creditCard",
        }}
        setCustomerInfo={jest.fn()}
        errors={{}}
      />
    );

    // Verifica que todos los campos estén presentes
    expect(screen.getByPlaceholderText("Nombre completo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Dirección")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Teléfono")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("displays error messages when provided", () => {
    render(
      <CustomerInfoStep
        customerInfo={{
          name: "",
          address: "",
          phone: "",
          email: "",
          paymentMethod: "creditCard",
        }}
        setCustomerInfo={jest.fn()}
        errors={{
          name: "El nombre es requerido",
          address: "La dirección es requerida",
          phone: "El teléfono es requerido",
          email: "El correo electrónico es requerido",
          paymentMethod: "El método de pago es requerido",
        }}
      />
    );

    // Verifica que los mensajes de error se muestren
    expect(screen.getByText("El nombre es requerido")).toBeInTheDocument();
    expect(screen.getByText("La dirección es requerida")).toBeInTheDocument();
    expect(screen.getByText("El teléfono es requerido")).toBeInTheDocument();
    expect(screen.getByText("El correo electrónico es requerido")).toBeInTheDocument();
    expect(screen.getByText("El método de pago es requerido")).toBeInTheDocument();
  });

  test("calls setCustomerInfo on input changes", () => {
    const mockSetCustomerInfo = jest.fn();

    render(
      <CustomerInfoStep
        customerInfo={{
          name: "",
          address: "",
          phone: "",
          email: "",
          paymentMethod: "creditCard",
        }}
        setCustomerInfo={mockSetCustomerInfo}
        errors={{}}
      />
    );

    // Simula cambios en los inputs
    fireEvent.change(screen.getByPlaceholderText("Nombre completo"), {
      target: { value: "John Doe" },
    });
    expect(mockSetCustomerInfo).toHaveBeenCalledWith({
      name: "John Doe",
      address: "",
      phone: "",
      email: "",
      paymentMethod: "creditCard",
    });

    fireEvent.change(screen.getByPlaceholderText("Dirección"), {
      target: { value: "123 Main St" },
    });
    expect(mockSetCustomerInfo).toHaveBeenCalledWith({
      name: "",
      address: "123 Main St",
      phone: "",
      email: "",
      paymentMethod: "creditCard",
    });

    fireEvent.change(screen.getByPlaceholderText("Teléfono"), {
      target: { value: "123-456-7890" },
    });
    expect(mockSetCustomerInfo).toHaveBeenCalledWith({
      name: "",
      address: "",
      phone: "123-456-7890",
      email: "",
      paymentMethod: "creditCard",
    });

    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
      target: { value: "john@example.com" },
    });
    expect(mockSetCustomerInfo).toHaveBeenCalledWith({
      name: "",
      address: "",
      phone: "",
      email: "john@example.com",
      paymentMethod: "creditCard",
    });
  });

  test("calls setCustomerInfo when payment method is changed", () => {
    const mockSetCustomerInfo = jest.fn();

    render(
      <CustomerInfoStep
        customerInfo={{
          name: "",
          address: "",
          phone: "",
          email: "",
          paymentMethod: "creditCard",
        }}
        setCustomerInfo={mockSetCustomerInfo}
        errors={{}}
      />
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "creditCard" },
    });
    expect(mockSetCustomerInfo).toHaveBeenCalledWith({
      name: "",
      address: "",
      phone: "",
      email: "",
      paymentMethod: "creditCard",
    });
  });
});
