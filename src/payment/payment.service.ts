import { Injectable } from '@nestjs/common';
import { envs } from 'src/configs/dotenv.configs';
import Stripe from 'stripe';
import { PaymentSessionDto } from './payment/payment-session.dto';

@Injectable()
export class PaymentService {
  private readonly secret = new Stripe(envs.SECRET_KEY_STRIPE);

  async createPaymentSession(paymentDto: PaymentSessionDto) {
    const session = await this.secret.checkout.sessions.create({
      payment_intent_data: {
        metadata: {},
      },
      line_items: paymentDto.item.map((item) => {
        return {
          price_data: {
            currency: paymentDto.currency,
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.unitPrice * 100),
          },
          quantity: item.quantity,
        };
      }),
      mode: 'payment',
      success_url: 'http://localhost:3003/api/payment/success',
      cancel_url: 'http://localhost:3003/api/payment/cancel',
    });

    return session;
  }
}
