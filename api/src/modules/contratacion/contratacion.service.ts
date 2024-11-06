import { Injectable} from '@nestjs/common';
import { DatabaseService} from '../../database/database.service';
import { PoolClient} from 'pg';
import { CreatePersonDto } from './dto/index';
import { SqlContratacion } from './sql/index.sql';

@Injectable()
export class ContratacionService {

  constructor(private readonly databaseService: DatabaseService ){}

  private async getClient(): Promise<PoolClient> {
    return this.databaseService.getClient();
  }

  public async getTiposDocumento(){
    const client = await this.getClient();
    try {
      const result = await client.query(SqlContratacion.getTiposDocumento);
      return result.rows;
    } catch (error) {
      throw error;
    } 
    finally {
      client.release();
    }
  }

  public async getTiposSangre(){
    const client = await this.getClient();
    try {
      const result = await client.query(SqlContratacion.getTiposSangre);
      return result.rows;
    } catch (error) {
      throw error;
    } 
    finally {
      client.release();
    }
  }

  public async guardarInfoPersonal(data: CreatePersonDto): Promise<{ statusCode: number; message: string }> {
    const client = await this.getClient();
    try {
  
        await client.query(SqlContratacion.guardarInfoPersonal, [
            data.identification_document,
            data.identification_type_id,
            data.first_name,
            data.second_name || null, 
            data.first_surname,
            data.second_surname || null, 
            data.birth_date,
            data.birth_city,
            data.birth_department,
            data.birth_country,
            data.residence_city,
            data.residence_address,
            data.email,
            data.phone || null, 
            data.blood_type_id
        ]);

        return { statusCode: 201, message: 'Persona creada exitosamente' };
    } catch (error) {
      throw new Error('Error al crear la persona: ' + error.message);
    } finally {
        client.release(); // Libera el cliente para evitar fugas de conexión
    }
}


}
