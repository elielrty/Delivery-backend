import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductsDTO';
import { productViewModel } from '@modules/products/infra/http/view-models/productViewModel';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductService } from './CreateProductService';

export class CreateProductController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateProductDTO;

    data.user_id = request.user.id;

    const service = container.resolve(CreateProductService);

    const result = await service.execute(data);

    return response.status(201).json(productViewModel.toHTTP(result));
  }
}
