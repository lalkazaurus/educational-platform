import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Token } from './entities/tokens.entity';
import { tokenProviders } from './token.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/users/user/user.module';

@Module({
  providers: [
    TokenService,
    Token,
    ...tokenProviders
  ],
  imports: [
    JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET')
        }),
    }),
    DatabaseModule,
    UserModule
  ], 
  exports: [TokenService, ...tokenProviders]
})
export class TokenModule {}
