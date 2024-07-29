import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { SearchAdminPostDto } from '@components/posts/dto/search-admin-post.dto';

describe('SearchAdminPostDto', () => {
  it.each([
    [{}, []],
    [
      { query: '' },
      [
        {
          isNotEmpty: 'query should not be empty',
          minLength: 'query must be longer than or equal to 3 characters',
        },
      ],
    ],
    [
      { query: 'a'.repeat(51) },
      [
        {
          maxLength: 'query must be shorter than or equal to 50 characters',
        },
      ],
    ],
    [{ query: 'abc' }, []],
  ])('should validate SearchPostDto', async (inputData, expectedErrors) => {
    const dto = plainToInstance(SearchAdminPostDto, inputData);
    const errors = await validate(dto);

    expect(errors.map((error) => error.constraints)).toEqual(expectedErrors);
  });
});
