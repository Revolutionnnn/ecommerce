import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentRequestDto } from '../dto/payment.dto';
import { PaymentRepository } from '../infrastructure/payment.repository';
import { Payment } from '../domain/payment.entity';
import axios from 'axios';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentService {
  private wompiBaseUrl: string;
  private wompiPublicKey: string;
  private wompiIntegrityKey: string;
  private currency: string;

  constructor(
    private paymentRepository: PaymentRepository,
    private configService: ConfigService,
  ) {
    this.wompiBaseUrl = this.configService.get<string>('WOMPI_API_BASE_URL');
    this.wompiPublicKey = this.configService.get<string>('WOMPI_PUBLIC_KEY');
    this.wompiIntegrityKey = this.configService.get<string>(
      'WOMPI_INTEGRITY_KEY',
    );
    this.currency = this.configService.get<string>('CURRENCY');
  }

  async generateSignature(reference: string, amount: number): Promise<string> {
    const dataToSign = `${reference}${amount}${this.currency}${this.wompiIntegrityKey}`;
    return crypto.createHash('sha256').update(dataToSign).digest('hex');
  }

  async getWompiTokens(): Promise<{
    acceptanceToken: string;
    personalAuthToken: string;
  }> {
    const merchantUrl = `${this.wompiBaseUrl}/v1/merchants/${this.wompiPublicKey}`;

    const response = await axios.get(merchantUrl);

    if (response.status !== 200) {
      throw new HttpException(
        `Error al obtener los datos del merchant: ${response.data.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const processorData = response.data.data;
    const acceptanceToken =
      processorData.presigned_acceptance?.acceptance_token;
    const personalAuthToken =
      processorData.presigned_personal_data_auth?.acceptance_token;

    if (!acceptanceToken || !personalAuthToken) {
      throw new HttpException(
        'No se pudieron obtener los tokens necesarios de Wompi',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { acceptanceToken, personalAuthToken };
  }

  async getCardToken(cardInfo: {
    number: string;
    cvc: string;
    expMonth: string;
    expYear: string;
    cardHolder: string;
  }): Promise<string> {
    const url = `${this.wompiBaseUrl}/v1/tokens/cards`;
    const payload = {
      number: cardInfo.number,
      cvc: cardInfo.cvc,
      exp_month: cardInfo.expMonth,
      exp_year: cardInfo.expYear,
      card_holder: cardInfo.cardHolder,
    };
    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${this.wompiPublicKey}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.data.status !== 'CREATED') {
        throw new HttpException(
          `Error al obtener el token de la tarjeta: ${response.data.message}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return response.data.data.id;
    } catch (error) {
      throw new HttpException(
        `Error procesando el token de la tarjeta: ${error.response?.data?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async checkTransactionStatus(transactionId: string): Promise<any> {
    const transactionUrl = `${this.wompiBaseUrl}/v1/transactions/${transactionId}`;
    try {
      const response = await axios.get(transactionUrl, {
        headers: {
          Authorization: `Bearer ${this.wompiPublicKey}`,
        },
      });

      return response.data.data;
    } catch (error) {
      throw new HttpException(
        `Error consultando el estado de la transacción: ${error.response?.data?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async processPayment(paymentRequest: PaymentRequestDto) {
    const { acceptanceToken, personalAuthToken } = await this.getWompiTokens();

    const cardToken = await this.getCardToken({
      number: paymentRequest.number,
      cvc: paymentRequest.cvc,
      expMonth: paymentRequest.expMonth,
      expYear: paymentRequest.expYear,
      cardHolder: paymentRequest.customerInfo.name,
    });

    let totalPago = 0;
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

      totalPago += producto.basePrice * item.quantity;
    }

    const reference = uuidv4();
    const signature = await this.generateSignature(reference, totalPago * 100);

    const wompiPayload = {
      acceptance_token: acceptanceToken,
      accept_personal_auth: personalAuthToken,
      signature,
      amount_in_cents: totalPago * 100,
      currency: this.currency,
      reference,
      customer_email: paymentRequest.customerInfo.email,
      payment_method: {
        type: 'CARD',
        installments: 1,
        token: cardToken,
      },
    };

    try {
      const wompiUrl = `${this.wompiBaseUrl}/v1/transactions`;
      const response = await axios.post(wompiUrl, wompiPayload, {
        headers: {
          Authorization: `Bearer ${this.wompiPublicKey}`,
          'Content-Type': 'application/json',
        },
      });

      const transactionResult = response.data;
      const transactionId = transactionResult.data.id;

      let transactionStatus = 'PENDING';
      while (transactionStatus === 'PENDING') {
        const transactionDetails =
          await this.checkTransactionStatus(transactionId);
        transactionStatus = transactionDetails.status;

        if (transactionStatus === 'PENDING') {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }

      const cliente = await this.paymentRepository.registerCliente({
        nombre: paymentRequest.customerInfo.name,
        email: paymentRequest.customerInfo.email,
        direccion: paymentRequest.customerInfo.address,
        telefono: paymentRequest.customerInfo.phone,
      });

      if (transactionStatus === 'APPROVED') {
        const payment = new Payment(
          cliente.id,
          totalPago,
          transactionId,
          'PAGADO',
        );
        const savedPayment =
          await this.paymentRepository.createPayment(payment);

        for (const item of paymentRequest.cartItems) {
          const producto = await this.paymentRepository.getProductById(item.id);

          const subTotal = producto.basePrice * item.quantity;

          await this.paymentRepository.createDetallePago({
            pagoId: savedPayment.id,
            productoId: producto.id,
            cantidad: item.quantity,
            subTotal,
          });

          await this.paymentRepository.updateProductStock(
            producto.id,
            producto.cantidadStock - item.quantity,
          );
        }

        return { message: 'Transacción aprobada', transactionId };
      } else if (transactionStatus === 'DECLINED') {
        throw new HttpException(
          'Transacción rechazada',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          `Estado inesperado: ${transactionStatus}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      throw new HttpException(
        `Error procesando el pago: ${error.response?.data?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
