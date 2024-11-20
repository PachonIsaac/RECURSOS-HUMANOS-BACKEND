import { IsNumber } from "class-validator";

export class GuardarDocumentoDto {

    @IsNumber()
    enrolleddoc_id: number;
}