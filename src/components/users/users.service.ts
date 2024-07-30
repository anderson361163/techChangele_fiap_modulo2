import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export abstract class AUsersService {
  abstract findOne(_email: string): Promise<User | null>;
  abstract findById(_id: string): Promise<User | null>;
  abstract create(
    user: Pick<User, 'name' | 'email' | 'password' | 'role'>,
  ): Promise<User>;
}

@Injectable()
export class UsersService extends AUsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super();
  }

  public async findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  public async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  public async create(
    user: Pick<User, 'name' | 'email' | 'password' | 'role'>,
  ): Promise<User> {
    return this.usersRepository.save(user);
  }
}
