"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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

  const handleNext = () => {
    if (activeStep === 0) {
      if (!customerInfo.name || !customerInfo.address || !customerInfo.phone) {
        alert("Por favor completa todos los campos de información del cliente.");
        return;
      }
    }

    if (activeStep === 1) {
      if (!cardInfo.number || !cardInfo.expMonth || !cardInfo.expYear || !cardInfo.cvc) {
        alert("Por favor completa los datos de la tarjeta.");
        return;
      }
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Proceso de Compra</h1>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((label, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activeStep >= index ? "bg-green-500" : "bg-gray-300"
              } text-white`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className="w-12 h-1 bg-gray-300 mx-2">
                <div
                  className={`h-1 ${
                    activeStep > index ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        {/* Paso 1: Productos y Datos */}
        {activeStep === 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Productos Seleccionados</h2>
            {cartItems.length > 0 ? (
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
            ) : (
              <p>No hay productos en el carrito.</p>
            )}
            <h2 className="text-lg font-bold mt-8 mb-4">Información del Cliente</h2>
            <div className="grid gap-4">
              <input
                className="border rounded px-3 py-2"
                name="name"
                placeholder="Nombre completo"
                type="text"
                value={customerInfo.name}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, name: e.target.value })
                }
              />
              <input
                className="border rounded px-3 py-2"
                name="address"
                placeholder="Dirección"
                type="text"
                value={customerInfo.address}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, address: e.target.value })
                }
              />
              <input
                className="border rounded px-3 py-2"
                name="phone"
                placeholder="Teléfono"
                type="text"
                value={customerInfo.phone}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, phone: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {/* Paso 2: Método de Pago */}
        {activeStep === 1 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Método de Pago</h2>
            <div className="grid gap-4">
              <input
                className="border rounded px-3 py-2"
                placeholder="Número de Tarjeta"
                type="text"
                value={cardInfo.number}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, number: e.target.value })
                }
              />
              <div className="flex gap-4">
                <input
                  className="border rounded px-3 py-2 w-1/2"
                  placeholder="Mes de Expiración (MM)"
                  type="text"
                  value={cardInfo.expMonth}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, expMonth: e.target.value })
                  }
                />
                <input
                  className="border rounded px-3 py-2 w-1/2"
                  placeholder="Año de Expiración (YY)"
                  type="text"
                  value={cardInfo.expYear}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, expYear: e.target.value })
                  }
                />
              </div>
              <input
                className="border rounded px-3 py-2"
                placeholder="CVC"
                type="text"
                value={cardInfo.cvc}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, cvc: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {/* Paso 3: Confirmación */}
        {activeStep === 2 && (
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
        )}
      </div>

      {/* Botones de Navegación */}
      <div className="flex justify-between mt-6">
        <Button
          color="primary"
          variant="flat"
          disabled={activeStep === 0}
          onPress={handleBack}
        >
          Atrás
        </Button>
        <Button
          color="success"
          variant="shadow"
          onPress={handleNext}
        >
          {activeStep === steps.length - 1 ? "Confirmar Compra" : "Siguiente"}
        </Button>
      </div>
    </div>
  );
}
