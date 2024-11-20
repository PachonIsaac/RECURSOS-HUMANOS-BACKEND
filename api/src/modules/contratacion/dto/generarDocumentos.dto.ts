import { IsNumber } from "class-validator";

export class GenerarDocumentosDto {

  @IsNumber()
  enrolled_id: number;
}