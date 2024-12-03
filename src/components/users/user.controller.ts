import { AUserService } from '@components/users/user.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@components/users/user.entity';
import { Auth } from '@common/decorators/role.decorator';
import { Role } from '@common/enums/role.enum';
import { ApiPaginatedResponse } from '@common/pagination/pagination.decorator';
import { SearchUserDto } from '@components/users/dto/search-user.dto';
import { Request } from 'express';
import { RegisterDto as CreateUserDto } from '@components/auth/dto/register.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: AUserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @Auth([Role.ADMIN])
  @ApiBearerAuth()
  @ApiPaginatedResponse(User)
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'role', enum: Role, required: false })
  async getUsers(@Req() req: Request, @Query() param: SearchUserDto) {
    const query = {
      role: param.role,
      ...(param.name && { name: { $regex: param.name, $options: 'i' } }),
      ...(param.email && { email: param.email }),
    };

    return this.userService.findAll(query, req.pagination);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @Auth([Role.ADMIN])
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  async getUser(@Param() { id }: { id: string }) {
    const user = this.userService.findById(id);

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @Auth([Role.ADMIN])
  @ApiBearerAuth()
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @Auth([Role.ADMIN])
  @ApiBearerAuth()
  async updateUser(
    @Param() { id }: { id: string },
    @Body() updateUserDto: CreateUserDto,
  ) {
    await this.userService.update(id, updateUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @Auth([Role.ADMIN])
  @ApiBearerAuth()
  async deleteUser(@Param() { id }: { id: string }) {
    await this.userService.delete(id);
  }
}
