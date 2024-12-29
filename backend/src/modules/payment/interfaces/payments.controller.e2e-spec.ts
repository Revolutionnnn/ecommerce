import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { PaymentController } from './payment.controller';
import { PaymentService } from '../application/payment.service';
import { PaymentRequestDto } from '../dto/payment.dto';

describe('PaymentController (e2e)', () => {
  let app: INestApplication;
  let mockPaymentService: Partial<PaymentService>;

  beforeAll(async () => {
    mockPaymentService = {
      processPayment: jest
        .fn()
        .mockImplementation((dto: PaymentRequestDto) => ({
          success: true,
          paymentId: 123,
          ...dto,
        })),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: mockPaymentService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        stopAtFirstError: false,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /payments', () => {
    it('should process a payment successfully', async () => {
      const paymentRequest: PaymentRequestDto = {
        number: '4242424242424242',
        expMonth: '12',
        expYear: '25',
        cvc: '123',
        customerInfo: {
          name: 'John Doe',
          address: '123 Main St',
          phone: '1234567890',
          email: 'john.doe@example.com',
        },
        cartItems: [{ id: 1, quantity: 1 }],
        total: 200,
      };

      const response = await request(app.getHttpServer())
        .post('/payments')
        .send(paymentRequest)
        .expect(201);

      expect(response.body).toEqual({
        success: true,
        paymentId: 123,
        ...paymentRequest,
      });
      expect(mockPaymentService.processPayment).toHaveBeenCalledWith(paymentRequest);
    });

    it('should return 400 if payment data is invalid', async () => {
      const invalidPaymentRequest = {
        number: '424242424242424D',
        expMonth: '132',
        expYear: '222',
        cvc: '12',
        customerInfo: {
          name: 'John Doe',
          address: '123 Main St',
          phone: '1234567890',
          email: 'john.doe@example.com',
        },
        cartItems: [],
        total: 200,
      };

      const response = await request(app.getHttpServer())
        .post('/payments')
        .send(invalidPaymentRequest)
        .expect(400);

      const errorMessages = response.body.message;
      expect(errorMessages).toEqual(
        expect.arrayContaining([
          'El número de tarjeta debe contener solo números',
          'El mes de expiración debe tener 2 caracteres',
          'El año de expiración debe tener 2 caracteres',
          'El CVC debe tener entre 3 y 4 caracteres',
        ]),
      );
    });

    it('should return 400 if required fields are missing', async () => {
      const incompletePaymentRequest = {
        number: '4242424242424242',
        total: 200,
      };

      const response = await request(app.getHttpServer())
        .post('/payments')
        .send(incompletePaymentRequest)
        .expect(400);

      expect(response.body.message).toContain('expMonth should not be empty');
      expect(response.body.message).toContain('expYear should not be empty');
      expect(response.body.message).toContain('cvc should not be empty');
      expect(response.body.message).toContain(
        'customerInfo should not be empty',
      );
    });
  });
});
