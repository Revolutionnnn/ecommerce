import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetProductUseCase } from '../application/get-product.use-case';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly getProductUseCase: GetProductUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida exitosamente.',
    type: Array,
  })
  async getAllProducts() {
    return await this.getProductUseCase.getAllProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del producto a obtener',
    required: true,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Producto obtenido exitosamente.',
    type: Object,
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
  })
  async getProductById(@Param('id') id: string) {
    return await this.getProductUseCase.getProductById(Number(id));
  }
}
