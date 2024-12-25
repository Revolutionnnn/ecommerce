import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Client } from '../domain/client.entity';

@Injectable()
export class ClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(client: Client) {
    return this.prisma.cliente.create({
      data: {
        nombre: client.name,
        email: client.email,
        direccion: client.direccion,
      },
    });
  }
}
