import {MiddlewareConsumer, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Post} from "./post.entity";
import {PostsService} from "./posts.service";
import {PostsController} from "./posts.controller";
import {PaginationMiddleware} from "../common/middleware/pagination.middleware";

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(PaginationMiddleware)
          .forRoutes('', 'admin', 'search')
    }
}
