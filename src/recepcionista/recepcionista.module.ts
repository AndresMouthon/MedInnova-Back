import { Module } from '@nestjs/common';
import { RecepcionistaService } from './recepcionista.service';
import { RecepcionistaController } from './recepcionista.controller';

@Module({
  controllers: [RecepcionistaController],
  providers: [RecepcionistaService],
})
export class RecepcionistaModule {}
