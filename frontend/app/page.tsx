"use client";

import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { ProductsList } from "@/components/products";
import { title, subtitle } from "@/components/primitives";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/products";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
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

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "success",
            radius: "full",
            variant: "shadow",
          })}
          href="#products"
        >
          Compra ahora
        </Link>
      </div>

      <div className="h-10" />

      <div className="w-full" id="products">
        {products.length > 0 ? (
          <ProductsList products={products} />
        ) : (
          <p className="text-center text-gray-500">Cargando productos...</p>
        )}
      </div>
    </section>
  );
}
