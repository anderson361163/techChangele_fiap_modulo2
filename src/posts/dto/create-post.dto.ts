import {IsBoolean, IsNotEmpty, IsOptional, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

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
  @MaxLength(50)
  author: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  publish?: boolean;
}
