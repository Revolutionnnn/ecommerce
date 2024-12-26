import { Input } from "@nextui-org/input";

type CustomerInfoStepProps = {
  formData: { name: string; address: string; phone: string };
  setFormData: React.Dispatch<React.SetStateAction<{ name: string; address: string; phone: string }>>;
};

export default function CustomerInfoStep({ formData, setFormData }: CustomerInfoStepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid gap-4">
      <Input
        name="name"
        placeholder="Nombre completo"
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        name="address"
        placeholder="Dirección"
        value={formData.address}
        onChange={handleChange}
      />
      <Input
        name="phone"
        placeholder="Teléfono"
        value={formData.phone}
        onChange={handleChange}
      />
    </div>
  );
}
