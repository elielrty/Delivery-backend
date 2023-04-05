import { ICreateCommerceDTO } from '@modules/commerce/dtos/ICreateCommerceDTO';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateCommerceService } from './UpdateCommerceService';

export class UpdateCommerceController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;
    const data = request.body as Omit<ICreateCommerceDTO, 'user_id'>;

    const service = container.resolve(UpdateCommerceService);

    const result = await service.execute({
      id,
      user_id,
      ...data,
    });

    return response.json(result);
  }
}
