import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../../common/enums/role.enum';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const user = new User();
    user.id = '1';
    user.name = 'John Doe';
    (user.email = 'johndoe@example.com'), (user.password = 'password');
    user.role = Role.USER;

    jest.spyOn(usersService, 'create').mockResolvedValue(user);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');

    const token = await controller.register({
      email: user.email,
      name: user.name,
      password: user.password,
      role: user.role,
    });

    expect(token).toBeDefined();
  });

  it('should login a user', async () => {
    const user = new User();
    user.id = '1';
    user.name = 'John Doe';
    user.email = 'johndoe@example.com';
    user.password = 'password';
    user.role = Role.USER;

    jest.spyOn(usersService, 'create').mockResolvedValue(user);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');

    const token = await controller.register({
      email: user.email,
      name: user.name,
      password: user.password,
      role: user.role,
    });

    jest.spyOn(authService, 'login').mockResolvedValue(token);

    const login = await authService.login(user.email, user.password);

    expect(login).toBeDefined();
  });
});
