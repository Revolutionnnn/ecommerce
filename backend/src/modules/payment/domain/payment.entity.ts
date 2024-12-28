export class Payment {
  id: number;
  clienteId: number;
  totalPago: number;
  estadoPago: 'PENDIENTE' | 'PAGADO' | 'RECHAZADO';
  transactionId: string;
  fechaPago: Date;

  constructor(
    clienteId: number,
    totalPago: number,
    transactionId: string,
    estadoPago: 'PENDIENTE' | 'PAGADO' | 'RECHAZADO',
  ) {
    this.clienteId = clienteId;
    this.totalPago = totalPago;
    this.estadoPago = estadoPago;
    this.transactionId = transactionId;
    this.fechaPago = new Date();
  }
}
