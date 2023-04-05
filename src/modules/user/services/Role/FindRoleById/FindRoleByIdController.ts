import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindRoleByIdService } from './FindRoleByIdService';

export class FindRoleByIdController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const service = container.resolve(FindRoleByIdService);

    const result = await service.execute(id);

    return response.json(result);
  }
}
