import { IsString } from "class-validator";

export class IniciarSesionDto {
 
  @IsString()
  username: string;

  @IsString()
  password: string;
}