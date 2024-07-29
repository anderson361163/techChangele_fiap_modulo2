import { PostsService } from './posts.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import { Auth } from '@common/decorators/role.decorator';
import { Role } from '@common/enums/role.enum';
import { SearchPostDto } from './dto/search-post.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Post as PostEntity } from './post.entity';
import { ApiPaginatedResponse } from '@common/pagination/pagination.decorator';
import { SearchAdminPostDto } from '@components/posts/dto/search-admin-post.dto';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // TODO:
  // - Error handling

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiPaginatedResponse(PostEntity)
  public async getPosts(@Req() req: Request) {
    return this.postsService.findAllPublished(req.pagination);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth([Role.ADMIN])
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Post created' })
  public async createPost(@Req() req: Request, @Body() post: CreatePostDto) {
    const { user } = req;

    return this.postsService.create({ ...post, author: user.i });
  }

  @Get('search')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({
    name: 'query',
    required: true,
    type: String,
    description: 'Search query',
  })
  @ApiPaginatedResponse(PostEntity)
  public async searchPosts(@Req() req: Request, @Query() param: SearchPostDto) {
    return this.postsService.searchPublished(req.pagination, param.query);
  }

  @Get('admin')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({
    name: 'query',
    required: false,
    type: String,
    description: 'Optional search query',
  })
  @Auth([Role.ADMIN])
  @ApiBearerAuth()
  @ApiPaginatedResponse(PostEntity)
  public async getAdminPosts(
    @Req() req: Request,
    @Query() param: SearchAdminPostDto,
  ) {
    return this.postsService.search(req.pagination, param.query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, description: 'Post ID' })
  @ApiOkResponse({
    description: 'Post found',
    type: PostEntity,
  })
  @ApiNotFoundResponse({
    description: 'Post not found',
  })
  public async getPost(@Param() { id }: { id: string }) {
    const post = this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, description: 'Post ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth([Role.ADMIN])
  @ApiBearerAuth()
  @ApiNoContentResponse({
    description: 'Post deleted',
  })
  public async deletePost(@Param() { id }: { id: string }) {
    return this.postsService.delete(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: String, description: 'Post ID' })
  @Auth([Role.ADMIN])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Post updated',
    type: PostEntity,
  })
  public async updatePost(
    @Param() { id }: { id: string },
    @Body() post: UpdatePostDto,
  ) {
    return this.postsService.update(id, post);
  }
}
