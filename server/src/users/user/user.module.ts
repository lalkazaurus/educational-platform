import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UsersController } from './users.controller';


@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...userProviders,
    UserService,
  ],
  exports: [UserService]
})
export class UserModule {}
