import {PostsService} from "./posts.service";
import {Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Req} from "@nestjs/common";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {Request} from "express";
import {Auth} from "../common/decorators/role.decorator";
import {Role} from "../common/enums/role.enum";
import {ILike, IsNull, Not} from "typeorm";
import {SearchPostDto} from "./dto/search-post.dto";
import {ApiBearerAuth, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam} from "@nestjs/swagger";
import {IPaginatedData} from "../common/pagination/pagination.middleware";
import {Post as PostEntity} from "./post.entity";
import {PaginatedDto} from "../common/pagination/pagination.dto";
import {ApiPaginatedResponse} from "../common/pagination/pagination.decorator";

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
  @ApiParam({ name: 'page', required: false, type: Number })
  @ApiParam({ name: 'limit', required: false, type: Number })
  @ApiPaginatedResponse(PostEntity)
  public async getPosts(
    @Req() req: Request,
  ) {
    return this.postsService.findAll([
      { publishedAt: Not(IsNull())}
    ], req.pagination);
  }

  @Post()
  @Auth([Role.ADMIN])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Post created',
    type: PostEntity
  })
  public async createPost(
    @Body() post: CreatePostDto,
  ) {
    return this.postsService.create(post);
  }

  @Get('search')
  @ApiParam({ name: 'page', required: false, type: Number })
  @ApiParam({ name: 'limit', required: false, type: Number })
  @ApiPaginatedResponse(PostEntity)
  public async searchPosts(
    @Req() req: Request,
    @Body() {query}: SearchPostDto
  ) {
    return this.postsService.findAll([
      { title: ILike(`%${query}%`), content: ILike(`%${query}%`) },
      { publishedAt: Not(IsNull())}
    ], req.pagination);
  }

  @Get('admin')
  @ApiParam({ name: 'page', required: false, type: Number })
  @ApiParam({ name: 'limit', required: false, type: Number })
  @Auth([Role.ADMIN])
  @ApiBearerAuth()
  @ApiPaginatedResponse(PostEntity)
  public async getAdminPosts(
    @Req() req: Request,
  ) {
    return this.postsService.findAll([], req.pagination);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Post found',
    type: PostEntity
  })
  @ApiNotFoundResponse({
    description: 'Post not found'
  })
  public async getPost(
    @Param() {id}: { id: string },
  ) {
    const post = this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth([Role.ADMIN])
  @ApiBearerAuth()
  @ApiNoContentResponse({
    description: 'Post deleted'
  })
  public async deletePost(
    @Param() {id}: { id: string },
  ) {
    return this.postsService.delete(id);
  }

  @Put(':id')
  @Auth([Role.ADMIN])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Post updated',
    type: PostEntity
  })
  public async updatePost(
    @Param() {id}: { id: string },
    @Body() post: UpdatePostDto,
  ) {
    return this.postsService.update(id, post);
  }
}
