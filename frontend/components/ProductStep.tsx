type ProductStepProps = {
  cartItems: Array<{
    id: string;
    title: string;
    quantity: number;
    price: number;
  }>;
};

export const ProductStep = ({ cartItems }: ProductStepProps) => {
  return (
    <div>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center mb-4"
            >
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
};