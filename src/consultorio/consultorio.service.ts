import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConsultorioDto } from './dto/create-consultorio.dto';
import { UpdateConsultorioDto } from './dto/update-consultorio.dto';
import { Consultorio } from './entities/consultorio.entity';
import { Repository } from 'typeorm';
import { sanitizeResponse } from 'src/utils/sanitizeResponse.utils';

@Injectable()
export class ConsultorioService {

  constructor(
    @InjectRepository(Consultorio) private readonly repository: Repository<Consultorio>,
  ) { }

  async create(createConsultorioDto: CreateConsultorioDto) {
    const findConsultorio = await this.repository.findOne({ where: { numero: createConsultorioDto.numero } });
    if (findConsultorio) {
      throw new HttpException({ status: false, errors: 'Ya existe un consultorio con ese numero.' }, HttpStatus.ACCEPTED);
    }
    const consultorio = await this.repository.save(createConsultorioDto);
    return {
      status: true,
      message: 'Medico creado correctamente.',
      data: consultorio
    };
  }

  async findAll() {
    const consultorios = await this.repository.find();
    const fieldsToRemove = [
      'created_at',
      'updated_at',
    ];
    return sanitizeResponse(consultorios, fieldsToRemove);
  }

  findOne(id: number) {
    return `This action returns a #${id} consultorio`;
  }

  update(id: number, updateConsultorioDto: UpdateConsultorioDto) {
    return `This action updates a #${id} consultorio`;
  }

  remove(id: number) {
    return `This action removes a #${id} consultorio`;
  }
}
