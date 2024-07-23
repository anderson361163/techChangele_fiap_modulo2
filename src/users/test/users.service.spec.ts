import { Test, TestingModule } from '@nestjs/testing';
import { AUsersService, UsersService } from '../users.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { Role } from '../../common/enums/role.enum';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
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
        {
          provide: AUsersService,
          useClass: UsersService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(AUsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should find one by email', async () => {
    await repository.save([
      {
        email: 'blah@blah.blah',
        name: 'John Doe',
        password: '123',
        role: Role.USER,
      },
      {
        email: 'email@email.email',
        name: 'John Doe²',
        password: '123',
        role: Role.ADMIN,
      },
    ]);

    {
      const result = await service.findOne('email@email.email');
      expect(result).toMatchObject({
        email: 'email@email.email',
        name: 'John Doe²',
        password: '123',
        role: Role.ADMIN,
      });
    }
    {
      const result = await service.findOne('invalid@invalid.invalid');
      expect(result).toBeNull();
    }
  });

  it('should find one by id', async () => {
    await repository.save([
      {
        id: '1',
        email: 'blah@blah.blah',
        name: 'John Doe',
        password: '123',
        role: Role.USER,
      },
      {
        id: '2',
        email: 'email@email.email',
        name: 'John Doe²',
        password: '123',
        role: Role.ADMIN,
      },
    ]);

    {
      const result = await service.findById('2');
      expect(result).toMatchObject({
        id: '2',
        email: 'email@email.email',
        name: 'John Doe²',
        password: '123',
        role: Role.ADMIN,
      });
    }
    {
      const result = await service.findById('3');
      expect(result).toBeNull();
    }
  });

  it('should create a user', async () => {
    const user = {
      email: 'email@email.email',
      name: 'John Doe',
      password: '123',
      role: Role.USER,
    };
    const result = await service.create(user);

    expect(result).toMatchObject(user);
    expect(result.id).toBeDefined();
    expect(result.created).toBeDefined();
    expect(result.updated).toBeDefined();
  });
});
