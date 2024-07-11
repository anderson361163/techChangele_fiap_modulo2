import {Body, Controller, Get, Header, Headers, HttpCode, HttpStatus, Post, Req, UnprocessableEntityException, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {Request} from "express";
import {Role} from "../common/enums/role.enum";
import {Auth} from "../common/decorators/role.decorator";
import {RegisterDto} from "./dto/register.dto";
import {ApiBasicAuth, ApiBearerAuth, ApiSecurity} from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBasicAuth()
  async login(@Headers('Authorization') authorization: string) {
    if (!authorization || !authorization.startsWith('Basic ')) {
      throw new UnprocessableEntityException('Missing credentials');
    }

    const [email, password] = Buffer.from(authorization.split(' ')[1], 'base64').toString().split(':');
    if (!email || !password) {
      throw new UnprocessableEntityException('Missing credentials');
    }

    return this.authService.login(email, password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }

  @Get('me')
  @Auth([Role.USER])
  @ApiBearerAuth()
  async me(@Req() req: Request) {
    return req.user!;
  }
}
