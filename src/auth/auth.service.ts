import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {RegisterUserDto} from "./dto/registerUserDto";

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
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

    const payload = {
      i: user.id,
      e: user.email,
      r: user.role,
    }
    const token = await this.jwtService.signAsync(payload);

    return token;
  }

  async register(data: RegisterUserDto): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);

    const user = await this.usersService.create({ ...data, password: hash });

    return this.login(user.email, data.password);
  }
}
