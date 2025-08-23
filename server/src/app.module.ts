import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';

@Module({
  imports: [AuthModule, DatabaseModule, ConfigModule.forRoot({
    isGlobal: true
  }), TokenModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
