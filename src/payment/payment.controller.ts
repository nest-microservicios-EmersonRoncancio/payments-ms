import { Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-payment-session')
  createPaymentSession() {
    return {
      message: 'Create payment session',
    };
  }

  @Get('success')
  success() {
    return {
      message: 'Payment success',
    };
  }

  @Get('cancel')
  cancel() {
    return {
      message: 'Payment cancel',
    };
  }

  @Post('webhook')
  webhook() {
    return {
      message: 'Webhook',
    };
  }
}
