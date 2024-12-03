import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AUserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: AUserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signToken(user);
  }

  async register(data: RegisterDto): Promise<string> {
    const user = await this.usersService.create(data);

    return this.signToken(user);
  }

  private async signToken(user: User): Promise<string> {
    const payload = {
      i: user.id,
      e: user.email,
      r: user.role,
    };
    const token = await this.jwtService.signAsync(payload);

    return token;
  }
}
