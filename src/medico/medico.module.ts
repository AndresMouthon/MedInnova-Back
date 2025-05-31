import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ValidationsModule } from 'src/utils/validations/validations.module';
import { Medico } from './entities/medico.entity';
import { MedicoController } from './medico.controller';
import { MedicoService } from './medico.service';

@Module({
  imports: [TypeOrmModule.forFeature([Medico]), ValidationsModule, UsuarioModule],
  controllers: [MedicoController],
  providers: [MedicoService],
})
export class MedicoModule { }
