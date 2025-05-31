import { IsNotEmpty } from "class-validator";
import { CreateUsuarioDto } from "src/usuario/dto/create-usuario.dto";

export class CreateMedicoDto extends CreateUsuarioDto {

    @IsNotEmpty({ message: 'La especialidad es requerido' })
    especialidad: string;

    @IsNotEmpty({ message: 'El numero de colegiatura es requerido' })
    numero_colegiatura: string;

    @IsNotEmpty({ message: 'El telefono es requerido' })
    telefono: string;

    @IsNotEmpty({ message: 'El horario de atencion es requerido' })
    horario_atencion: string;
}
