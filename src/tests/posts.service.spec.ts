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
  //   const post = new Post();
  //   post.id = '1';
  //   post.title = 'Post title';
  //   post.content = 'Post content';
  //   post.author = {
  //     name: 'John Doe',
  //     id: '1',
  //   };

  //   jest.spyOn(repository, 'save').mockResolvedValue(post);

  //   const createdPost = await service.create({
  //     title: post.title,
  //     content: post.content,
  //     author: post.author.id,
  //     publish: true,
  //   });

  //   console.log(createdPost);

  //   expect(createdPost).toBeDefined();
  // });

  it('should find all posts', async () => {
    const post = new Post();
    post.id = '1';
    post.title = 'Post title';
    post.content = 'Post content';
    post.author = {
      name: 'John Doe',
      id: '1',
    };

    jest.spyOn(repository, 'findAndCount').mockResolvedValue([[post], 1]);

    const posts = await service.findAll({
      page: 1,
      limit: 10,
    });

    expect(posts).toBeDefined();
  });

  it('should find all published posts', async () => {
    const post = new Post();
    post.id = '1';
    post.title = 'Post title';
    post.content = 'Post content';
    post.author = {
      name: 'John Doe',
      id: '1',
    };
    post.publishedAt = new Date();

    jest.spyOn(repository, 'findAndCount').mockResolvedValue([[post], 1]);

    const posts = await service.findAllPublished({
      page: 1,
      limit: 10,
    });

    expect(posts).toBeDefined();
  });

  it('should search for posts', async () => {
    const post = new Post();
    post.id = '1';
    post.title = 'Post title';
    post.content = 'Post content';
    post.author = {
      name: 'John Doe',
      id: '1',
    };
    post.publishedAt = new Date();

    jest.spyOn(repository, 'findAndCount').mockResolvedValue([[post], 1]);

    const posts = await service.search('Post', {
      page: 1,
      limit: 10,
    });

    expect(posts).toBeDefined();
  });

  it('should find a post by id', async () => {
    const post = new Post();
    post.id = '1';
    post.title = 'Post title';
    post.content = 'Post content';
    post.author = {
      name: 'John Doe',
      id: '1',
    };
    post.publishedAt = new Date();

    jest.spyOn(repository, 'findOne').mockResolvedValue(post);

    const foundPost = await service.findOne('1');

    expect(foundPost).toBeDefined();
  });

  // it('should update a post', async () => {
  //   const post = new Post();
  //   post.id = '1';
  //   post.title = 'Post title';
  //   post.content = 'Post content';
  //   post.author = {
  //     name: 'John Doe',
  //     id: '1',
  //   };

  //   jest.spyOn(repository, 'findOne').mockResolvedValue(post);
  //   jest.spyOn(repository, 'save').mockResolvedValue(post);

  //   const updatedPost = await service.update('1', {
  //     title: 'New title',
  //     content: 'New content',
  //   });

  //   expect(updatedPost).toBeDefined();
  // });

  // it('should delete a post', async () => {
  //   const post = new Post();
  //   post.id = '1';
  //   post.title = 'Post title';
  //   post.content = 'Post content';
  //   post.author = {
  //     name: 'John Doe',
  //     id: '1',
  //   };

  //   jest.spyOn(repository, 'findOne').mockResolvedValue(post);
  //   jest.spyOn(repository, 'remove').mockResolvedValue(post);

  //   const deletedPost = await service.delete('1');

  //   expect(deletedPost).toBeDefined();
  // });
});
