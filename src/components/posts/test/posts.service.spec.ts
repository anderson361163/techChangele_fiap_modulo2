/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '../post.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';

describe('PostsService', () => {
  let service: PostService;
  let repository: Repository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'sqlite',
            database: ':memory:',
            entities: [Post],
            synchronize: true,
          }),
        }),
        TypeOrmModule.forFeature([Post]),
      ],
      providers: [PostService],
    }).compile();

    service = module.get<PostService>(PostService);
    repository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('should find all published posts', async () => {
    const posts = [
      {
        id: '1',
        title: 'Post title',
        content: 'Post content',
        author: 'John Doe',
        publishedAt: new Date(),
      },
      {
        id: '2',
        title: 'Post title²',
        content: 'Post content²',
        author: 'John Doe²',
      },
    ];

    await repository.save(posts);

    const found = await service.findAllPublished({
      page: 1,
      limit: 10,
    });

    expect(found).toBeDefined();
    expect(found.data).toMatchObject([posts[0]]);
    expect(found.meta).toEqual({
      page: 1,
      limit: 10,
      total: 1,
    });
  });

  it('should find all posts', async () => {
    const posts = [
      {
        id: '1',
        title: 'Post title',
        content: 'Post content',
        author: 'John Doe',
        publishedAt: new Date(),
      },
      {
        id: '2',
        title: 'Post title²',
        content: 'Post content²',
        author: 'John Doe²',
      },
    ];

    await repository.save(posts);

    const found = await service.findAll({
      page: 1,
      limit: 10,
    });

    expect(found).toBeDefined();
    expect(found.data).toMatchObject(posts);
    expect(found.meta).toEqual({
      page: 1,
      limit: 10,
      total: 2,
    });
  });

  it('should search for posts', async () => {
    const posts = [
      {
        id: '1',
        title: 'Post title',
        content: 'Post content',
        author: 'John Doe',
        publishedAt: new Date(),
      },
      {
        id: '2',
        title: 'Post title²',
        content: 'Post content²',
        author: 'John Doe²',
      },
      {
        id: '3',
        title: 'Post title³',
        content: 'Post content³',
        author: 'John Doe³',
        publishedAt: new Date(),
      },
    ];
    await repository.save(posts);

    {
      const found = await service.searchPublished(
        {
          page: 1,
          limit: 10,
        },
        'title³',
      );

      expect(found).toBeDefined();
      expect(found.data).toMatchObject([posts[2]]);
      expect(found.meta).toEqual({
        page: 1,
        limit: 10,
        total: 1,
      });
    }
    {
      const found = await service.searchPublished(
        {
          page: 1,
          limit: 10,
        },
        'content',
      );

      expect(found).toBeDefined();
      expect(found.data).toMatchObject([posts[0], posts[2]]);
      expect(found.meta).toEqual({
        page: 1,
        limit: 10,
        total: 2,
      });
    }
    {
      const found = await service.search(
        {
          page: 1,
          limit: 10,
        },
        'content',
      );

      expect(found).toBeDefined();
      expect(found.data).toMatchObject(posts);
      expect(found.meta).toEqual({
        page: 1,
        limit: 10,
        total: 3,
      });
    }
    {
      const found = await service.search(
        {
          page: 1,
          limit: 10,
        },
        undefined,
      );

      expect(found).toBeDefined();
      expect(found.data).toMatchObject(posts);
      expect(found.meta).toEqual({
        page: 1,
        limit: 10,
        total: 3,
      });
    }
  });

  it('should find a post by id', async () => {
    const posts = [
      {
        id: '1',
        title: 'Post title',
        content: 'Post content',
        author: 'John Doe',
        publishedAt: new Date(),
      },
      {
        id: '2',
        title: 'Post title²',
        content: 'Post content²',
        author: 'John Doe²',
      },
    ];
    await repository.save(posts);

    {
      const foundPost = await service.findOne('1');
      expect(foundPost).toMatchObject(posts[0]);
    }
    {
      const foundPost = await service.findOne('2');
      expect(foundPost).toBeNull();
    }
  });

  it('should create a post', async () => {
    {
      const post = {
        title: 'Post title',
        content: 'Post content',
        author: 'John Doe',
        publish: false,
      };

      const id = await service.create(post);
      const created = await repository.findOneBy({ id });
      expect(created).toMatchObject({
        title: post.title,
        content: post.content,
        author: post.author,
        publishedAt: null,
      });
    }
    {
      const post = {
        title: 'Post title²',
        content: 'Post content²',
        author: 'John Doe²',
        publish: true,
      };

      const id = await service.create(post);
      const created = await repository.findOneBy({ id });
      expect(created).toMatchObject({
        title: post.title,
        content: post.content,
        author: post.author,
        publishedAt: expect.any(Date),
      });
    }
  });

  it('should update a post', async () => {
    const post = {
      title: 'Post title',
      content: 'Post content',
      author: 'John Doe',
    };
    const { id } = await repository.save(post);

    {
      const updatedPost = {
        title: 'Updated title',
        content: 'Updated content',
      };
      await service.update(id, updatedPost);

      const foundPost = await repository.findOneBy({ id });
      expect(foundPost).toMatchObject({
        title: updatedPost.title,
        content: updatedPost.content,
        author: post.author,
        publishedAt: null,
      });
    }
    {
      const updatedPost = {
        title: 'Updated title again',
        content: 'Updated content once more',
        publish: true,
      };
      await service.update(id, updatedPost);

      const foundPost = await repository.findOneBy({ id });
      expect(foundPost).toMatchObject({
        title: updatedPost.title,
        content: updatedPost.content,
        author: post.author,
        publishedAt: expect.any(Date),
      });
    }
  });

  it('should delete a post', async () => {
    const post = {
      title: 'Post title',
      content: 'Post content',
      author: 'John Doe',
    };
    const { id } = await repository.save(post);

    await service.delete(id);

    const foundPost = await repository.findOneBy({
      id,
    });

    expect(foundPost).toBeNull();
  });
});
