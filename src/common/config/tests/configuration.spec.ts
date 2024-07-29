import * as process from 'node:process';
import parser from '../configuration';

const setEnv = (env: Record<string, string>) => {
  for (const [key, value] of Object.entries(env)) {
    process.env[key] = value;
  }
};

const resetEnv = () => {
  for (const key of Object.keys(process.env)) {
    delete process.env[key];
  }
};

describe('Configuration Parser/Formatter', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeAll(() => {
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    resetEnv();
    setEnv(originalEnv);
  });

  it('should properly parse full configuration', () => {
    setEnv({
      PORT: '3131',
      DATABASE_HOST: 'host',
      DATABASE_PORT: '6543',
      DATABASE_USER: 'user',
      DATABASE_PASSWORD: 'password',
      DATABASE_DATABASE: 'database',
      JWT_SECRET: 'secret',
      JWT_EXPIRATION: '7d',
    });

    const parsedConfig = parser();

    expect(parsedConfig).toEqual({
      port: 3131,
      database: {
        host: 'host',
        port: 6543,
        username: 'user',
        password: 'password',
        database: 'database',
      },
      jwt: {
        secret: 'secret',
        expiration: '7d',
      },
    });
  });

  it('should properly parse partial configuration', () => {
    setEnv({
      DATABASE_HOST: 'host²',
      DATABASE_USER: 'user²',
      DATABASE_PASSWORD: 'password²',
      JWT_SECRET: 'secret²',
    });

    const parsedConfig = parser();

    expect(parsedConfig).toEqual({
      port: 3000,
      database: {
        host: 'host²',
        port: 5432,
        username: 'user²',
        password: 'password²',
        database: 'postgres',
      },
      jwt: {
        secret: 'secret²',
        expiration: '1d',
      },
    });
  });
});
