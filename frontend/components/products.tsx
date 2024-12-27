"use client";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";

type Product = {
  reference: string;
  title: string;
  price: string;
  image: string;
};

type ProductsListProps = {
  products: Product[];
};

export const ProductsList = ({ products }: ProductsListProps) => {
  const router = useRouter();

  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Card
          key={product.reference}
          className="transition-transform hover:scale-105 cursor-pointer"
          shadow="sm"
          onClick={() => router.push(`/product/${product.reference}`)} // Redirige a la página de detalles
        >
          <CardBody className="overflow-visible p-0">
            <Image
              alt={product.title}
              className="w-full object-cover h-[200px]"
              radius="lg"
              shadow="sm"
              src={product.image}
              width="100%"
            />
          </CardBody>
          <CardFooter className="flex flex-col items-center gap-2">
            <div className="w-full flex justify-between items-center">
              <b>{product.title}</b>
              <p className="text-default-500">{product.price}</p>
            </div>
            <Button
              className="w-full"
              color="success"
              variant="shadow"
              onPress={() => router.push(`/product/${product.reference}`)}
            >
              Comprar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
