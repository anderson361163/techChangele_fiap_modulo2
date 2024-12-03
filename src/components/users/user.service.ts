import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IPagination } from '@common/pagination/pagination.middleware';
import * as bcrypt from 'bcrypt';

export abstract class AUserService {
  abstract findAll(filters: any, pagination: IPagination);
  abstract findOne(_email: string): Promise<User | null>;
  abstract findById(_id: string): Promise<User | null>;
  abstract create(
    user: Pick<User, 'name' | 'email' | 'password' | 'role'>,
  ): Promise<User>;
  abstract update(
    id: string,
    user: Pick<User, 'name' | 'email' | 'password' | 'role'>,
  ): Promise<UpdateResult>;
  abstract delete(id: string): Promise<DeleteResult>;
}

@Injectable()
export class UserService extends AUserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super();
  }

  public async findAll(filters: any, pagination: IPagination) {
    return this.usersRepository.findAndCount({
      where: filters,
      take: pagination.limit,
      skip: (pagination.page - 1) * pagination.limit,
    });
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
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    return this.usersRepository.save({ ...user, password: hash });
  }

  public async update(id: string, user: User): Promise<UpdateResult> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    return this.usersRepository.update(id, { ...user, password: hash });
  }

  public async delete(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
