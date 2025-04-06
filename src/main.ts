import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './configs/dotenv.configs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const logger = new Logger('bootstrap');
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: envs.NATS_SERVER,
    },
  });
  // app.setGlobalPrefix('api');

  await app.listen(envs.PORT);
}
bootstrap()
  .then(() => logger.log('Application started'))
  .catch((error) => logger.error(`Application failed to start: ${error}`));
