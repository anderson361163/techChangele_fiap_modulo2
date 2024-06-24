import {IsBoolean, IsDate, IsNotEmpty, IsOptional, Max, MaxLength, MinLength} from "class-validator";

export class UpdatePostDto {
  @IsOptional()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10000)
  content: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(50)
  author: string;

  @IsOptional()
  @IsBoolean()
  publish?: boolean;
}
