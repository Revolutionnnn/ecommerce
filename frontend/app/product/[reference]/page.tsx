"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

type ProductDetailsProps = {
  params: { reference: string };
};

const mockProducts = [
  {
    reference: "P123",
    title: "Product 1",
    price: "$20",
    image: "https://via.placeholder.com/300x200",
    description: "This is an amazing product that you will love.",
    stock: 15,
  },
  {
    reference: "P456",
    title: "Product 2",
    price: "$30",
    image: "https://via.placeholder.com/300x200",
    description: "High-quality product for an affordable price.",
    stock: 5,
  },
];

export default function ProductDetails({ params }: ProductDetailsProps) {
  const router = useRouter();

  // Encuentra el producto por referencia
  const product = mockProducts.find((p) => p.reference === params.reference);

  if (!product) {
    return (
      <div className="text-center text-xl font-bold">
        Producto no encontrado
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 py-10 px-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardBody className="flex flex-col items-center">
          {/* Imagen centrada */}
          <Image
            alt={product.title}
            className="rounded-lg"
            height={200}
            objectFit="cover"
            src={product.image}
            width={300}
          />
          {/* Título y descripción */}
          <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
          <p className="text-gray-500 mt-2 text-center">
            {product.description}
          </p>
          <p className="text-2xl font-semibold mt-4 text-primary">
            {product.price}
          </p>
          {/* Stock disponible */}
          <p
            className={`text-lg mt-2 ${
              product.stock > 10 ? "text-green-600" : "text-red-600"
            } font-medium`}
          >
            {product.stock > 0
              ? `¡Quedan ${product.stock} en stock!`
              : "No disponible"}
          </p>
        </CardBody>
        <CardFooter>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium" htmlFor="quantity">
                Cantidad:
              </label>
              <input
                className="border rounded-lg px-2 py-1 w-16 text-center"
                defaultValue="1"
                disabled={product.stock === 0}
                id="quantity"
                max={product.stock}
                min="1"
                type="number"
              />
            </div>
            <Button
              className="w-full"
              color="primary"
              disabled={product.stock === 0}
              variant="shadow"
              onPress={() => console.log(`Added ${product.title} to cart`)}
            >
              Añadir al Carrito
            </Button>
            <Button
              className="w-full"
              color="success"
              disabled={product.stock === 0}
              variant="flat"
              onPress={() => console.log("Compra realizada")}
            >
              Comprar Ahora
            </Button>
          </div>
        </CardFooter>
      </Card>
      {/* Botón para volver */}
      <Button onPress={() => router.back()}>Volver</Button>
    </div>
  );
}
