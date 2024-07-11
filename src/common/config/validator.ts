import * as Joi from "joi";

export const validationSchema = Joi.object({
    PORT: Joi.number().default(3000),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().default(5432),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_DATABASE: Joi.string().default("blog"),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION: Joi.string().default("1d"),
});