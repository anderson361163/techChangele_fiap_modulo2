/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from '../posts/posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../posts/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';

describe('PostsService', () => {
  let service: PostsService;
  let repository: Repository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should create a post', async () => {
  //   const post = await service.create({
  //     id: '1',
  //     title: 'Post title',
  //     content: 'Post content',
  //     author: '1',
  //     publish: true,
  //   } as CreatePostDto);
  //   expect(post).toBeDefined();
  // });
});
