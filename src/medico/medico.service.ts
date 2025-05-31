import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { sanitizeResponse } from 'src/utils/sanitizeResponse.utils';
import { Repository } from 'typeorm';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { Medico } from './entities/medico.entity';

@Injectable()
export class MedicoService {

  constructor(
    @InjectRepository(Medico) private readonly repository: Repository<Medico>,
    private readonly usuarioService: UsuarioService
  ) { }

  async create(createMedicoDto: CreateMedicoDto) {
    const user = {
      documento: createMedicoDto.documento, nombres: createMedicoDto.nombres, apellidos: createMedicoDto.apellidos, genero: createMedicoDto.genero, rol: createMedicoDto.rol, password: createMedicoDto.documento,
    }
    const usuario = await this.usuarioService.create(user);
    const medico = await this.repository.save({ ...createMedicoDto, usuario_id: usuario });
    return {
      status: true,
      message: 'Medico creado correctamente.',
      data: medico
    };
  }

  async findAll() {
    const medicos = await this.repository.find({ relations: ['usuario_id'] });
    const fieldsToRemove = [
      'password', 
      'created_at', 
      'updated_at', 
      'medico',
      'recepcionista',
      'paciente',
      'administrador'
    ];
    return sanitizeResponse(medicos, fieldsToRemove);
  }

  findOne(id: number) {
    return `This action returns a #${id} medico`;
  }

  async update(id: number, updateMedicoDto: UpdateMedicoDto) {
    const medico = await this.repository.findOne({ where: { id }, relations: ['usuario_id'] });
    if (!medico) throw new HttpException({ status: false, errors: 'Medico no encontrado' }, HttpStatus.NOT_FOUND);
    const errors: string[] = [];
    const user = await this.usuarioService.findByDocumento(updateMedicoDto.documento || '');
    if (user && user.documento !== medico.usuario_id.documento) errors.push("Ya existe un medico con ese documento.");
  }

  remove(id: number) {
    return `This action removes a #${id} medico`;
  }
}
