import config from "@/config/api";

export async function getProducts() {
  try {
    const res = await fetch(`${config.baseUrl}/products`);

    if (!res.ok) {
      throw new Error(`Error fetching products: ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    return [];
  }
}
