import { AuthService } from '../auth.service';
import { AuthController } from '../auth.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  /*describe('register', () => {
    it('should return a token when signing up', async () => {
      const
    });
  });*/
});
