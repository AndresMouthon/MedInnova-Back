import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/config/jwt-auth.guard';
import { ConsultorioGuard } from './consultorio.guard';
import { ConsultorioService } from './consultorio.service';
import { CreateConsultorioDto } from './dto/create-consultorio.dto';
import { UpdateConsultorioDto } from './dto/update-consultorio.dto';

@Controller('api/consultorio')
@UseGuards(JwtAuthGuard)
export class ConsultorioController {
  constructor(private readonly consultorioService: ConsultorioService) { }

  @Post()
  @UseGuards(ConsultorioGuard)
  async create(@Body() createConsultorioDto: CreateConsultorioDto) {
    return await this.consultorioService.create(createConsultorioDto);
  }

  @Get()
  async findAll() {
    return await this.consultorioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultorioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsultorioDto: UpdateConsultorioDto) {
    return this.consultorioService.update(+id, updateConsultorioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultorioService.remove(+id);
  }
}
