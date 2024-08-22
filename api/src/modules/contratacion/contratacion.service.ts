import { Injectable } from '@nestjs/common';
import { DatabaseService} from '../../database/database.service';
import { PoolClient} from 'pg';

@Injectable()
export class ContratacionService {

  constructor(private readonly databaseService: DatabaseService){}

  private async getClient(): Promise<PoolClient> {
    return this.databaseService.getClient();
  }

  async create(): Promise<void> {
    const client = await this.getClient();
    try {
      const result = await client.query('SELECT * FROM "TALENTOHUMANO".CLIENTES');
      return result.rows;
    } catch (error) {
      throw error;
    } 
    finally {
      client.release();
    }
  }

}
