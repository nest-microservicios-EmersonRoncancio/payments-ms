import 'dotenv/config';
import * as joi from 'joi';

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    SECRET_KEY_STRIPE: joi.string().required(),
    SECRET_KEY_WEBHOOK_STRIPE: joi.string().required(),
    SUCCES_URL: joi.string().required(),
    CANCEL_URL: joi.string().required(),
  })
  .unknown(true);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

interface Env {
  PORT: number;
  SECRET_KEY_STRIPE: string;
  SECRET_KEY_WEBHOOK_STRIPE: string;
  SUCCES_URL: string;
  CANCEL_URL: string;
}

const env: Env = value as Env;

export const envs = {
  PORT: env?.PORT,
  SECRET_KEY_STRIPE: env?.SECRET_KEY_STRIPE,
  SECRET_KEY_WEBHOOK_STRIPE: env?.SECRET_KEY_WEBHOOK_STRIPE,
  SUCCES_URL: env?.SUCCES_URL,
  CANCEL_URL: env?.CANCEL_URL,
};
