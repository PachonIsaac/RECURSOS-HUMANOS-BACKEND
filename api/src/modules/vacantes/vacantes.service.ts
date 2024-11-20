import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { PoolClient } from 'pg';
import { SqlVacantes } from './sql/vacantes.sql';


@Injectable()
export class VacantesService {

  constructor(private readonly databaseService: DatabaseService) {}

  private async getClient(): Promise<PoolClient> {
    return this.databaseService.getClient();
  }
  
  public async listarVacantes() {
    const client = await this.getClient();
    try {
        const result = await client.query(SqlVacantes.listarVacantes);

        return result.rows;
        
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
  }

  public async listarTrabajos() {
    const client = await this.getClient();
    try {
        const result = await client.query(SqlVacantes.listarTrabajos);

        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
  }

  public async listarAspirantes(offer_id: number) {
    const client = await this.getClient();
    try {
        const result = await client.query(SqlVacantes.listarAspirantes, [offer_id]);
        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
  }
}