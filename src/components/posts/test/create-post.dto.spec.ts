import { CreatePostDto } from '@components/posts/dto/create-post.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('CreatePostDto', () => {
  it.each([
    [
      {},
      [
        {
          isNotEmpty: 'title should not be empty',
          minLength: 'title must be longer than or equal to 10 characters',
          maxLength: 'title must be shorter than or equal to 100 characters',
        },
        {
          isNotEmpty: 'content should not be empty',
          minLength: 'content must be longer than or equal to 10 characters',
          maxLength:
            'content must be shorter than or equal to 10000 characters',
        },
        {
          isNotEmpty: 'author should not be empty',
          minLength: 'author must be longer than or equal to 3 characters',
          maxLength: 'author must be shorter than or equal to 125 characters',
        },
        {
          isBoolean: 'publish must be a boolean value',
        },
      ],
    ],
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
        publish: false,
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
      ],
    ],
    [
      {
        title: 'Title Title',
        content: 'Content Content',
        author: 'Author',
        publish: true,
      },
      [],
    ],
  ])('should validate CreatePostDto', async (inputData, expectedErrors) => {
    const dto = plainToInstance(CreatePostDto, inputData);
    const errors = await validate(dto);

    expect(errors.map((error) => error?.constraints)).toEqual(expectedErrors);
  });
});
