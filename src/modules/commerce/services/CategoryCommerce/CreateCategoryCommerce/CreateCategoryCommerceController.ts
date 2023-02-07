import { ICreateCategoryCommerceDTO } from '@modules/commerce/dtos/ICreateCategoryCommerceDTO';
import { CategoryCommerceViewModel } from '@modules/commerce/infra/http/view-models/categoryCommerceViewModel';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryCommerceService } from './CreateCategoryCommerceService';

export class CreateCategoryCommerceController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateCategoryCommerceDTO;

    data.user_id = request.user.id;

    const service = container.resolve(CreateCategoryCommerceService);

    const result = await service.execute(data);

    return response.status(201).json(CategoryCommerceViewModel.toHTTP(result));
  }
}
