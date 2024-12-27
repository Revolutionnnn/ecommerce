import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PaymentController } from './interfaces/payment.controller';
import { PaymentService } from './application/payment.service';
import { PaymentRepository } from './infrastructure/payment.repository';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository, PrismaService],
})
export class PaymentModule {}
