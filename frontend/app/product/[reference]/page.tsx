"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

import { addToCart } from "@/store/features/cartSlice";
import { RootState } from "@/store/store";
import { getProductById } from "@/services/detailProduct";

type ProductDetailsProps = {
  params: Promise<{ reference: string }>;
};

export default function ProductDetails({ params }: ProductDetailsProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  type Product = {
    id: string;
    reference: string;
    titulo: string;
    basePrice: number;
    imagenUrl: string;
    description: string;
    cantidadStock: number;
  };
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const resolvedParams = await params;

        setReference(resolvedParams.reference);
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!reference) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(reference);

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [reference]);

  if (loading) {
    return <div className="text-center text-xl font-bold">Cargando...</div>;
  }

  if (!product) {
    return (
      <div className="text-center text-xl font-bold">
        Producto no encontrado
      </div>
    );
  }

  const currentQuantityInCart =
    cartItems.find((item) => item.id === product.reference)?.quantity || 0;

  const handleAddToCart = (quantity: number) => {
    const totalQuantity = currentQuantityInCart + quantity;

    if (totalQuantity > product.cantidadStock) {
      alert(
        `No puedes agregar más de ${product.cantidadStock} unidades al carrito. Ya tienes ${currentQuantityInCart} en el carrito.`
      );
      return;
    }
    dispatch(
      addToCart({
        id: product.id,
        title: product.titulo,
        price: product.basePrice,
        quantity,
        image: product.imagenUrl,
      }),
    );
  };

  return (
    <div className="flex flex-col items-center gap-6 py-10 px-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardBody className="flex flex-col items-center">
        <Image
            alt={product.titulo}
            className="rounded-lg"
            height={200}
            src={product.imagenUrl || undefined}
            width={300}
          />
          <h1 className="text-3xl font-bold mt-4">{product.titulo}</h1>
          <p className="text-gray-500 mt-2 text-center">
            {product.description}
          </p>
          <p className="text-2xl font-semibold mt-4 text-primary">
            ${product.basePrice}
          </p>
          <p
            className={`text-lg mt-2 ${
              product.cantidadStock > 10 ? "text-green-600" : "text-red-600"
            } font-medium`}
          >
            {product.cantidadStock > 0
              ? `¡Quedan ${product.cantidadStock} en stock!`
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
                disabled={product.cantidadStock === 0}
                id="quantity"
                max={product.cantidadStock}
                min="1"
                type="number"
              />
            </div>
            <Button
              className="w-full"
              color="primary"
              disabled={product.cantidadStock === 0}
              variant="shadow"
              onPress={() => {
                const quantity = parseInt(
                  (document.getElementById("quantity") as HTMLInputElement)
                    .value,
                );

                if (quantity > 0) {
                  handleAddToCart(quantity);
                }
              }}
            >
              Añadir al Carrito
            </Button>
            <Button
              className="w-full"
              color="success"
              disabled={product.cantidadStock === 0}
              variant="flat"
              onPress={() => router.push("/summary")}
            >
              Comprar Ahora
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Button onPress={() => router.back()}>Volver</Button>
    </div>
  );
}
