"use client";

import { useSelector } from "react-redux";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

import { RootState } from "@/store/store";
import { ProductStep } from "@/components/ProductStep";
import { CustomerInfoStep } from "@/components/CustomerInfoStep";
import { PaymentMethodStep } from "@/components/PaymentMethodStep";
import { ConfirmationStep } from "@/components/ConfirmationStep";

export default function SummaryPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Proceso de Compra</h1>

      <Accordion>
        <AccordionItem key="products" title="Productos Seleccionados">
          <ProductStep cartItems={cartItems} />
        </AccordionItem>

        <AccordionItem key="customer-info" title="Información del Cliente">
          <CustomerInfoStep />
        </AccordionItem>

        <AccordionItem key="payment-method" title="Método de Pago">
          <PaymentMethodStep />
        </AccordionItem>

        <AccordionItem key="confirmation" title="Confirmación">
          <ConfirmationStep cartItems={cartItems} />
        </AccordionItem>
      </Accordion>

      {/* Botón para finalizar */}
      <div className="flex justify-end mt-8">
        <Button
          color="success"
          variant="shadow"
          onPress={() => console.log("Compra Completada")}
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
}
