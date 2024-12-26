type ConfirmationStepProps = {
  cartItems: Array<{
    id: string;
    title: string;
    quantity: number;
    price: number;
  }>;
};

export const ConfirmationStep = ({ cartItems }: ConfirmationStepProps) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  return (
    <div>
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
      <p className="text-lg font-bold mt-4">Total: ${total.toFixed(2)}</p>
    </div>
  );
};