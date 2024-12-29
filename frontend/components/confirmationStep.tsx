const ConfirmationStep = ({
  customerInfo,
  total,
}: {
  customerInfo: any;
  total: number;
}) => {
  const shippingCost = 10000;
  const grandTotal = total + shippingCost;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Confirmación</h2>
      <p>
        <strong>Nombre:</strong> {customerInfo.name}
      </p>
      <p>
        <strong>Dirección:</strong> {customerInfo.address}
      </p>
      <p>
        <strong>Teléfono:</strong> {customerInfo.phone}
      </p>
      <div className="mt-4">
        <p>
          <strong>Subtotal:</strong> ${total.toFixed(2)}
        </p>
        <p>
          <strong>Costo de envío:</strong> ${shippingCost.toFixed(2)}
        </p>
        <p className="mt-2">
          <strong>Total:</strong> ${grandTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ConfirmationStep;
