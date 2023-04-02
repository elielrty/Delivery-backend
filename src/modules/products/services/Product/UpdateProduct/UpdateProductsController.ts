import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductsDTO';
import { productViewModel } from '@modules/products/infra/http/view-models/productViewModel';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateProductService } from './UpdateProductsService';

export class UpdateProductsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data = request.body as ICreateProductDTO;
    data.user_id = request.user.id;

    const service = container.resolve(UpdateProductService);

    const result = await service.execute({
      id,
      ...data,
    });

    return response.json(productViewModel.toHTTP(result));
  }
}
