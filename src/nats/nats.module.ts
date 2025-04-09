import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/configs/dotenv.configs';
import { NATS_CLIENT } from 'src/configs/services.configs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NATS_CLIENT,
        transport: Transport.NATS,
        options: {
          servers: envs.NATS_SERVER,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: NATS_CLIENT,
        transport: Transport.NATS,
        options: {
          servers: envs.NATS_SERVER,
        },
      },
    ]),
  ],
})
export class NatsModule {}
