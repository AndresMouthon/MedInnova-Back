import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ValidationsModule } from 'src/utils/validations/validations.module';
import { AdministradorController } from './administrador.controller';
import { AdministradorService } from './administrador.service';
import { Administrador } from './entities/administrador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Administrador]), ValidationsModule, UsuarioModule],
  controllers: [AdministradorController],
  providers: [AdministradorService],
})
export class AdministradorModule { }
