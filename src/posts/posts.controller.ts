import {PostsService} from "./posts.service";
import {Controller, Get} from "@nestjs/common";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    getPosts() {
      return this.postsService.findAll();
    }
}
