import { Injectable } from '@nestjs/common';
import {
  IPaginatedData,
  IPagination,
} from 'src/common/pagination/pagination.middleware';

export interface PostEntity {
  id: string;
  title: string;
  content: string;
  publishedAt?: Date;
  authorId: string;
}

export interface IPostRepository {
  create: (params: PostEntity) => Promise<PostEntity>;
  get: (id: string) => Promise<PostEntity>;
}

export class PostRepository implements IPostRepository {
  async create(params: PostEntity): Promise<PostEntity> {
    return params;
  }

  get: (id: string) => Promise<PostEntity>;
}

@Injectable()
export class PostRepositoryInMemory implements IPostRepository {
  private posts: PostEntity[] = [];

  async get(id: string): Promise<PostEntity> {
    return this.posts.find((post) => post.id === id);
  }

  private async _findAll(
    where: any[] | any,
    pagination: IPagination,
  ): Promise<IPaginatedData<PostEntity>> {
    const { page, limit } = pagination;
    const posts = this.posts.slice((page - 1) * limit, page * limit);

    return {
      data: posts,
      meta: {
        page,
        limit,
        total: this.posts.length,
      },
    };
  }

  async findAllPublished(
    pagination: IPagination,
  ): Promise<IPaginatedData<PostEntity>> {
    return this._findAll(
      {
        publishedAt: { $ne: null },
      },
      pagination,
    );
  }

  async findAll(pagination: IPagination): Promise<IPaginatedData<PostEntity>> {
    return this._findAll({}, pagination);
  }

  async search(
    query: string,
    pagination: IPagination,
  ): Promise<IPaginatedData<PostEntity>> {
    return this._findAll(
      [
        {
          title: { $regex: new RegExp(query, 'i') },
        },
        {
          content: { $regex: new RegExp(query, 'i') },
        },
      ],
      pagination,
    );
  }

  async findOne(id: string): Promise<PostEntity | null> {
    return this.posts.find((post) => post.id === id);
  }

  async create(params: PostEntity): Promise<PostEntity> {
    this.posts.push(params);

    return params;
  }

  async update(id: string, params: PostEntity): Promise<PostEntity> {
    const post = this.posts.find((post) => post.id === id);

    if (!post) {
      return null;
    }

    Object.assign(post, params);

    return post;
  }

  async delete(id: string): Promise<PostEntity> {
    const post = this.posts.find((post) => post.id === id);

    if (!post) {
      return null;
    }

    this.posts = this.posts.filter((post) => post.id !== id);

    return post;
  }

  async deleteAll(): Promise<void> {
    this.posts = [];
  }
}
