import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductsList } from "../products";
import "@testing-library/jest-dom";

// Creamos nuestro mock de router.push
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock de los componentes de NextUI para evitar errores en el test
jest.mock("@nextui-org/react", () => ({
  ...jest.requireActual("@nextui-org/react"),
  Card: ({ children, onPress, ...props }) => (
    <div role="button" onClick={onPress} {...props}>
      {children}
    </div>
  ),
  CardBody: ({ children }) => <div>{children}</div>,
  CardFooter: ({ children }) => <div>{children}</div>,
  Image: ({ alt, src }) => <img alt={alt} src={src} />,
}));

describe("ProductsList Component", () => {
  test("llama a router.push al hacer clic en el card", () => {
    // Usamos EXACTAMENTE las propiedades que maneja tu componente
    const products = [
      { 
        id: "1", 
        titulo: "Producto 1",
        basePrice: "10000",
        imagenUrl: "",
      },
    ];

    render(<ProductsList products={products} />);

    const productCard = screen.getByRole("button", { 
      name: /ver detalles del producto producto 1/i 
    });

    fireEvent.click(productCard);

    expect(mockPush).toHaveBeenCalledWith("/product/1");
  });
});
