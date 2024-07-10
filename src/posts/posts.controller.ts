import {PostsService} from "./posts.service";
import {Body, Controller, Delete, Get, Param, Post, Put, Req} from "@nestjs/common";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {Request} from "express";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    // TODO
    // - Authentication
    // - Error handling
    // - Tests

    @Get()
    public async getPosts(
      @Req() req: Request,
    ) {
      const { page, limit } = req.pagination;

      return this.postsService.findAll(page, limit);
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
    public async getAdminPosts(
      @Req() req: Request,
    ) {
      const { page, limit } = req.pagination;

      return this.postsService.findAll(page, limit, false);
    }

    @Delete(':id')
    public async deletePost(
      @Param() { id }: { id: string },
    ) {
      return this.postsService.delete(id);
    }

    @Get('search')
    public async searchPosts(
      @Req() req: Request,
      @Body() { query }: { query: string },
    ) {
      const { page, limit } = req.pagination;

      return this.postsService.findAll(page, limit, true, query);
    }
}
