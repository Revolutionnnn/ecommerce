// payment.service.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentService } from './payment.service';
import { PaymentRepository } from '../infrastructure/payment.repository';
import axios from 'axios';
import * as crypto from 'crypto';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PaymentService (E2E)', () => {
  let paymentService: PaymentService;

  const mockPaymentRepository = {
    getProductById: jest.fn(),
    registerCliente: jest.fn(),
    createPayment: jest.fn(),
    createDetallePago: jest.fn(),
    updateProductStock: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      switch (key) {
        case 'WOMPI_API_BASE_URL':
          return 'https://sandbox.wompi.co';
        case 'WOMPI_PUBLIC_KEY':
          return 'public_key_dummy';
        case 'WOMPI_INTEGRITY_KEY':
          return 'integrity_key_dummy';
        case 'CURRENCY':
          return 'COP';
        default:
          return null;
      }
    }),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: PaymentRepository, useValue: mockPaymentRepository },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    paymentService = module.get<PaymentService>(PaymentService);
  });

  it('Debe crearse el servicio correctamente', () => {
    expect(paymentService).toBeDefined();
  });

  it('Debe generar una firma SHA-256 válida (generateSignature)', async () => {
    const reference = 'abc123';
    const amount = 1000;
    const expected = crypto
      .createHash('sha256')
      .update(`abc1231000COPintegrity_key_dummy`)
      .digest('hex');

    const signature = await paymentService.generateSignature(reference, amount);
    expect(signature).toEqual(expected);
  });

  it('Debe obtener tokens de Wompi (getWompiTokens)', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        data: {
          presigned_acceptance: {
            acceptance_token: 'token_de_aceptacion',
          },
          presigned_personal_data_auth: {
            acceptance_token: 'token_personal_auth',
          },
        },
      },
    });

    const result = await paymentService.getWompiTokens();
    expect(result).toEqual({
      acceptanceToken: 'token_de_aceptacion',
      personalAuthToken: 'token_personal_auth',
    });
  });

  it('Debe obtener el token de la tarjeta (getCardToken)', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        status: 'CREATED',
        data: {
          id: 'token_tarjeta_dummy',
        },
      },
    });

    const cardInfo = {
      number: '1234123412341234',
      cvc: '123',
      expMonth: '12',
      expYear: '25',
      cardHolder: 'Juan Perez',
    };

    const cardToken = await paymentService.getCardToken(cardInfo);
    expect(cardToken).toBe('token_tarjeta_dummy');
  });

  it('Debe consultar el estado de la transacción (checkTransactionStatus)', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: {
          id: 'trx_id_dummy',
          status: 'APPROVED',
        },
      },
    });

    const status = await paymentService.checkTransactionStatus('trx_id_dummy');
    expect(status).toEqual({
      id: 'trx_id_dummy',
      status: 'APPROVED',
    });
  });

  it('Debe procesar un pago exitoso (processPayment)', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        data: {
          presigned_acceptance: { acceptance_token: 'acc_token' },
          presigned_personal_data_auth: { acceptance_token: 'personal_token' },
        },
      },
    });

    mockedAxios.post.mockResolvedValueOnce({
      data: { status: 'CREATED', data: { id: 'card_token_mock' } },
    });

    mockPaymentRepository.getProductById.mockResolvedValue({
      id: 1,
      titulo: 'Producto 1',
      basePrice: 10000,
      cantidadStock: 10,
    });

    mockPaymentRepository.registerCliente.mockResolvedValue({
      id: 123,
    });

    mockPaymentRepository.createPayment.mockResolvedValue({
      id: 999,
    });

    mockedAxios.post.mockResolvedValueOnce({
      data: {
        data: {
          id: 'trx_id_mock',
        },
      },
    });

    mockedAxios.get
      .mockResolvedValueOnce({
        data: { data: { status: 'PENDING' } },
      })
      .mockResolvedValueOnce({
        data: { data: { status: 'APPROVED' } },
      });

    const paymentRequest = {
      number: '1234123412341234',
      expMonth: '12',
      expYear: '25',
      cvc: '123',
      customerInfo: {
        name: 'Test',
        address: 'Calle 123',
        phone: '000000',
        email: 'test@test.com',
      },
      cartItems: [
        {
          id: 1,
          quantity: 1,
        },
      ],
      total: 10000,
    };

    const response = await paymentService.processPayment(paymentRequest);
    expect(response).toHaveProperty('message', 'Transacción aprobada');
    expect(response).toHaveProperty('transactionId', 'trx_id_mock');
  });

  it('Debe lanzar excepción si se rechaza la transacción', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        data: {
          presigned_acceptance: { acceptance_token: 'acc_token' },
          presigned_personal_data_auth: { acceptance_token: 'personal_token' },
        },
      },
    });
    mockedAxios.post.mockResolvedValueOnce({
      data: { status: 'CREATED', data: { id: 'card_token_mock' } },
    });
    mockPaymentRepository.getProductById.mockResolvedValue({
      id: 2,
      titulo: 'Producto 2',
      basePrice: 5000,
      cantidadStock: 5,
    });
    mockPaymentRepository.registerCliente.mockResolvedValue({ id: 321 });
    mockPaymentRepository.createPayment.mockResolvedValue({ id: 888 });
    mockedAxios.post.mockResolvedValueOnce({
      data: { data: { id: 'trx_id_declined' } },
    });
    mockedAxios.get.mockResolvedValueOnce({
      data: { data: { status: 'DECLINED' } },
    });

    const paymentRequest = {
      number: '9999999999999999',
      expMonth: '12',
      expYear: '25',
      cvc: '123',
      customerInfo: {
        name: 'Test Declined',
        address: 'Calle Falsa',
        phone: '000001',
        email: 'declined@test.com',
      },
      cartItems: [
        {
          id: 2,
          quantity: 1,
        },
      ],
      total: 5000,
    };

    await expect(paymentService.processPayment(paymentRequest)).rejects.toThrow(
      new HttpException('Transacción rechazada', HttpStatus.BAD_REQUEST),
    );
  });
});
