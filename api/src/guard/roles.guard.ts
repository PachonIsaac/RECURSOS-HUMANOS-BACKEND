// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const secretKey = process.env.JWT_SECRET_KEY || 'mi_clave_secreta';
      const decoded: any = jwt.verify(token, secretKey);

      if (decoded.rol === 15) {
        return true;
      } else {
        throw new UnauthorizedException('Rol no autorizado');
      }
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}