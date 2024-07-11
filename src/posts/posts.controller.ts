import {PostsService} from "./posts.service";
import {Body, Controller, Delete, Get, Param, Post, Put, Req} from "@nestjs/common";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {Request} from "express";
import {Auth} from "../common/decorators/role.decorator";
import {Role} from "../common/enums/role.enum";
import {ILike, IsNull, Not} from "typeorm";
import {SearchPostDto} from "./dto/search-post.dto";

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {
  }

  // TODO:
  // - Error handling
  // - Tests

  @Get()
  public async getPosts(
    @Req() req: Request,
  ) {
    return this.postsService.findAll([
      { publishedAt: Not(IsNull())}
    ], req.pagination);
  }

  @Post()
  @Auth([Role.ADMIN])
  public async createPost(
    @Body() post: CreatePostDto,
  ) {
    return this.postsService.create(post);
  }

  @Get('search')
  public async searchPosts(
    @Req() req: Request,
    @Body() {query}: SearchPostDto,
  ) {
    console.log('Howdy bitch');

    return this.postsService.findAll([
      { title: ILike(`%${query}%`), content: ILike(`%${query}%`) },
      { publishedAt: Not(IsNull())}
    ], req.pagination);
  }

  @Get('admin')
  @Auth([Role.ADMIN])
  public async getAdminPosts(
    @Req() req: Request,
  ) {
    return this.postsService.findAll([], req.pagination);
  }

  @Get(':id')
  public async getPost(
    @Param() {id}: { id: string },
  ) {
    return this.postsService.findOne(id);
  }

  @Delete(':id')
  @Auth([Role.ADMIN])
  public async deletePost(
    @Param() {id}: { id: string },
  ) {
    return this.postsService.delete(id);
  }

  @Put(':id')
  @Auth([Role.ADMIN])
  public async updatePost(
    @Param() {id}: { id: string },
    @Body() post: UpdatePostDto,
  ) {
    return this.postsService.update(id, post);
  }
}
