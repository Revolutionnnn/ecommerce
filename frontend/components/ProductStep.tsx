import { Button } from "@nextui-org/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function ProductStep() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-4">
              <span>{item.title}</span>
              <span>
                {item.quantity} x ${item.price}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay productos en el carrito.</p>
      )}
    </div>
  );
}
