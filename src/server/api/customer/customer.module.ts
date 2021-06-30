import { Module } from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';


@Module({
  imports:[
    StripeModule.forRoot({
      apiKey:process.env.STRIPE_SECRET_KEY,
      apiVersion:'2020-08-27'
    }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule  {

}
