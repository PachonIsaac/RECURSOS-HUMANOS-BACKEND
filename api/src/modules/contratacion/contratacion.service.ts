import { Injectable} from '@nestjs/common';
import { DatabaseService} from '../../database/database.service';
import { PoolClient} from 'pg';
import { CreatePersonDto, GenerarDocumentosDto, GuadarInscripcionDto, GuardarDocumentoDto } from './dto/index';
import { SqlContratacion } from './sql/contratacion.sql';

@Injectable()
export class ContratacionService {

  constructor(private readonly databaseService: DatabaseService ){}

  private async getClient(): Promise<PoolClient> {
    return this.databaseService.getClient();
  }

  public async guardarInfoPersonal(data: CreatePersonDto): Promise<{ statusCode: number; message: string }> {
    const client = await this.getClient();
    try {
  
         const result =  await client.query(SqlContratacion.guardarInfoPersonal, [
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

        return result.rows[0].id;
    } catch (error) {
      throw new Error('Error al crear la persona: ' + error.message);
    } finally {
        client.release(); // Libera el cliente para evitar fugas de conexión
    }
}

  public async guardarInscripcion(data: GuadarInscripcionDto){
    const client = await this.getClient();
    try {
      const result = await client.query(SqlContratacion.guardarInscripcion, [
        data.person_id,
        data.offer_id,
        data.period
      ]);
      return result.rows[0].id;
    } catch (error) {
      throw new Error('Error al guardar la inscripción: ' + error.message);
    } finally {
      client.release();
    }
  }

  public async generarDocumentos(data: GenerarDocumentosDto){
    const client = await this.getClient();
    try {
      await client.query(SqlContratacion.generarDocumentos, [
        data.enrolled_id,
      ]);

      return await client.query(SqlContratacion.listarDocumentos, [ 
        data.enrolled_id 
      ]);

    } catch (error) {
      throw new Error('Error al generar los documentos: ' + error.message);
    } finally {
      client.release();
    }
  }

  public async guardarDocumento(data: GuardarDocumentoDto, file: Express.Multer.File){
    const client = await this.getClient();
    try {
      const result = await client.query(SqlContratacion.guardarDocumento, [
        data.enrolleddoc_id,
        file.buffer,
        file.filename
      ]);
      return result.rows[0].id;
    } catch (error) {
      throw new Error('Error al guardar el documento: ' + error.message);
    } finally {
      client.release();
    }
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

  public async generarCertificado(data: any){
    const client = await this.getClient();
    try {
      const result = await client.query(SqlContratacion.generarCertificado, [
        data.person_id,
        data.offer_id
      ]);
      return result.rows[0].id;
    } catch (error) {
      throw new Error('Error al generar el certificado: ' + error.message);
    } finally {
      client.release();
    }
  }



}
