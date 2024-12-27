import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

type CartState = {
  items: CartItem[];
};

const loadCartFromLocalStorage = (): CartState => {
  try {
    if (typeof window === "undefined") {
      return { items: [] };
    }

    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return { items: [] };
    }

    return JSON.parse(serializedState);
  } catch (error) {
    console.error(
      "Error cargando el estado del carrito desde localStorage:",
      error,
    );

    return { items: [] };
  }
};


const saveCartToLocalStorage = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem("cart", serializedState);
  } catch (error) {
    console.error(
      "Error guardando el estado del carrito en localStorage:",
      error,
    );
  }
};

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
