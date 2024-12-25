import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../infrastructure/product.repository';

@Injectable()
export class GetProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts() {
    return await this.productRepository.findAll();
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findById(id);
    if (!product)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }
}
