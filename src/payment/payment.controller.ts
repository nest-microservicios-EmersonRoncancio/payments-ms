import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { Request, Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { envs } from 'src/configs/dotenv.configs';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @Post('create-payment-session')
  @MessagePattern('create.payment.session')
  createPaymentSession(@Payload() paymentDto: PaymentSessionDto) {
    console.log(envs.SECRET_KEY_WEBHOOK_STRIPE);
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
