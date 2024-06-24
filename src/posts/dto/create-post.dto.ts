import {IsBoolean, IsDate, IsNotEmpty, IsOptional, Max, MaxLength, MinLength} from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10000)
  content: string;

  @IsNotEmpty()
  @MaxLength(50)
  author: string;

  @IsOptional()
  @IsBoolean()
  publish?: boolean;
}
