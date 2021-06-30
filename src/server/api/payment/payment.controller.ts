import { Controller, Req, Res, Post, Get, Put, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import l, { logger } from 'src/server/common/logger';
import { BaseController } from 'src/server/common/_base.controller';
import { manageError } from 'src/server/services/response.service';

@Controller('payment')
export class PaymentController extends BaseController  {

    @Put('/update/:id')
    async updateCustomer(@Req() req: Request, @Res() res: Response) {
        try {
            // const response = await this.customerService.updateCustomer(req.params.id, req.body);
            // super.response(res, response, 200, "");
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
