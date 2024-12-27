export class Payment {
  id: number;
  clienteId: number;
  totalPago: number;
  estadoPago: 'PENDIENTE' | 'PAGADO' | 'RECHAZADO';
  fechaPago: Date;

  constructor(
    clienteId: number,
    totalPago: number,
    estadoPago: 'PENDIENTE' | 'PAGADO' | 'RECHAZADO',
  ) {
    this.clienteId = clienteId;
    this.totalPago = totalPago;
    this.estadoPago = estadoPago;
    this.fechaPago = new Date();
  }
}
