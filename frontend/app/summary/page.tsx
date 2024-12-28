"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import cardValidator from "card-validator";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { RootState } from "@/store/store";
import Stepper from "@/components/stepper";
import CustomerInfoStep from "@/components/customerInfoStep";
import PaymentMethodStep from "@/components/paymentMethodStep";
import ConfirmationStep from "@/components/confirmationStep";
import { makePayment } from "@/services/payment";
import { clearCart } from "@/store/features/cartSlice";

export default function SummaryPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();
  const dispatch = useDispatch();

  const steps = ["Productos y Datos", "Método de Pago", "Confirmación"];
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState<any>({});
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    paymentMethod: "creditCard",
  });
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expMonth: "",
    expYear: "",
    cvc: "",
  });
  const [cardType, setCardType] = useState<string | null>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalMessage, setModalMessage] = useState("Pendiente...");

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  const handleCardNumberChange = (value: string) => {
    setCardInfo({ ...cardInfo, number: value });
    const validation = cardValidator.number(value);

    if (!validation.isValid) {
      setErrors({ ...errors, cardNumber: "Número de tarjeta no válido." });
    } else {
      setErrors({ ...errors, cardNumber: null });
    }

    setCardType(validation.card?.type || null);
  };

  const handleNext = async () => {
    let hasErrors = false;
    const newErrors: any = {};

    if (
      !customerInfo.name ||
      customerInfo.name.length < 1 ||
      customerInfo.name.length > 50
    ) {
      newErrors.name = "El nombre debe tener entre 1 y 50 caracteres.";
      hasErrors = true;
    }

    if (
      !customerInfo.address ||
      customerInfo.address.length < 1 ||
      customerInfo.address.length > 50
    ) {
      newErrors.address = "La dirección debe tener entre 1 y 50 caracteres.";
      hasErrors = true;
    }

    if (
      !/^\d+$/.test(customerInfo.phone) ||
      customerInfo.phone.length < 7 ||
      customerInfo.phone.length > 15
    ) {
      newErrors.phone =
        "El teléfono debe ser un número y tener entre 7 y 15 dígitos.";
      hasErrors = true;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email) ||
      customerInfo.email.length > 50
    ) {
      newErrors.email = "Por favor ingrese un correo electrónico válido.";
      hasErrors = true;
    }

    if (!customerInfo.paymentMethod) {
      newErrors.paymentMethod = "Por favor seleccione un método de pago.";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);

      return;
    }

    if (activeStep === steps.length - 1) {
      onOpen();
      setModalMessage("Procesando compra...");

      try {
        const filteredCartItems = cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        }));

        const fullData = {
          number: cardInfo.number,
          expMonth: cardInfo.expMonth,
          expYear: cardInfo.expYear,
          cvc: cardInfo.cvc,
          customerInfo: {
            name: customerInfo.name,
            address: customerInfo.address,
            phone: customerInfo.phone,
            email: customerInfo.email || "correo@example.com",
          },
          cartItems: filteredCartItems,
          total,
        };

        const result = await makePayment(fullData);

        setModalMessage(result.message);
        if (result.success) {
          dispatch(clearCart());
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      } catch (error) {
        setModalMessage("Hubo un problema inesperado.");
      }

      return;
    }

    setErrors({});
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalMessage.includes("éxito") ? "Éxito" : "Procesando"}
              </ModalHeader>
              <ModalBody>
                <p>{modalMessage}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
