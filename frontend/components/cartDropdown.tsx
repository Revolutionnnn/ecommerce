"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { RootState } from "@/store/store";
import { removeFromCart } from "@/store/features/cartSlice";

export const CartDropdown = () => {
  const dispatch = useDispatch();
  const cartItemsFromRedux = useSelector(
    (state: RootState) => state.cart.items
  );
  const [cartItems, setCartItems] = useState<any[] | null>(null);
  const [isOpen, setIsOpen] = useState(false); // Usamos el estado aquí

  useEffect(() => {
    setCartItems(cartItemsFromRedux);
  }, [cartItemsFromRedux]);

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const TrashIcon = ({ onClick }: { onClick: () => void }) => (
    <svg
      className="h-5 w-5 text-danger cursor-pointer"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M19 7L5 7M10 11v6m4-6v6m-7 4h10a2 2V7H5v11a2 2 0 002 2zm3-16h4a2 2v1H9V3a2 2 0 012-2z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // Alternar el estado de apertura
  };

  return (
    <Dropdown isOpen={isOpen} onOpenChange={toggleDropdown}>
      <DropdownTrigger>
        <div className="relative cursor-pointer" role="button" tabIndex={0}>
          <svg
            className="h-6 w-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 3h18l-2 13H5L3 3zm7 13a3 3 0 106 0m-6 0H5m7 0h5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          {cartItems?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Carrito">
        {cartItems?.length > 0 ? (
          cartItems.map((item, index) => (
            <DropdownItem key={item.id || `item-${index}`}>
              <div className="flex items-center gap-3">
                {item.image ? (
                  <img
                    alt={item.title}
                    className="w-12 h-12 rounded-md object-cover"
                    src={item.image}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-md bg-gray-200 animate-pulse flex items-center justify-center" />
                )}
                <div className="flex-1">
                  <p className="font-bold text-sm">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    Cantidad: {item.quantity}
                  </p>
                </div>
                <TrashIcon onClick={() => handleRemoveItem(item.id)} />
              </div>
            </DropdownItem>
          ))
        ) : (
          <DropdownItem key="empty-cart" className="text-center">
            El carrito está vacío
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};
