import { ICreateCommerceDTO } from '@modules/commerce/dtos/ICreateCommerceDTO';
import { commerceViewModel } from '@modules/commerce/infra/http/view-models/commerceViewModel';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCommerceService } from './CreateCommerceService';

export class CreateCommerceController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateCommerceDTO;

    data.user_id = request.user.id;

    const service = container.resolve(CreateCommerceService);

    const result = await service.execute(data);

    return response.status(201).json(commerceViewModel.toHTTP(result));
  }
}
