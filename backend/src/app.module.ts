import { Module } from '@nestjs/common';
import { ClientModule } from './modules/client/client.module';
import { ProductModule } from './modules/products/product.module';

@Module({
  imports: [ClientModule, ProductModule],
})
export class AppModule {}
