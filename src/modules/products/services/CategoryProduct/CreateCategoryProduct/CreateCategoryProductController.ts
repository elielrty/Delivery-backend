import { ICreateCategoryProductDTO } from '@modules/products/dtos/ICreateCategoryProductsDTO';
import { CategoryProductViewModel } from '@modules/products/infra/http/view-models/categoryProductViewModel';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryProductService } from './CreateCategoryProductService';

export class CreateCategoryProductController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateCategoryProductDTO;

    data.user_id = request.user.id;

    const service = container.resolve(CreateCategoryProductService);

    const result = await service.execute(data);

    return response.status(201).json(CategoryProductViewModel.toHTTP(result));
  }
}
