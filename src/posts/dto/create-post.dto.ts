import {IsBoolean, IsNotEmpty, MaxLength, MinLength} from "class-validator";
import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";

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

  @ApiHideProperty()
  author: string;

  @ApiProperty()
  @IsBoolean()
  publish: boolean;
}
