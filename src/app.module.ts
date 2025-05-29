import { Module } from '@nestjs/common';
import { PaymentModule } from './payment/payment.module';
import { HealtCheckModule } from './healt-check/healt-check.module';

@Module({
  imports: [PaymentModule, HealtCheckModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
