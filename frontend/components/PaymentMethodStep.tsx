type PaymentMethodStepProps = {
  selectedMethod: string;
  setSelectedMethod: React.Dispatch<React.SetStateAction<string>>;
};

export default function PaymentMethodStep({ selectedMethod, setSelectedMethod }: PaymentMethodStepProps) {
  return (
    <div className="grid gap-4">
      <label>
        <input
          className="mr-2"
          type="radio"
          value="credit"
          checked={selectedMethod === "credit"}
          onChange={() => setSelectedMethod("credit")}
        />
        Tarjeta de Crédito
      </label>
      <label>
        <input
          className="mr-2"
          type="radio"
          value="paypal"
          checked={selectedMethod === "paypal"}
          onChange={() => setSelectedMethod("paypal")}
        />
        PayPal
      </label>
      <label>
        <input
          className="mr-2"
          type="radio"
          value="bank"
          checked={selectedMethod === "bank"}
          onChange={() => setSelectedMethod("bank")}
        />
        Transferencia Bancaria
      </label>
    </div>
  );
}
