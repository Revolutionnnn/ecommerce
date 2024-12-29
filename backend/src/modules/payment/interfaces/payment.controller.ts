import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentService } from '../application/payment.service';
import { PaymentRequestDto } from '../dto/payment.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Procesar un pago' })
  @ApiResponse({
    status: 201,
    description: 'Pago procesado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en los datos enviados para el pago.',
  })
  async processPayment(@Body() paymentRequest: PaymentRequestDto) {
    return this.paymentService.processPayment(paymentRequest);
  }
}
