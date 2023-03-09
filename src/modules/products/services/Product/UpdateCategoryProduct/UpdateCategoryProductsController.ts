import { ICreateCategoryProductDTO } from '@modules/products/dtos/ICreateCategoryProductsDTO';
import { CategoryProductViewModel } from '@modules/products/infra/http/view-models/categoryProductViewModel';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateCategoryProductService } from './UpdateCategoryProductsService';

export class UpdateCategoryProductsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data = request.body as ICreateCategoryProductDTO;
    data.user_id = request.user.id;

    const service = container.resolve(UpdateCategoryProductService);

    const result = await service.execute({
      id,
      ...data,
    });

    return response.json(CategoryProductViewModel.toHTTP(result));
  }
}
