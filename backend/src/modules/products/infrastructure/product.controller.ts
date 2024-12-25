import { Controller, Get, Param } from '@nestjs/common';
import { GetProductUseCase } from '../application/get-product.use-case';

@Controller('products')
export class ProductController {
  constructor(private readonly getProductUseCase: GetProductUseCase) {}

  @Get()
  async getAllProducts() {
    return await this.getProductUseCase.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.getProductUseCase.getProductById(Number(id));
  }
}
