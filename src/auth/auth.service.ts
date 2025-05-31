import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ROLES } from 'src/utils/constants.utils';
import { ValidationsService } from 'src/utils/validations/validations.service';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Usuario) private readonly repository: Repository<Usuario>,
    private readonly validationService: ValidationsService,
    private readonly jwtService: JwtService,
  ) { }

  async login(createAuthDto: CreateAuthDto) {
    await this.validationService.validateDto(CreateAuthDto, createAuthDto);
    const { documento, password } = createAuthDto;
    const user = await this.repository.findOne({ where: { documento: documento }, relations: ['administrador', 'medico', 'paciente', 'recepcionista'] });
    if (!user) return { status: false, message: 'El documento no existe' };
    const checkPassword = await compare(password, user.password);
    if (!checkPassword) return { status: false, message: 'La contraseña es incorrecta' };
    const payload = { id: user.id, documento: user.documento };
    const token = this.jwtService.sign(payload);
    let credenciales = {};
    let usuario: {};
    if (user.administrador) {
      credenciales = { id: 1, descripcion: ROLES.ADMINISTRATOR };
      usuario = user.administrador;
    } else if (user.medico) {
      credenciales = { id: 2, descripcion: ROLES.DOCTOR };
      usuario = user.medico;
    } else if (user.paciente) {
      credenciales = { id: 3, descripcion: ROLES.PATIENT };
      usuario = user.paciente;
    } else if (user.recepcionista) {
      credenciales = { id: 4, descripcion: ROLES.RECEPTIONIST };
      usuario = user.recepcionista;
    } else {
      return { status: false, message: 'El usuario no tiene un rol asignado' };
    }
    return {
      status: true,
      credenciales,
      usuario: usuario,
      token
    }
  }

}
