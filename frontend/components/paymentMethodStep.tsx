
const PaymentMethodStep = ({
  cardInfo,
  setCardInfo,
  errors,
  cardType,
  handleCardNumberChange,
}: {
  cardInfo: any;
  setCardInfo: any;
  errors: any;
  cardType: string | null;
  handleCardNumberChange: (value: string) => void;
}) => {
  const handleInstallmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCardInfo({
      ...cardInfo,
      installments: Number(event.target.value),
    });
  };

  const availableInstallments = [1, 3, 6, 12];

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Método de Pago</h2>
      <div className="grid gap-4">
        <div className="relative">
          <input
            className="border rounded px-3 py-2 w-full"
            placeholder="Número de Tarjeta"
            type="text"
            value={cardInfo.number}
            onChange={(e) => handleCardNumberChange(e.target.value)}
          />
          {errors.number && (
            <p className="text-red-500 text-sm">{errors.number}</p>
          )}

          <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
            {cardType === "visa" && (
              <img alt="Visa" className="w-10 h-6" src="visa.png" />
            )}
            {cardType === "mastercard" && (
              <img alt="Mastercard" className="w-10 h-6" src="mastercard.png" />
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Mes de Expiración (MM)"
              type="text"
              value={cardInfo.expMonth}
              onChange={(e) =>
                setCardInfo({ ...cardInfo, expMonth: e.target.value })
              }
            />
            {errors.expMonth && (
              <p className="text-red-500 text-sm">{errors.expMonth}</p>
            )}
          </div>
          <div className="w-1/2">
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Año de Expiración (YY)"
              type="text"
              value={cardInfo.expYear}
              onChange={(e) =>
                setCardInfo({ ...cardInfo, expYear: e.target.value })
              }
            />
            {errors.expYear && (
              <p className="text-red-500 text-sm">{errors.expYear}</p>
            )}
          </div>
        </div>

        <div>
          <input
            className="border rounded px-3 py-2 w-full"
            placeholder="CVC"
            type="text"
            value={cardInfo.cvc}
            onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value })}
          />
          {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc}</p>}
        </div>

        {/* Select para elegir el número de cuotas */}
        <div className="mt-4">
          <label
            htmlFor="installments"
            className="block text-sm font-medium mb-2"
          >
            Número de cuotas
          </label>
          <select
            id="installments"
            value={cardInfo.installments || 1} // Asigna el valor por defecto de 1 si no existe
            onChange={handleInstallmentChange}
            className="border rounded px-3 py-2 w-full"
          >
            {availableInstallments.map((installment) => (
              <option key={installment} value={installment}>
                {installment} cuotas
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodStep;
