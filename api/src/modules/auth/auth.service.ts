import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { PoolClient } from 'pg';
import { SqlAuth } from './sql/index.sql';
import { IniciarSesionDto } from './dto/index';

@Injectable()
export class AuthService {
  
    constructor(private readonly databaseService: DatabaseService ){}
  
    private async getClient(): Promise<PoolClient> {
      return this.databaseService.getClient();
    }
  
    public async buscarUsuario(data: IniciarSesionDto){
      const client = await this.getClient();
      try {
        const { username, password } = data;
        const result = await client.query(SqlAuth.buscarUsuario, [username, password]);
        return result.rows;
      } catch (error) {
        throw error;
      } 
      finally {
        client.release();
      } 
    }
}
