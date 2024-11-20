import { Module } from '@nestjs/common';
import { VacantesService } from './vacantes.service';
import { VacantesController } from './vacantes.controller';
import { DatabaseModule } from 'src/database/database-module.module';

@Module({

  imports: [DatabaseModule],
  controllers: [VacantesController],
  providers: [VacantesService],

})
export class VacantesModule {}
