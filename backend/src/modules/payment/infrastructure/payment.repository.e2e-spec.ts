import { Test, TestingModule } from '@nestjs/testing';
import { PaymentRepository } from './payment.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Payment } from '../domain/payment.entity';

describe('PaymentRepository (e2e)', () => {
  let paymentRepository: PaymentRepository;
  let prismaServiceMock: Partial<PrismaService>;

  beforeEach(async () => {
    prismaServiceMock = {
      cliente: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      } as any,
      pago: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      } as any,
      detallePago: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      } as any,
      producto: {
        findUnique: jest.fn(),
        update: jest.fn(),
        findMany: jest.fn(),
      } as any,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentRepository,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    paymentRepository = module.get<PaymentRepository>(PaymentRepository);
  });

  describe('registerCliente', () => {
    it('should register a new cliente', async () => {
      const clienteData = {
        nombre: 'John Doe',
        email: 'john.doe@example.com',
        direccion: '123 Main St',
        telefono: '1234567890',
      };

      (prismaServiceMock.cliente!.create as jest.Mock).mockResolvedValue({
        id: 1,
        ...clienteData,
      });

      const result = await paymentRepository.registerCliente(clienteData);

      expect(prismaServiceMock.cliente!.create).toHaveBeenCalledWith({
        data: clienteData,
      });
      expect(result).toEqual({ id: 1, ...clienteData });
    });
  });

  describe('createPayment', () => {
    it('should create a new payment', async () => {
      const payment = new Payment(1, 200, 'TX123', 'PENDIENTE');

      (prismaServiceMock.pago!.create as jest.Mock).mockResolvedValue({
        id: 1,
        clienteId: 1,
        totalPago: 200,
        estadoPago: 'PENDIENTE',
        fechaPago: payment.fechaPago,
        transactionId: 'TX123',
      });

      const result = await paymentRepository.createPayment(payment);

      expect(prismaServiceMock.pago!.create).toHaveBeenCalledWith({
        data: {
          clienteId: 1,
          totalPago: 200,
          estadoPago: 'PENDIENTE',
          fechaPago: payment.fechaPago,
          transactionId: 'TX123',
        },
      });
      expect(result).toEqual(
        expect.objectContaining({
          id: 1,
          clienteId: 1,
          totalPago: 200,
        }),
      );
    });
  });

  describe('createDetallePago', () => {
    it('should create a payment detail', async () => {
      const detalleData = {
        pagoId: 1,
        productoId: 2,
        cantidad: 3,
        subTotal: 300,
      };

      (prismaServiceMock.detallePago!.create as jest.Mock).mockResolvedValue({
        id: 1,
        ...detalleData,
      });

      const result = await paymentRepository.createDetallePago(detalleData);

      expect(prismaServiceMock.detallePago!.create).toHaveBeenCalledWith({
        data: detalleData,
      });
      expect(result).toEqual(
        expect.objectContaining({ id: 1, ...detalleData }),
      );
    });
  });

  describe('updateProductStock', () => {
    it('should update the stock of a product', async () => {
      const productId = 1;
      const newStock = 8;

      (prismaServiceMock.producto!.update as jest.Mock).mockResolvedValue({
        id: productId,
        cantidadStock: newStock,
      });

      const result = await paymentRepository.updateProductStock(
        productId,
        newStock,
      );

      expect(prismaServiceMock.producto!.update).toHaveBeenCalledWith({
        where: { id: productId },
        data: { cantidadStock: newStock },
      });
      expect(result).toEqual({
        id: productId,
        cantidadStock: newStock,
      });
    });
  });
  

  describe('getProductById', () => {
    it('should return product details by ID', async () => {
      const productId = 1;
      const productData = {
        id: 1,
        nombre: 'Product 1',
        cantidadStock: 10,
        precio: 100,
      };

      (prismaServiceMock.producto!.findUnique as jest.Mock).mockResolvedValue(productData);

      const result = await paymentRepository.getProductById(productId);

      expect(prismaServiceMock.producto!.findUnique).toHaveBeenCalledWith({
        where: { id: productId },
      });
      expect(result).toEqual(productData);
    });
  });
});
