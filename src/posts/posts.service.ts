import {InjectRepository} from "@nestjs/typeorm";
import {Repository, Not, IsNull, UpdateResult, ILike} from "typeorm";
import {Post} from "./post.entity";
import {Injectable} from "@nestjs/common";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
    ) {}

    async findAll(onlyPublished: boolean = true, searchTerm?: string): Promise<Post[]> {
        const where: any = [];
        if (searchTerm) {
            where.push({ title: ILike(`%${searchTerm}%`), content: ILike(`%${searchTerm}%`) });
        }
        if (onlyPublished) {
            where.push({ publishedAt: Not(IsNull())});
        }

        return this.postsRepository.find({ where });
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
