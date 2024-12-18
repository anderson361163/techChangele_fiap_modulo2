import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(125)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(125)
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(128)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
