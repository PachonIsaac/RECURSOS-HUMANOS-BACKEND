import { Controller, Get, Post, Delete, Body, HttpCode } from '@nestjs/common';
import { ApiTags} from '@nestjs/swagger';
import { ContratacionService} from './contratacion.service'
import  {CreatePersonDto, IniciarSesionDto} from './dto/index'

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

  @Post('iniciar-sesion')
  @HttpCode(200)
  async iniciarSesion(@Body() data: IniciarSesionDto){
    
  }

  
  @Post('guardar-informacion-personal')
  @HttpCode(201)
  async guardarInfoPersonal(@Body() data: CreatePersonDto){
    return await this.contraracionService.guardarInfoPersonal(data)
  }

  @Get('tipos-documento')
  async getTiposDocumento(){
    return await this.contraracionService.getTiposDocumento()
  }

  @Get('tipos-sangre')
  async getTiposSangre(){
    return await this.contraracionService.getTiposDocumento()
  }


}
