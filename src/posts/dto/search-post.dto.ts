import {IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class SearchPostDto {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    query: string;
}
