"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { useSelector } from "react-redux";
import cardValidator from "card-validator";

import { RootState } from "@/store/store";
import Stepper from "@/components/stepper";
import CustomerInfoStep from "@/components/customerInfoStep";
import PaymentMethodStep from "@/components/paymentMethodStep";
import ConfirmationStep from "@/components/confirmationStep";

export default function SummaryPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const steps = ["Productos y Datos", "Método de Pago", "Confirmación"];
  const [activeStep, setActiveStep] = useState(0);

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [cardInfo, setCardInfo] = useState({
    number: "",
    expMonth: "",
    expYear: "",
    cvc: "",
  });

  const [errors] = useState<any>({});
  const [cardType, setCardType] = useState<string | null>(null);

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  const handleCardNumberChange = (value: string) => {
    setCardInfo({ ...cardInfo, number: value });
    const validation = cardValidator.number(value);

    setCardType(validation.card?.type || null);
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Proceso de Compra</h1>

      <Stepper activeStep={activeStep} steps={steps} />

      <div className="mt-8">
        {activeStep === 0 && (
          <CustomerInfoStep
            customerInfo={customerInfo}
            errors={errors}
            setCustomerInfo={setCustomerInfo}
          />
        )}
        {activeStep === 1 && (
          <PaymentMethodStep
            cardInfo={cardInfo}
            cardType={cardType}
            errors={errors}
            handleCardNumberChange={handleCardNumberChange}
            setCardInfo={setCardInfo}
          />
        )}
        {activeStep === 2 && (
          <ConfirmationStep customerInfo={customerInfo} total={total} />
        )}
      </div>

      <div className="flex justify-between mt-6">
        <Button
          color="primary"
          disabled={activeStep === 0}
          variant="flat"
          onPress={handleBack}
        >
          Atrás
        </Button>
        <Button color="success" variant="shadow" onPress={handleNext}>
          {activeStep === steps.length - 1 ? "Confirmar Compra" : "Siguiente"}
        </Button>
      </div>
    </div>
  );
}
