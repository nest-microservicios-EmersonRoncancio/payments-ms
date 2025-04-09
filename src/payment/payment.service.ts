import { Injectable } from '@nestjs/common';
import { envs } from 'src/configs/dotenv.configs';
import Stripe from 'stripe';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { Request, Response } from 'express';

@Injectable()
export class PaymentService {
  private readonly secret = new Stripe(envs.SECRET_KEY_STRIPE);

  async createPaymentSession(paymentDto: PaymentSessionDto) {
    const session = await this.secret.checkout.sessions.create({
      payment_intent_data: {
        metadata: {
          orderId: paymentDto.orderId,
        },
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
      success_url: envs.SUCCES_URL,
      cancel_url: envs.CANCEL_URL,
    });

    return {
      cancelUrl: session.cancel_url,
      successUrl: session.success_url,
      url: session.url,
    };
  }

  webhook(req: Request, res: Response) {
    // console.log('webhook', req.body);
    const sig = req.headers['stripe-signature'];
    let event: Stripe.Event;

    const enpointSecret = envs.SECRET_KEY_WEBHOOK_STRIPE;

    console.log(req['rawBody']);
    console.log(sig);
    console.log(enpointSecret);

    try {
      event = this.secret.webhooks.constructEvent(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        req['rawBody'],
        sig!,
        enpointSecret,
      );
      console.log(event);
    } catch (err) {
      console.log(`Error message: ${err}`);
      res.status(400).send(`Webhook Error: ${err}`);
      return;
    }

    switch (event.type) {
      case 'charge.succeeded': {
        const session = event.data.object;
        console.log({
          orderId: session.metadata.orderId,
        });
        break;
      }
      default: {
        console.log(`Unhandled event type ${event.type}`);
      }
    }
  }
}
