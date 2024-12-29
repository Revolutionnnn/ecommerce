import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { CartDropdown } from "../cartDropdown";

const mockStore = configureStore([]);

describe("CartDropdown", () => {
  test("se renderiza correctamente", () => {
    const store = mockStore({ cart: { items: [] } });

    render(
      <Provider store={store}>
        <CartDropdown />
      </Provider>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
