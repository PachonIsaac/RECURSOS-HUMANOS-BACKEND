import { Controller, Get, Post, Delete, Body, HttpCode, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContratacionService} from './contratacion.service'
import  {CreatePersonDto, GenerarDocumentosDto, GuadarInscripcionDto, GuardarDocumentoDto} from './dto/index'
import 'multer'

@Controller('contratacion')
@ApiTags('Seleccion y contratacion')
export class ContratacionController {

  constructor(private readonly contraracionService: ContratacionService){}

  
  @Post('guardar-informacion-personal')
  @HttpCode(201)
  async guardarInfoPersonal(@Body() data: CreatePersonDto){
    return await this.contraracionService.guardarInfoPersonal(data)
  }

  @Post('guardar-inscripcion')
  @HttpCode(201)
  async guardarInscripcion(@Body() data: GuadarInscripcionDto){
    return await this.contraracionService.guardarInscripcion(data)
  }

  @Post('generar-documentos')
  @HttpCode(201)
  async generarDocumentos(@Body() data: GenerarDocumentosDto){
    return await this.contraracionService.generarDocumentos(data)
  }

  @Post('guardar-documento')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  async guardarDocumento(@Body() data: GuardarDocumentoDto, @UploadedFile() file: Express.Multer.File){
   return await this.contraracionService.guardarDocumento(data, file)
  }

  @Get('tipos-documento')
  async getTiposDocumento(){
    return await this.contraracionService.getTiposDocumento()
  }

  @Get('tipos-sangre')
  async getTiposSangre(){
    return await this.contraracionService.getTiposDocumento()
  }

//  @Post('generar-certificado')
  //async generarCertificado(@Body() data: ){}

}
