import { IsNotEmpty } from "class-validator";

export class CreateAuthDto {

    @IsNotEmpty({ message: 'El usuario es requerido' })
    documento: string;

    @IsNotEmpty({ message: 'La contraseña es requerida' })
    password: string;
    
}
