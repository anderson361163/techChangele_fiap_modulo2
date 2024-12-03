import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AUserService, UserService } from '../../users/user.service';
import { User } from '../../users/user.entity';
import { Repository } from 'typeorm';
import { Role } from '@common/enums/role.enum';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let repository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const repositoryToken = getRepositoryToken(User);

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'sqlite',
            database: ':memory:',
            entities: [User],
            synchronize: true,
          }),
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [
        AuthService,
        {
          provide: AUserService,
          useClass: UserService,
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
    const user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await bcrypt.genSalt(10).then(() => bcrypt.hash(password, 10)),
      role: Role.USER,
    };

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
    const user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await bcrypt.genSalt(10).then(() => bcrypt.hash(password, 10)),
      role: Role.USER,
    };

    await repository.save(user);

    jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');
    const token = await service.login(user.email, password);
    expect(token).toBeDefined();
    expect(token).toBe('token');
  });

  it("should throw an error if user doesn't exist or password is invalid", async () => {
    {
      // User doesn't exist
      try {
        await service.login('john@doe.com', 'password');
      } catch (e) {
        expect(e).toBeInstanceOf(UnauthorizedException);
        expect(e.message).toBe('Invalid credentials');
      }
    }
    {
      // Invalid password
      const password = 'password';
      const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await bcrypt
          .genSalt(10)
          .then(() => bcrypt.hash(password, 10)),
        role: Role.USER,
      };
      await repository.save(user);

      try {
        await service.login(user.email, 'invalidpassword');
      } catch (e) {
        expect(e).toBeInstanceOf(UnauthorizedException);
        expect(e.message).toBe('Invalid credentials');
      }
    }
  });
});
