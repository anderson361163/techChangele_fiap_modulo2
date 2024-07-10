import {InjectRepository} from "@nestjs/typeorm";
import {Repository, Not, IsNull, ILike} from "typeorm";
import {Post} from "./post.entity";
import {Injectable} from "@nestjs/common";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {IPaginatedData} from "../common/pagination.middleware";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
    ) {}

    async findAll(
      page = 1,
      limit = 10,
      onlyPublished: boolean = true,
      searchTerm?: string
    ): Promise<IPaginatedData<Post>> {
        const where: any = [];
        if (searchTerm) {
            where.push({ title: ILike(`%${searchTerm}%`), content: ILike(`%${searchTerm}%`) });
        }
        if (onlyPublished) {
            where.push({ publishedAt: Not(IsNull())});
        }

        const [posts, total] = await this.postsRepository.findAndCount({ where, take: limit, skip: (page - 1) * limit});

        return {
            data: posts,
            meta: {
                page,
                limit,
                total
            }
        }
    }

    async findOne(id: string): Promise<Post> {
        return this.postsRepository.findOne({
            where: {
                id
            }
        });
    }

    async create(post: CreatePostDto): Promise<Post> {
        const tempPost = {
            title: post.title,
            content: post.content,
            author: post.author,
            publishedAt: post.publish ? new Date() : null,
        };

        return this.postsRepository.save(tempPost);
    }

    async update(id: string, post: UpdatePostDto): Promise<void> {
        const tempPost = {
            title: post.title,
            content: post.content,
            author: post.author,
            publishedAt: post.publish ? new Date() : null,
        };

        await this.postsRepository.update({ id }, tempPost);
    }

    async delete(id: string): Promise<void> {
        await this.postsRepository.delete({ id });
    }
}
