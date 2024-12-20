import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailService } from './email.service';
import { DatabaseModule } from 'src/database/database-module.module';

@Module({
  imports: [DatabaseModule ],
  controllers: [AuthController],
  providers: [AuthService, EmailService],
})
export class AuthModule {}
