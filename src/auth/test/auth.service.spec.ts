import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../../common/enums/role.enum';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let repository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const repositoryToken = getRepositoryToken(User);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          // FIXME: Use mock repository instead of real repository, so we can drop spyOn usage
          provide: repositoryToken,
          useClass: Repository,
        },
        JwtService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<Repository<User>>(repositoryToken);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should register a user', async () => {
    const password = 'password';
    const user: User = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await bcrypt.genSalt(10).then(() => bcrypt.hash(password, 10)),
      role: Role.USER,
      created: new Date(),
      updated: new Date(),
      deleted: null,
    };
    jest.spyOn(repository, 'save').mockResolvedValue(user);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');

    const token = await service.register({
      name: user.name,
      email: user.email,
      password: password,
      role: user.role,
    });
    expect(token).toBeDefined();
    expect(token).toBe('token');
  });

  it('should login an user', async () => {
    const password = 'password';
    const user: User = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await bcrypt.genSalt(10).then(() => bcrypt.hash(password, 10)),
      role: Role.USER,
      created: new Date(),
      updated: new Date(),
      deleted: null,
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(user);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');

    const token = await service.login(user.email, password);
    expect(token).toBeDefined();
    expect(token).toBe('token');
  });

  it("should throw an error if user doesn't exist", async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    try {
      await service.login('john@doe.com', 'password');
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
      expect(e.message).toBe('Invalid credentials');
    }
  });

  it('should throw an error if password is invalid', async () => {
    const password = 'password';
    const user: User = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await bcrypt.genSalt(10).then(() => bcrypt.hash(password, 10)),
      role: Role.USER,
      created: new Date(),
      updated: new Date(),
      deleted: null,
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(user);
    try {
      await service.login(user.email, 'invalidpassword');
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
      expect(e.message).toBe('Invalid credentials');
    }
  });
});
