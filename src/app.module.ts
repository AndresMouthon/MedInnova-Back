import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministradorModule } from './administrador/administrador.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MedicoModule } from './medico/medico.module';
import { PacienteModule } from './paciente/paciente.module';
import { RecepcionistaModule } from './recepcionista/recepcionista.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ConsultorioModule } from './consultorio/consultorio.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DB_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsuarioModule,
    MedicoModule,
    PacienteModule,
    RecepcionistaModule,
    AdministradorModule,
    ConsultorioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
