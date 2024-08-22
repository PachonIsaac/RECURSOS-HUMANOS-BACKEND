import { Controller, Get, Post, Delete } from '@nestjs/common';
import { ApiTags} from '@nestjs/swagger';
import { ContratacionService} from './contratacion.service'

@Controller('contratacion')
@ApiTags('Seleccion y contratacion')
export class ContratacionController {

  constructor(private readonly contraracionService: ContratacionService){}

  @Post('guardar-candidatura')
  async enviarCandidatura(){
    return
  }

  @Delete('eliminar-candidatura')
  async EliminarCandidatura(){
    return
  }

  @Post('guardar-informacion-personal')
  async guardarInfoPersonal(){
    return
  }

  @Get('tipos-documento')
  async getTiposCedula(){
    return await this.contraracionService.create()
  }


}
