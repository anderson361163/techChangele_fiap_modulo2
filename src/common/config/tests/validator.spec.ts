import { validationSchema } from '@common/config/validator';

describe('Configuration Validator', () => {
  it('should validate full configuration', () => {
    const config = {
      PORT: '3030',
      DATABASE_HOST: 'host',
      DATABASE_PORT: '6543',
      DATABASE_USER: 'user',
      DATABASE_PASSWORD: 'password',
      DATABASE_DATABASE: 'database',
      JWT_SECRET: 'secret',
      JWT_EXPIRATION: '7d',
    };

    const expectedConfig = {
      ...config,
      PORT: 3030,
      DATABASE_PORT: 6543,
    };

    const { error, value } = validationSchema.validate(config);
    expect(error).toBeUndefined();
    expect(value).toEqual(expectedConfig);
  });

  it('should validate partial configuration', () => {
    const config = {
      PORT: '3131',
      DATABASE_HOST: 'host²',
      DATABASE_USER: 'user²',
      DATABASE_PASSWORD: 'password²',
      JWT_SECRET: 'secret²',
    };

    const expectedConfig = {
      ...config,
      PORT: 3131,
    };

    const { error, value } = validationSchema.validate(config);
    expect(error).toBeUndefined();
    expect(value).toEqual(expectedConfig);
  });

  it('should return error for invalid configuration', () => {
    {
      const config = {};

      const { error } = validationSchema.validate(config, {
        abortEarly: false,
      });
      expect(error).toBeDefined();
      expect(error.details).toMatchObject([
        {
          message: '"DATABASE_HOST" is required',
        },
        {
          message: '"DATABASE_USER" is required',
        },
        {
          message: '"DATABASE_PASSWORD" is required',
        },
        {
          message: '"JWT_SECRET" is required',
        },
      ]);
    }
    {
      const config = {
        PORT: 'invalid',
        DATABASE_HOST: 'valid',
        DATABASE_PORT: 'invalid',
        DATABASE_USER: 'valid',
        DATABASE_PASSWORD: 'valid',
        JWT_SECRET: 'valid',
      };

      const { error } = validationSchema.validate(config, {
        abortEarly: false,
      });
      expect(error).toBeDefined();
      expect(error.details).toMatchObject([
        {
          message: '"PORT" must be a number',
        },
        {
          message: '"DATABASE_PORT" must be a number',
        },
      ]);
    }
  });
});
