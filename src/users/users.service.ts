import {Injectable} from "@nestjs/common";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        email
      },
    });
  }

  public async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id }
    });
  }

  public async create(user: Pick<User, 'email' | 'password' | 'role'>): Promise<User> {
    return this.usersRepository.save(user);
  }
}
