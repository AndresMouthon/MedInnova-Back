import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateUsuarioDto {

    @IsNotEmpty({ message: 'El documento es requerido' })
    documento: string;

    @IsNotEmpty({ message: 'Los nombres son requeridos' })
    nombres: string;

    @IsNotEmpty({ message: 'Los apellidos son requeridos' })
    apellidos: string;

    @IsNotEmpty({ message: 'El genero es requerido' })
    genero: string;

    @IsNotEmpty({ message: 'El rol es requerido' })
    rol: string;

    @IsOptional()
    password?: string;

}
