import { IsString, IsNumber } from "class-validator";

export class GenerarEmpleadoDto {

    @IsNumber()
    id: number;

    @IsString()
    firstName: string;

    @IsString()
    firstSurname: string;

    @IsString()
    identification: string;

    @IsString()
    email: string;

}