import { Payment } from './payment.entity';

describe('Payment Entity', () => {
  it('should correctly initialize with the constructor values', () => {
    const payment = new Payment(1, 200, 'TX123', 'PENDIENTE');

    expect(payment.clienteId).toBe(1);
    expect(payment.totalPago).toBe(200);
    expect(payment.transactionId).toBe('TX123');
    expect(payment.estadoPago).toBe('PENDIENTE');
    expect(payment.fechaPago).toBeInstanceOf(Date);
  });

  it('should default fechaPago to the current date', () => {
    const before = new Date();
    const payment = new Payment(1, 200, 'TX123', 'PENDIENTE');
    const after = new Date();

    expect(payment.fechaPago.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(payment.fechaPago.getTime()).toBeLessThanOrEqual(after.getTime());
  });
});
