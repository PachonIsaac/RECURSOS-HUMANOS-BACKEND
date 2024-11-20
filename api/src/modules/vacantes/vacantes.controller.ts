import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VacantesService } from './vacantes.service';
import { of } from 'rxjs';

@Controller('vacantes')
@ApiTags('Vacantes y trabajos')
export class VacantesController {

  constructor(private readonly vacantesService: VacantesService) {}

  @Get('listar-vacantes')
  async listarVacantes(){
    return this.vacantesService.listarVacantes();
  }

  @Get('listar-trabajos')
  async listarTrabajos(){
    return this.vacantesService.listarTrabajos();
  }

  @Get('listar-aspirantes:offer_id')
  async listarAspirantes(@Param('offer_id') offer_id: number){
    return this.vacantesService.listarAspirantes(offer_id);
  }

}
