import { Module } from '@nestjs/common';
import { ProductController } from './interfaces/product.controller';
import { ProductRepository } from './infrastructure/product.repository';
import { GetProductUseCase } from './application/get-product.use-case';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [ProductRepository, GetProductUseCase, PrismaService],
})
export class ProductModule {}
