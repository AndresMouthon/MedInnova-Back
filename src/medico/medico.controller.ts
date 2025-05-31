import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/config/jwt-auth.guard';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { MedicoGuard } from './medico.guard';
import { MedicoService } from './medico.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Controller('api/medico')
@UseGuards(JwtAuthGuard)
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) { }

  @Post()
  @UseGuards(MedicoGuard)
  async create(@Body() createMedicoDto: CreateMedicoDto) {
    return await this.medicoService.create(createMedicoDto);
  }

  @Get()
  async findAll() {
    return this.medicoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.medicoService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateMedicoDto: UpdateMedicoDto) {
    const validation = await validate(plainToInstance(UpdateMedicoDto, updateMedicoDto));
    if (validation.length) {
      const errorMessages = validation.flatMap(err => Object.values(err.constraints ?? {}));
      return {
        status: false,
        errors: errorMessages,
      };
    };
    const medico = await this.medicoService.update(id, updateMedicoDto);
    return {
      status: true,
      data: medico
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicoService.remove(+id);
  }
}
