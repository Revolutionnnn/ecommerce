import config from "@/config/api";

export async function getProductById(productId: any) {
  try {
    const res = await fetch(`${config.baseUrl}/products/${productId}`);

    if (!res.ok) {
      throw new Error(`Error fetching product: ${res.statusText}`);
    }
    const data = await res.json();

    return data;
  } catch {
    return null;
  }
}
