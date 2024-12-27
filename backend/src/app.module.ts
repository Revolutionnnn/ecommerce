import { Module } from '@nestjs/common';
import { ProductModule } from './modules/products/product.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [ProductModule, PaymentModule],
})
export class AppModule {}
