import { SearchPostDto } from '@components/posts/dto/search-post.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('SearchPostDto', () => {
  it.each([
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
    const dto = plainToInstance(SearchPostDto, inputData);
    const errors = await validate(dto);

    expect(errors.map((error) => error.constraints)).toEqual(expectedErrors);
  });
});
