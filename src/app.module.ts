import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { validationSchema as envValidationSchema } from "./common/config/validator";
import {PostsModule} from "./posts/posts.module";
import configuration from "./common/config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidationSchema,
      load: [configuration],
      envFilePath: ['.env.development', '.env.test', '.env'],
      isGlobal: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
