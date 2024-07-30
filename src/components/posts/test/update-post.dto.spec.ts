import { plainToInstance } from 'class-transformer';
import { UpdatePostDto } from '@components/posts/dto/update-post.dto';
import { validate } from 'class-validator';

describe('UpdatePostDto', () => {
  it.each([
    [{}, []],
    [
      { title: '', content: '', author: '', publish: '' },
      [
        {
          isNotEmpty: 'title should not be empty',
          minLength: 'title must be longer than or equal to 10 characters',
        },
        {
          isNotEmpty: 'content should not be empty',
          minLength: 'content must be longer than or equal to 10 characters',
        },
        {
          isNotEmpty: 'author should not be empty',
          minLength: 'author must be longer than or equal to 3 characters',
        },
        {
          isBoolean: 'publish must be a boolean value',
        },
      ],
    ],
    [
      {
        title: 'a'.repeat(101),
        content: 'a'.repeat(10001),
        author: 'a'.repeat(126),
        publish: 'surely',
      },
      [
        {
          maxLength: 'title must be shorter than or equal to 100 characters',
        },
        {
          maxLength:
            'content must be shorter than or equal to 10000 characters',
        },
        {
          maxLength: 'author must be shorter than or equal to 125 characters',
        },
        {
          isBoolean: 'publish must be a boolean value',
        },
      ],
    ],
    [
      {
        title: 'a'.repeat(100),
        content: 'a'.repeat(10000),
        author: 'a'.repeat(125),
        publish: true,
      },
      [],
    ],
  ])('should validate the object', async (inputData, expectedErrors) => {
    const dto = plainToInstance(UpdatePostDto, inputData);
    const errors = await validate(dto);

    expect(errors.map((error) => error.constraints)).toEqual(expectedErrors);
  });
});
