import config from "@/config/api";

export async function makePayment(
  paymentData: any,
): Promise<{ success: boolean; message: string }> {
  const url = `${config.baseUrl}/payments`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    if (response.ok) {
      return { success: true, message: "Compra realizada con éxito!" };
    } else {
      return {
        success: false,
        message: "Hubo un problema al procesar la compra.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Hubo un problema con la conexión al servidor.",
    };
  }
}
