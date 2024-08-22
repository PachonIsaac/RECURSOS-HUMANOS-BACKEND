import { Module } from '@nestjs/common';
import { ContratacionController } from './contratacion.controller';
import { ContratacionService } from './contratacion.service';
import { DatabaseModule} from '../../database/database-module.module'

@Module({
  imports: [ DatabaseModule],
  controllers: [ContratacionController],
  providers: [ContratacionService]
})
export class ContratacionModule {}
