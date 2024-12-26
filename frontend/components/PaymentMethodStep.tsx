export const PaymentMethodStep = () => {
  return (
    <div>
      <div className="grid gap-4">
        <label>
          <input className="mr-2" name="payment" type="radio" value="credit" />
          Tarjeta de Crédito
        </label>
        <label>
          <input className="mr-2" name="payment" type="radio" value="paypal" />
          PayPal
        </label>
        <label>
          <input className="mr-2" name="payment" type="radio" value="bank" />
          Transferencia Bancaria
        </label>
      </div>
    </div>
  );
};
