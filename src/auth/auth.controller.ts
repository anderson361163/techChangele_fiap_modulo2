import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnprocessableEntityException,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Role } from '../common/enums/role.enum';
import { Auth } from '../common/decorators/role.decorator';
import { RegisterDto } from './dto/register.dto';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { User as UserEntity } from '../users/user.entity';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBasicAuth()
  @ApiOkResponse({
    description: 'User logged in, returns the access token',
  })
  async login(@Headers('Authorization') authorization: string) {
    if (!authorization || !authorization.startsWith('Basic ')) {
      throw new UnprocessableEntityException('Missing credentials');
    }

    const [email, password] = Buffer.from(authorization.split(' ')[1], 'base64')
      .toString()
      .split(':');
    if (!email || !password) {
      throw new UnprocessableEntityException('Missing credentials');
    }

    return this.authService.login(email, password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @ApiCreatedResponse({
    description: 'User registered, returns the access token',
  })
  async register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }

  @Get('me')
  @Auth([Role.USER])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The authenticated user',
    type: UserEntity,
  })
  async me(@Req() req: Request) {
    const user = await this.usersService.findOne(req.user.e);
    /*delete user.password;*/

    return user;
  }
}
