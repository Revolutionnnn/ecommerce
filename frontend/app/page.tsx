"use client";

import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

import { ProductsList } from "@/components/products";
import { title, subtitle } from "@/components/primitives";

const products = [
  {
    reference: "P123",
    title: "Product 1",
    price: "$20",
    image: "https://via.placeholder.com/300x200",
    description: "This is an amazing product that you will love.",
  },
  {
    reference: "P456",
    title: "Product 2",
    price: "$30",
    image: "https://via.placeholder.com/300x200",
    description: "High-quality product for an affordable price.",
  },
  {
    reference: "P789",
    title: "Product 3",
    price: "$40",
    image: "https://via.placeholder.com/300x200",
    description: "A product that combines style and functionality.",
  },
  {
    reference: "P101",
    title: "Product 4",
    price: "$50",
    image: "https://via.placeholder.com/300x200",
    description: "Perfect for everyday use, highly recommended.",
  },
];

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {/* Texto de Introducción */}
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Compra&nbsp;</span>
        <span className={title({ color: "green" })}>fácil&nbsp;</span>
        <br />
        <span className={title()}>
          La mejor experiencia en la compra de productos digitales.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Compra rápido y fácil!.
        </div>
      </div>

      {/* Botón "Compra ahora" */}
      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "success",
            radius: "full",
            variant: "shadow",
          })}
          href="#products" // Enlace al componente de productos
        >
          Compra ahora
        </Link>
      </div>

      {/* Espacio entre el botón y los productos */}
      <div className="h-10" />

      {/* Lista de Productos */}
      <div className="w-full" id="products">
        <ProductsList products={products} />
      </div>
    </section>
  );
}
