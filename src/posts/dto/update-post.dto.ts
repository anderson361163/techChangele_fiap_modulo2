import {IsBoolean, IsNotEmpty, IsOptional, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdatePostDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(100)
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10000)
  content: string;

  @ApiProperty()
  @IsOptional()
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
