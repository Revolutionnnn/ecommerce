import { Controller, Post, Body } from '@nestjs/common';
import { CreateClientUseCase } from '../application/create-client.use-case';

@Controller('clients')
export class ClientController {
  constructor(private readonly createClientUseCase: CreateClientUseCase) {}

  @Post()
  async create(
    @Body() createClientDto: { name: string; email: string; direccion: string },
  ) {
    const { name, email, direccion } = createClientDto;
    return this.createClientUseCase.execute(name, email, direccion);
  }
}
