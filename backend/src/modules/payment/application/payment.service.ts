import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentRequestDto } from '../dto/payment.dto';
import { PaymentRepository } from '../infrastructure/payment.repository';
import { Payment } from '../domain/payment.entity';

@Injectable()
export class PaymentService {
  constructor(private paymentRepository: PaymentRepository) {}

  async processPayment(paymentRequest: PaymentRequestDto) {
    const cliente = await this.paymentRepository.registerCliente({
      nombre: paymentRequest.customerInfo.name,
      email: paymentRequest.customerInfo.email,
      direccion: paymentRequest.customerInfo.address,
      telefono: paymentRequest.customerInfo.phone,
    });

    let totalPago = 0;
    const productosProcesados = [];

    for (const item of paymentRequest.cartItems) {
      const producto = await this.paymentRepository.getProductById(item.id);

      if (!producto) {
        throw new HttpException(
          `Producto con ID ${item.id} no encontrado`,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (producto.cantidadStock < item.quantity) {
        throw new HttpException(
          `Stock insuficiente para el producto ${producto.titulo}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const subTotal = producto.basePrice * item.quantity;
      totalPago += subTotal;

      productosProcesados.push({
        productoId: producto.id,
        cantidad: item.quantity,
        subTotal,
      });

      await this.paymentRepository.updateProductStock(
        producto.id,
        producto.cantidadStock - item.quantity,
      );
    }

    const payment = new Payment(cliente.id, totalPago, 'PAGADO');
    const savedPayment = await this.paymentRepository.createPayment(payment);

    for (const detalle of productosProcesados) {
      await this.paymentRepository.createDetallePago({
        pagoId: savedPayment.id,
        productoId: detalle.productoId,
        cantidad: detalle.cantidad,
        subTotal: detalle.subTotal,
      });
    }

    return {
      message: 'Pago procesado correctamente',
      payment: savedPayment,
      productos: productosProcesados,
    };
  }
}
