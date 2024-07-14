/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../common/enums/role.enum';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
        JwtService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<Repository<User>>('UserRepository');
  });

  // it('should register a user', async () => {
  //   const user = new User();
  //   user.id = '1';
  //   name: 'John Doe';
  //   user.email = 'johndoe@example.com';
  //   user.password = 'password';
  //   user.role = Role.USER;

  //   jest.spyOn(repository, 'save').mockResolvedValue(user);

  //   const token = await service.register({
  //     name: user.name,
  //     email: user.email,
  //     password: user.password,
  //     role: user.role,
  //   });
  //   expect(token).toBeDefined();
  // });

  // it('should validate a user', async () => {
  //   const user = new User();
  //   user.id = '1';
  //   user.email = 'johndoe@example.com';
  //   user.password = 'password';
  //   user.role = Role.USER;

  //   jest.spyOn(repository, 'findOne').mockResolvedValue(user);
  //   jest.spyOn(repository, 'save').mockResolvedValue(user);

  //   const token = await service.login(user.email, user.password);
  //   expect(token).toBeDefined();
  // });

  it('should not validate a user', async () => {
    const user = new User();
    user.id = '1';
    user.email = 'johndoe@example.com';
    user.password = 'password';
    user.role = Role.USER;

    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    try {
      await service.login(user.email, user.password);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});