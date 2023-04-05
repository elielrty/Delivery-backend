import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindCommerceByIdService } from './FindCommerceByIdService';

export class FindCommerceByIdController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const service = container.resolve(FindCommerceByIdService);

    const result = await service.execute(id);

    return response.json(result);
  }
}
