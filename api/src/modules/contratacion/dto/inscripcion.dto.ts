import { IsString, IsNumber } from "class-validator";

export class GuadarInscripcionDto {

  @IsNumber()
  person_id: number;

  @IsNumber()
  offer_id: number;

  @IsString()
  period: string;

}