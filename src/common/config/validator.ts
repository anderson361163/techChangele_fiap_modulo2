import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_DATABASE: Joi.string(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string(),
});
