import { Injectable } from '@nestjs/common';
import { Product } from '../domain/product.entity';
import { PrismaService } from '../../../../prisma/prisma.service';
@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.producto.findMany();
    return products.map(
      (p) =>
        new Product(
          p.id,
          p.titulo,
          p.descripcion,
          p.basePrice,
          p.imagenUrl,
          p.cantidadStock,
        ),
    );
  }

  async findById(id: number): Promise<Product | null> {
    const product = await this.prisma.producto.findUnique({ where: { id } });
    if (!product) return null;

    return new Product(
      product.id,
      product.titulo,
      product.descripcion,
      product.basePrice,
      product.imagenUrl,
      product.cantidadStock,
    );
  }
}
