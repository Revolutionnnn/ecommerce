import { Body, Controller, Post } from '@nestjs/common';
import { CreateClientUseCase } from '../application/create-client.use-case';

@Controller('client')
export class ClientController {
  constructor(private readonly createClientUseCase: CreateClientUseCase) {}

  @Post()
  async create(@Body() { name, email, direccion }: { name: string; email: string; direccion: string }) {
    return this.createClientUseCase.execute(name, email, direccion);
  }
}
