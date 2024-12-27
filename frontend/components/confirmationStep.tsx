const ConfirmationStep = ({
  customerInfo,
  total,
}: {
  customerInfo: any;
  total: number;
}) => {
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
      <p className="mt-4">
        <strong>Total:</strong> ${total.toFixed(2)}
      </p>
    </div>
  );
};

export default ConfirmationStep;
