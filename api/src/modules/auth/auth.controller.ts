import { Body, Controller, Get ,Post, UseGuards } from '@nestjs/common';
import { ApiTags} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IniciarSesionDto, GenerarEmpleadoDto } from './dto/index';
import { RolesGuard } from '../../guard/roles.guard';

@Controller('auth')
@ApiTags('Auntenticacion y autorizacion')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('iniciar-sesion')
  async iniciarSesion(@Body() data: IniciarSesionDto){
    return this.authService.buscarUsuario(data);
  }

  @Post('generar-empleado')
  @UseGuards(RolesGuard)
  async generarCredenciales(@Body() data: GenerarEmpleadoDto){
    return this.authService.generarEmpleado(data);
  }

  @Get('listar-empleado')
  async listarEmpleados(){
    return this.authService.listarEmpleados();
  }

}
