"use client";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";

type Product = {
  id: string;
  titulo: string;
  basePrice: string;
  imagenUrl: string;
};

type ProductsListProps = {
  products: Product[];
};

export const ProductsList = ({ products }: ProductsListProps) => {
  const router = useRouter();

  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <Card
          key={`${product.id}-${index}`}
          className="transition-transform hover:scale-105 cursor-pointer"
          shadow="sm"
          onPress={() => router.push(`/product/${product.id}`)}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              alt={product.titulo}
              className="w-full object-cover h-[200px]"
              radius="lg"
              shadow="sm"
              src={product.imagenUrl || undefined}
              width="100%"
            />
          </CardBody>
          <CardFooter className="flex flex-col items-center gap-2">
            <div className="w-full flex justify-between items-center">
              <b>{product.titulo}</b>
              <p className="text-default-500">
                {new Intl.NumberFormat("es-ES", {
                  style: "currency",
                  currency: "COP",
                }).format(Number(product.basePrice))}
              </p>
            </div>
            <Button
              key={`${product.id}-${index}`}
              className="w-full"
              color="success"
              variant="shadow"
              onPress={() => router.push(`/product/${product.id}`)}
            >
              Comprar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
