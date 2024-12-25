import { Module } from '@nestjs/common';
import { ClientController } from './infrastructure/client.controller';
import { ClientRepository } from './infrastructure/client.repository';
import { CreateClientUseCase } from './application/create-client.use-case';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  controllers: [ClientController],
  providers: [ClientRepository, CreateClientUseCase, PrismaService],
})
export class ClientModule {}
