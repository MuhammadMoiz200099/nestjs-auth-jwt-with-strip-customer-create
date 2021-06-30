import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { Stripe } from 'stripe';

@Injectable()
export class PaymentService {
    constructor(@InjectStripe() private readonly stripeClient: Stripe){}

    
}
