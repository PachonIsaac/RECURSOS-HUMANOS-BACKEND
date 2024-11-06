import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IniciarSesionDto } from './dto/index';

@Controller('auth')
@ApiTags('Auntenticacion y autorizzacion')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('inicar-sesion')
  async iniciarSesion(@Body() data: IniciarSesionDto){
    return this.authService.buscarUsuario(data)
  }


}
