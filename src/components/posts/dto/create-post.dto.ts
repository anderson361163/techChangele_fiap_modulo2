import { IsBoolean, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(100)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10000)
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(125)
  author: string;

  @ApiProperty()
  @IsBoolean()
  publish: boolean;
}
