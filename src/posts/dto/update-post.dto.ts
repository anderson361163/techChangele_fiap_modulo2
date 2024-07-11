import {IsBoolean, IsNotEmpty, IsOptional, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdatePostDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(100)
  title?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10000)
  content?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  publish?: boolean;
}
