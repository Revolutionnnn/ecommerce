import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [ClientModule],
  providers: [PrismaService],
})
export class AppModule {}
