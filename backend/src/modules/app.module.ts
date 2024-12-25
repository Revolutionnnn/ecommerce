import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductModule } from './products/product.module';

@Module({
  imports: [ClientModule, ProductModule],
  providers: [PrismaService],
})
export class AppModule {}
