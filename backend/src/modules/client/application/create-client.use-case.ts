import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../infrastructure/client.repository';
import { Client } from '../domain/client.entity';

@Injectable()
export class CreateClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(name: string, email: string, direccion: string) {
    const client = new Client(name, email, direccion);
    return await this.clientRepository.save(client);
  }
}
