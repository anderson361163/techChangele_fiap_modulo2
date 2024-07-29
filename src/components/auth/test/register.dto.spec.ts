import { RegisterDto } from '../dto/register.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('RegisterDto', () => {
  it.each([
    [
      {},
      [
        {
          isNotEmpty: 'name should not be empty',
          maxLength: 'name must be shorter than or equal to 125 characters',
          minLength: 'name must be longer than or equal to 3 characters',
        },
        {
          isEmail: 'email must be an email',
          isNotEmpty: 'email should not be empty',
          maxLength: 'email must be shorter than or equal to 125 characters',
        },
        {
          isNotEmpty: 'password should not be empty',
          isStrongPassword: 'password is not strong enough',
          maxLength: 'password must be shorter than or equal to 128 characters',
        },
        {
          isEnum: 'role must be one of the following values: user, admin',
          isNotEmpty: 'role should not be empty',
        },
      ],
    ],
    [
      { name: '', email: '', password: '', role: '' },
      [
        {
          isNotEmpty: 'name should not be empty',
          minLength: 'name must be longer than or equal to 3 characters',
        },
        {
          isEmail: 'email must be an email',
          isNotEmpty: 'email should not be empty',
        },
        {
          isNotEmpty: 'password should not be empty',
          isStrongPassword: 'password is not strong enough',
        },
        {
          isEnum: 'role must be one of the following values: user, admin',
          isNotEmpty: 'role should not be empty',
        },
      ],
    ],
    [
      {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'weak-password',
        role: 'invalid-role',
      },
      [
        { isEmail: 'email must be an email' },
        { isStrongPassword: 'password is not strong enough' },
        { isEnum: 'role must be one of the following values: user, admin' },
      ],
    ],
    [
      {
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'strongPassword123!',
        role: 'user',
      },
      [],
    ],
  ])('should validate the input data', async (inputData, expectedErrors) => {
    {
      const dto = plainToInstance(RegisterDto, inputData);
      const errors = await validate(dto);

      expect(errors.map((error) => error?.constraints)).toEqual(expectedErrors);
    }
  });
});
