import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindCategoryCommerceByIdService } from './FindCategoryCommerceByIdService';

export class FindUserByIdController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const service = container.resolve(FindCategoryCommerceByIdService);

    const result = await service.execute(id);

    return response.json(result);
  }
}
