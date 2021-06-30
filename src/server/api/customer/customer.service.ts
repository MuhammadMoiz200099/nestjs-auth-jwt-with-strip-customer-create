import { Injectable } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { InjectStripe } from 'nestjs-stripe';
import { Stripe } from 'stripe';

@Injectable()
export class CustomerService {

    constructor(@InjectStripe() private readonly stripeClient: Stripe){}

    listCustomer(limit?: number) : Promise<Stripe.Customer[]> {
        return new Promise(async (resolve, reject) => {

            if(!Number(limit)) {
                limit = 10
            }

            try {
                const newCustomer  = await this.stripeClient.customers.list({ limit: Number(limit) });
    
                if(!newCustomer) {
                    reject({ message: 'Invalid or Unauthorized email', code: 401 });
                }
    
                resolve(newCustomer.data);
            }
            catch(err) {
                reject(err);
            }
        })
    }
    
    createCustomer(email: string) : Promise<Stripe.Response<Stripe.Customer>> {
        return new Promise(async (resolve, reject) => {
            try {
                const newCustomer  = await this.stripeClient.customers.create({email});
    
                if(!newCustomer) {
                    reject({ message: 'Invalid or Unauthorized email', code: 401 });
                }
    
                resolve(newCustomer);
            }
            catch(err) {
                reject(err);
            }
        })
    }

    retriveCustomer(id: string) : Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> {
        return new Promise(async (resolve, reject) => {
            try {
                
                if(!id) {
                    reject({ message: 'Invalid id source', code: 401 });
                }

                const newCustomer  = await this.stripeClient.customers.retrieve(id);
    
                if(!newCustomer) {
                    reject({ message: 'Customer not found', code: 401 });
                }
    
                resolve(newCustomer);
            }
            catch(err) {
                reject(err);
            }
        })
    }

    updateCustomer(id: string, requestPayload: Stripe.CustomerUpdateParams) : Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> {
        return new Promise(async (resolve, reject) => {
            try {

                if(!id) {
                    reject({ message: 'Invalid id source', code: 401 });
                }

                if(!requestPayload) {
                    reject({ message: 'Must need fields to update', code: 401 });
                }

                const newCustomer  = await this.stripeClient.customers.update(id, requestPayload);
    
                if(!newCustomer) {
                    reject({ message: 'Customer not found', code: 401 });
                }
    
                resolve(newCustomer);
            }
            catch(err) {
                reject(err);
            }
        })
    }

    deleteCustomer(id: string) : Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> {
        return new Promise(async (resolve, reject) => {
            try {
                
                if(!id) {
                    reject({ message: 'Invalid id source', code: 401 });
                }

                const newCustomer  = await this.stripeClient.customers.del(id);
    
                if(!newCustomer) {
                    reject({ message: 'Customer not found', code: 401 });
                }
    
                resolve(newCustomer);
            }
            catch(err) {
                reject(err);
            }
        })
    }
}
