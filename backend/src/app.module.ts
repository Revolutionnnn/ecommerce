import { Module } from '@nestjs/common';
import { ClientModule } from './modules/client/client.module';
import { ProductModule } from './modules/products/product.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [ClientModule, ProductModule, PaymentModule],
})
export class AppModule {}
