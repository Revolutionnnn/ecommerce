// __tests__/PaymentMethodStep.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentMethodStep from "../paymentMethodStep";

describe("PaymentMethodStep", () => {
  test("renders placeholders correctly", () => {
    render(
      <PaymentMethodStep
        cardInfo={{ number: "", expMonth: "", expYear: "", cvc: "" }}
        setCardInfo={jest.fn()}
        errors={{}}
        cardType={null}
        handleCardNumberChange={jest.fn()}
      />
    );

    expect(screen.getByPlaceholderText("Número de Tarjeta")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Mes de Expiración (MM)")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Año de Expiración (YY)")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("CVC")).toBeInTheDocument();
  });

  test("calls handleCardNumberChange when card number input changes", () => {
    const mockHandleCardNumberChange = jest.fn();

    render(
      <PaymentMethodStep
        cardInfo={{ number: "", expMonth: "", expYear: "", cvc: "" }}
        setCardInfo={jest.fn()}
        errors={{}}
        cardType={null}
        handleCardNumberChange={mockHandleCardNumberChange}
      />
    );

    const cardNumberInput = screen.getByPlaceholderText("Número de Tarjeta");

    fireEvent.change(cardNumberInput, { target: { value: "4111111111111111" } });
    expect(mockHandleCardNumberChange).toHaveBeenCalledWith("4111111111111111");
  });

  test("calls setCardInfo when expiration month input changes", () => {
    const mockSetCardInfo = jest.fn();

    render(
      <PaymentMethodStep
        cardInfo={{ number: "", expMonth: "", expYear: "", cvc: "" }}
        setCardInfo={mockSetCardInfo}
        errors={{}}
        cardType={null}
        handleCardNumberChange={jest.fn()}
      />
    );

    const expMonthInput = screen.getByPlaceholderText("Mes de Expiración (MM)");

    fireEvent.change(expMonthInput, { target: { value: "12" } });
    expect(mockSetCardInfo).toHaveBeenCalledWith({
      number: "",
      expMonth: "12",
      expYear: "",
      cvc: "",
    });
  });

  test("displays error messages when errors are provided", () => {
    render(
      <PaymentMethodStep
        cardInfo={{ number: "", expMonth: "", expYear: "", cvc: "" }}
        setCardInfo={jest.fn()}
        errors={{
          number: "Número inválido",
          expMonth: "Mes inválido",
          expYear: "Año inválido",
          cvc: "CVC inválido",
        }}
        cardType={null}
        handleCardNumberChange={jest.fn()}
      />
    );

    expect(screen.getByText("Número inválido")).toBeInTheDocument();
    expect(screen.getByText("Mes inválido")).toBeInTheDocument();
    expect(screen.getByText("Año inválido")).toBeInTheDocument();
    expect(screen.getByText("CVC inválido")).toBeInTheDocument();
  });

  test("displays the correct card type image", () => {
    const { rerender } = render(
      <PaymentMethodStep
        cardInfo={{ number: "", expMonth: "", expYear: "", cvc: "" }}
        setCardInfo={jest.fn()}
        errors={{}}
        cardType="visa"
        handleCardNumberChange={jest.fn()}
      />
    );

    expect(screen.getByAltText("Visa")).toBeInTheDocument();

    rerender(
      <PaymentMethodStep
        cardInfo={{ number: "", expMonth: "", expYear: "", cvc: "" }}
        setCardInfo={jest.fn()}
        errors={{}}
        cardType="mastercard"
        handleCardNumberChange={jest.fn()}
      />
    );

    expect(screen.getByAltText("Mastercard")).toBeInTheDocument();
  });
});
