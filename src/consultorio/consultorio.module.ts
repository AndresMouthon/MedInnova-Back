import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationsModule } from 'src/utils/validations/validations.module';
import { ConsultorioController } from './consultorio.controller';
import { ConsultorioService } from './consultorio.service';
import { Consultorio } from './entities/consultorio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consultorio]), ValidationsModule],
  controllers: [ConsultorioController],
  providers: [ConsultorioService],
  exports: [ConsultorioService]
})
export class ConsultorioModule { }
