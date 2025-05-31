import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicoDto } from './create-medico.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMedicoDto extends PartialType(CreateMedicoDto) {

    @IsString({ message: 'La especialidad debe ser un string' })
    @IsOptional()
    especialidad?: string;

    @IsString({ message: 'El numero de colegiatura debe ser un string' })
    @IsOptional()
    numero_colegiatura?: string;
    
    @IsString({ message: 'El telefono debe ser un string' })
    @IsOptional()
    telefono?: string;

    @IsString({ message: 'El horario de atencion debe ser un string' })
    @IsOptional()
    horario_atencion?: string;
}
