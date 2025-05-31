import { PartialType } from '@nestjs/mapped-types';
import { CreateRecepcionistaDto } from './create-recepcionista.dto';

export class UpdateRecepcionistaDto extends PartialType(CreateRecepcionistaDto) {}
