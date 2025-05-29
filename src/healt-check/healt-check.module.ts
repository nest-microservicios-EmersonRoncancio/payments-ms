import { Module } from '@nestjs/common';
import { HealtCheckController } from './healt-check.controller';

@Module({
  controllers: [HealtCheckController],
  providers: [],
})
export class HealtCheckModule {}
