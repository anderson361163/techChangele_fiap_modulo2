import {PostsService} from "./posts.service";
import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    // TODO
    // - Pagination
    // - Input validation
    // - Authentication
    // - Error handling
    // - Tests

    @Get()
    public async getPosts() {
      return this.postsService.findAll();
    }

    @Get(':id')
    public async getPost(
      @Param() { id }: { id: string },
    ) {
      return this.postsService.findOne(id);
    }

    @Post()
    public async createPost(
      @Body() post: CreatePostDto,
    ) {
      return this.postsService.create(post);
    }

    @Put(':id')
    public async updatePost(
      @Param() { id }: { id: string },
      @Body() post: UpdatePostDto,
    ) {
      return this.postsService.update(id, post);
    }

    @Get('admin')
    public async getAdminPosts() {
      return this.postsService.findAll(false);
    }

    @Delete(':id')
    public async deletePost(
      @Param() { id }: { id: string },
    ) {
      return this.postsService.delete(id);
    }

    @Get('search')
    public async searchPosts(
      @Body() { query }: { query: string },
    ) {
      return this.postsService.findAll(true, query);
    }
}
