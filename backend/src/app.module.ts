import { Module } from '@nestjs/common';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [ClientModule],
})
export class AppModule {}
