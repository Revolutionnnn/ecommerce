import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Payment } from '../domain/payment.entity';

@Injectable()
export class PaymentRepository {
  constructor(private prisma: PrismaService) {}

  async registerCliente(clienteData: {
    nombre: string;
    email: string;
    direccion: string;
    telefono?: string;
  }) {
    return this.prisma.cliente.create({
      data: clienteData,
    });
  }

  async createPayment(payment: Payment) {
    return this.prisma.pago.create({
      data: {
        clienteId: payment.clienteId,
        totalPago: payment.totalPago,
        estadoPago: payment.estadoPago,
        fechaPago: payment.fechaPago,
      },
    });
  }

  async createDetallePago(detalleData: {
    pagoId: number;
    productoId: number;
    cantidad: number;
    subTotal: number;
  }) {
    return this.prisma.detallePago.create({
      data: detalleData,
    });
  }

  async getProductById(productId: number) {
    return this.prisma.producto.findUnique({
      where: { id: productId },
    });
  }

  async updateProductStock(productId: number, newStock: number) {
    return this.prisma.producto.update({
      where: { id: productId },
      data: { cantidadStock: newStock },
    });
  }
}
