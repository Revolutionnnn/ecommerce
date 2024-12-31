import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { CartDropdown } from "../cartDropdown";

const mockStore = configureStore([]);

describe("CartDropdown", () => {
  test("se renderiza correctamente cuando está vacío", () => {
    const store = mockStore({ cart: { items: [] } });

    render(
      <Provider store={store}>
        <CartDropdown />
      </Provider>,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("muestra un ítem cuando hay productos en el carrito", () => {
    const store = mockStore({
      cart: { items: [{ id: "1", title: "Mi Producto", quantity: 1 }] } 
    });

    render(
      <Provider store={store}>
        <CartDropdown />
      </Provider>,
    );
  });
});
