import { Module } from '@nestjs/common';
import { AUsersService, UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: AUsersService,
      useClass: UsersService,
    },
  ],
  exports: [
    {
      provide: AUsersService,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
