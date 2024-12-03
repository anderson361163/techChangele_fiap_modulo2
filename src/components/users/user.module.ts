import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AUserService, UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PaginationMiddleware } from '@common/pagination/pagination.middleware';
import { UserController } from '@components/users/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: AUserService,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: AUserService,
      useClass: UserService,
    },
  ],
  controllers: [UserController],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PaginationMiddleware).forRoutes('');
  }
}
