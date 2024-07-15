import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../users.service';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should register a user', async () => {
  //   const user = new User();
  //   user.id = '1';
  //   user.name = 'John Doe';
  //   user.email = 'johndoe@example.com';
  //   user.password = 'password';
  //   user.role = Role.USER;

  //   jest.spyOn(repository, 'save').mockResolvedValue(user);

  //   const token = await service.register({
  //     email: user.email,
  //     name: user.name,
  //     password: user.password,
  //     role: user.role,
  //   });

  //   expect(token).toBeDefined();
  // });
});
