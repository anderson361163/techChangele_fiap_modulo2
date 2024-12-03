import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull, ILike } from 'typeorm';
import { Post } from './post.entity';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  IPaginatedData,
  IPagination,
} from '@common/pagination/pagination.middleware';
import { isDefined } from 'class-validator';

@Injectable()
export class PostService {
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
    pagination: IPagination,
    query?: string,
  ): Promise<IPaginatedData<Post>> {
    return this._findAll(
      query
        ? [
            {
              title: ILike(`%${query}%`),
            },
            {
              content: ILike(`%${query}%`),
            },
          ]
        : [],
      pagination,
    );
  }

  async searchPublished(
    pagination: IPagination,
    query: string,
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
      where: {
        id,
        publishedAt: Not(IsNull()),
      },
    });
  }

  async create(post: CreatePostDto): Promise<string> {
    const tempPost = {
      title: post.title,
      content: post.content,
      author: post.author,
      publishedAt: post.publish ? new Date() : null,
    };

    const { id } = await this.postsRepository.save(tempPost);
    return id;
  }

  async update(id: string, post: UpdatePostDto): Promise<void> {
    const tempPost = {
      title: post.title,
      content: post.content,
      author: post.author,
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
