import { Controller, Req, Res, Post, Get, Put, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import l, { logger } from 'src/server/common/logger';
import { BaseController } from 'src/server/common/_base.controller';
import { manageError } from 'src/server/services/response.service';
import { CustomerService } from './customer.service';

@Controller()
export class CustomerController extends BaseController {

    constructor(private customerService: CustomerService) { super(); }

    @Get('/')
    async getCustomer(@Req() req: Request, @Res() res: Response) {
        try {
            const response = await this.customerService.listCustomer(req.body.limit);
            super.response(res, response, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }

    @Post('/create')
    async createCustomer(@Req() req: Request, @Res() res: Response) {
        try {
            // console.log(req.body);
           const response = await this.customerService.createCustomer(req.body.email);
           super.response(res, response, 200, "");
        //  res.send
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }

    @Get('/:id')
    async getCustomerById(@Req() req: Request, @Res() res: Response) {
        try {
            const response = await this.customerService.retriveCustomer(req.params.id);
            super.response(res, response, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }

    @Put('/update/:id')
    async updateCustomer(@Req() req: Request, @Res() res: Response) {
        try {
            const response = await this.customerService.updateCustomer(req.params.id, req.body);
            super.response(res, response, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }

    @Delete('/delete/:id')
    async deleteCustomer(@Req() req: Request, @Res() res: Response) {
        try {
            const response = await this.customerService.deleteCustomer(req.params.id);
            super.response(res, response, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
}