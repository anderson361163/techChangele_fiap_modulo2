import {IPaginatedData} from "./pagination.middleware";
import {ApiProperty} from "@nestjs/swagger";

export class PaginatedDto<T> implements IPaginatedData<T>{
  data: T[];

  @ApiProperty({
    properties: {
      page: {
        type: 'number',
        example: 1
      },
      limit: {
        type: 'number',
        example: 10
      },
      total: {
        type: 'number',
        example: 100
      }
    }
  })
  meta: {
    page: number;
    limit: number;
    total: number;
  }
}
