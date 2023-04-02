import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindProductsByIdService } from './FindProductsByIdService';

export class FindProductsByIdController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const service = container.resolve(FindProductsByIdService);

    const result = await service.execute(id);

    return response.json(result);
  }
}
