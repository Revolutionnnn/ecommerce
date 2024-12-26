import { useState } from "react";

export const CustomerInfoStep = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="grid gap-4">
      <input
        className="border rounded px-3 py-2"
        name="name"
        placeholder="Nombre completo"
        type="text"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        className="border rounded px-3 py-2"
        name="address"
        placeholder="Dirección"
        type="text"
        value={formData.address}
        onChange={handleChange}
      />
      <input
        className="border rounded px-3 py-2"
        name="phone"
        placeholder="Teléfono"
        type="text"
        value={formData.phone}
        onChange={handleChange}
      />
    </form>
  );
};
