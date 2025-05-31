import { Injectable } from '@nestjs/common';
import { CreateRecepcionistaDto } from './dto/create-recepcionista.dto';
import { UpdateRecepcionistaDto } from './dto/update-recepcionista.dto';

@Injectable()
export class RecepcionistaService {
  create(createRecepcionistaDto: CreateRecepcionistaDto) {
    return 'This action adds a new recepcionista';
  }

  findAll() {
    return `This action returns all recepcionista`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recepcionista`;
  }

  update(id: number, updateRecepcionistaDto: UpdateRecepcionistaDto) {
    return `This action updates a #${id} recepcionista`;
  }

  remove(id: number) {
    return `This action removes a #${id} recepcionista`;
  }
}
