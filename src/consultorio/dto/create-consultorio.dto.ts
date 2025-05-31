import { IsNotEmpty } from "class-validator";

export class CreateConsultorioDto {

    @IsNotEmpty({ message: 'El numero de consultorio es requerido' })
    numero: string;

}
