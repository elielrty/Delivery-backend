import { ICreateCategoryCommerceDTO } from '@modules/commerce/dtos/ICreateCategoryCommerceDTO';
import { CategoryCommerceViewModel } from '@modules/commerce/infra/http/view-models/categoryCommerceViewModel';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateCategoryCommerceService } from './UpdateCategoryCommerceService';

export class UpdateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;
    const data = request.body as Omit<ICreateCategoryCommerceDTO, 'user_id'>;

    const service = container.resolve(UpdateCategoryCommerceService);

    const result = await service.execute({
      id,
      user_id,
      ...data,
    });

    return response.json(CategoryCommerceViewModel.toHTTP(result));
  }
}
