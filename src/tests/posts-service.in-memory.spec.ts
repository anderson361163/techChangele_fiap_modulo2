/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { PostRepositoryInMemory } from 'src/posts/posts-service.in-memory';

describe('PostsService', () => {
  let service: PostRepositoryInMemory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostRepositoryInMemory],
    }).compile();

    service = module.get<PostRepositoryInMemory>(PostRepositoryInMemory);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a post', async () => {
    const post = await service.create({
      id: '1',
      title: 'Post title',
      content: 'Post content',
      publishedAt: new Date(),
      authorId: '1',
    });
    expect(post).toBeDefined();
  });

  it('should return all posts', async () => {
    const posts = await service.findAllPublished({
      page: 1,
      limit: 10,
    });
    expect(posts).toBeDefined();
  });

  it('should return a post', async () => {
    const post = await service.create({
      id: '1',
      title: 'Post title',
      content: 'Post content',
      publishedAt: new Date(),
      authorId: '1',
    });
    const foundPost = await service.findOne('1');
    expect(foundPost).toBeDefined();
  });

  it('should update a post', async () => {
    const post = await service.create({
      id: '1',
      title: 'Post title',
      content: 'Post content',
      publishedAt: new Date(),
      authorId: '1',
    });
    const updatedPost = await service.update('1', {
      id: '1',
      title: 'Updated post title',
      content: 'Updated post content',
      publishedAt: new Date(),
      authorId: '1',
    });

    expect(updatedPost).toBeDefined();
  });

  it('should delete a post', async () => {
    const post = await service.create({
      id: '1',
      title: 'Post title',
      content: 'Post content',
      publishedAt: new Date(),
      authorId: '1',
    });
    const deletedPost = await service.delete('1');
    expect(deletedPost).toBeDefined();
  });

  it('should search posts', async () => {
    const posts = await service.search('title', {
      page: 1,
      limit: 10,
    });
    expect(posts).toBeDefined();
  });

  it('should return all posts for admin', async () => {
    const posts = await service.findAll({
      page: 1,
      limit: 10,
    });
    expect(posts).toBeDefined();
  });

  it('should delete all posts', async () => {
    const posts = await service.deleteAll();
    expect(posts);
  });
});
