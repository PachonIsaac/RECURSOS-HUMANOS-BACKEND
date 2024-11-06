import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import { AppController } from './app.controller';
import { ContratacionModule} from './modules/contratacion/contratacion.module';
import { DatabaseModule} from './database/database-module.module'
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ContratacionModule,
    DatabaseModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // Aplica el middleware a todas las rutas
  }
}
