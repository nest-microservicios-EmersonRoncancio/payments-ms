import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { envs } from './configs/dotenv.configs';

const logger = new Logger('bootstrap');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(envs.PORT);
}
bootstrap()
  .then(() => logger.log('Application started'))
  .catch((error) => logger.error(`Application failed to start: ${error}`));
