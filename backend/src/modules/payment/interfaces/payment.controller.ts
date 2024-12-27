import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from '../application/payment.service';
import { PaymentRequestDto } from '../dto/payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  async processPayment(@Body() paymentRequest: PaymentRequestDto) {
    return this.paymentService.processPayment(paymentRequest);
  }
}
