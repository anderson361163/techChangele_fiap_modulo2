import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Post} from "./post.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
    ) {}

    async findAll(): Promise<Post[]> {
        return this.postsRepository.find();
    }

    async findOne(id: string): Promise<Post> {
        return this.postsRepository.findOne({
            where: {
                id
            }
        });
    }

    async create(post: Post): Promise<Post> {
        return this.postsRepository.save(post);
    }
}
