import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductsList } from "../products";
import "@testing-library/jest-dom";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@nextui-org/react", () => ({
  ...jest.requireActual("@nextui-org/react"),
  Card: ({ children, onPress }) => (
    <div role="button" onClick={onPress}>
      {children}
    </div>
  ),
  CardBody: ({ children }) => <div>{children}</div>,
  CardFooter: ({ children }) => <div>{children}</div>,
  Image: ({ alt, src }) => <img alt={alt} src={src} />,
}));

describe("ProductsList Component", () => {
  test("llama a router.push al hacer clic en un producto", () => {
    const products = [
      { id: "1", title: "Producto 1", price: "$10", image: "" },
    ];

    render(<ProductsList products={products} />);

    const productCard = screen.getByRole("button", { name: /producto 1/i });
    fireEvent.click(productCard);

    expect(mockPush).toHaveBeenCalledWith("/product/1");
  });
});
