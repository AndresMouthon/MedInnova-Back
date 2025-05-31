import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { ValidationsService } from 'src/utils/validations/validations.service';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private readonly validationService: ValidationsService,
  ) { };

  // METHODS CREATE
  async create(createUsuarioDto: CreateUsuarioDto) {
    await this.validationService.validateDto(CreateUsuarioDto, createUsuarioDto);
    const { password } = createUsuarioDto;
    const hashedPassword = await hash(password || '', 10);
    createUsuarioDto = { ...createUsuarioDto, password: hashedPassword };
    return await this.usuarioRepository.save(createUsuarioDto);
  };

  // // FUNCITONS FINDS
  // async findByRol(id: number) {
  //   return await this.usuarioRepository.find({ where: { rol: id } });
  // };

  async findByDocumento(documento: string) {
    return await this.usuarioRepository.findOne({ where: { documento } });
  }

}
