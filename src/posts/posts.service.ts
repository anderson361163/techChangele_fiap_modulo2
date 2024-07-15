import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull, ILike } from 'typeorm';
import { Post } from './post.entity';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  IPaginatedData,
  IPagination,
} from '../common/pagination/pagination.middleware';
import { isDefined } from 'class-validator';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  private async _findAll(
    where: any[] | any,
    pagination: IPagination,
  ): Promise<IPaginatedData<Post>> {
    const { page, limit } = pagination;
    const [posts, total] = await this.postsRepository.findAndCount({
      where,
      relations: {
        author: true,
      },
      select: {
        author: {
          id: true,
          name: true,
        },
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data: posts,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findAllPublished(
    pagination: IPagination,
  ): Promise<IPaginatedData<Post>> {
    return this._findAll(
      {
        publishedAt: Not(IsNull()),
      },
      pagination,
    );
  }

  async findAll(pagination: IPagination): Promise<IPaginatedData<Post>> {
    return this._findAll({}, pagination);
  }

  async search(
    query: string,
    pagination: IPagination,
  ): Promise<IPaginatedData<Post>> {
    return this._findAll(
      [
        {
          title: ILike(`%${query}%`),
          publishedAt: Not(IsNull()),
        },
        {
          content: ILike(`%${query}%`),
          publishedAt: Not(IsNull()),
        },
      ],
      pagination,
    );
  }

  async findOne(id: string): Promise<Post | null> {
    return this.postsRepository.findOne({
      relations: {
        author: true,
      },
      select: {
        author: {
          id: true,
          name: true,
        },
      },
      where: {
        id,
        publishedAt: Not(IsNull()),
      },
    });
  }

  async create(post: CreatePostDto): Promise<void> {
    const tempPost = {
      title: post.title,
      content: post.content,
      authorId: post.author,
      publishedAt: post.publish ? new Date() : null,
    };

    await this.postsRepository.save(tempPost, { reload: false });
  }

  async update(id: string, post: UpdatePostDto): Promise<void> {
    const tempPost = {
      title: post.title,
      content: post.content,
      publishedAt: isDefined(post.publish)
        ? post.publish
          ? new Date()
          : null
        : undefined,
    };

    await this.postsRepository.update({ id }, tempPost);
  }

  async delete(id: string): Promise<void> {
    await this.postsRepository.delete({ id });
  }
}
