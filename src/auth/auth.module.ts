import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {UsersModule} from "../users/users.module";
import {AuthService} from "./auth.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "../common/guards/auth.guard";

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiration'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
}
