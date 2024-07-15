/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from '../posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';

describe('PostsService', () => {
  let service: PostsService;
  let repository: Repository<Post>;

  beforeEach(async () => {
    const repositoryToken = getRepositoryToken(Post);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          // FIXME: Use mock repository instead of real repository, so we can drop spyOn usage
          provide: repositoryToken,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<Post>>(repositoryToken);
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
    const posts: Post[] = [
      {
        id: '1',
        title: 'Post title',
        content: 'Post content',
        author: {
          name: 'John Doe',
          id: '1',
        },
        authorId: '1',
        publishedAt: new Date(),
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '2',
        title: 'Post title',
        content: 'Post content',
        author: {
          name: 'John Doe',
          id: '1',
        },
        authorId: '1',
        publishedAt: null,
        isPublished: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];

    jest
      .spyOn(repository, 'findAndCount')
      .mockResolvedValue([posts, posts.length]);

    const found = await service.findAll({
      page: 1,
      limit: 10,
    });

    expect(found).toBeDefined();
    expect(found.data).toEqual(posts);
    expect(found.meta).toEqual({
      page: 1,
      limit: 10,
      total: posts.length,
    });
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
