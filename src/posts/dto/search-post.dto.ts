import {IsNotEmpty, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SearchPostDto {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    query: string;
}
