const CustomerInfoStep = ({
  customerInfo,
  setCustomerInfo,
  errors,
}: {
  customerInfo: any;
  setCustomerInfo: any;
  errors: any;
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold mt-8 mb-4">Información del Cliente</h2>
      <div className="grid gap-4">
        <div>
          <input
            className="border rounded px-3 py-2 w-full"
            name="name"
            placeholder="Nombre completo"
            type="text"
            value={customerInfo.name}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, name: e.target.value })
            }
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <input
            className="border rounded px-3 py-2 w-full"
            name="address"
            placeholder="Dirección"
            type="text"
            value={customerInfo.address}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, address: e.target.value })
            }
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>
        <div>
          <input
            className="border rounded px-3 py-2 w-full"
            name="phone"
            placeholder="Teléfono"
            type="text"
            value={customerInfo.phone}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, phone: e.target.value })
            }
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoStep;
