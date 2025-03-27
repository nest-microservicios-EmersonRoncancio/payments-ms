import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentSessionDto } from './payment/payment-session.dto';
import { Request, Response } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-payment-session')
  createPaymentSession(@Body() paymentDto: PaymentSessionDto) {
    return this.paymentService.createPaymentSession(paymentDto);
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
  webhook(@Req() req: Request, @Res() res: Response) {
    return this.paymentService.webhook(req, res);
  }
}
